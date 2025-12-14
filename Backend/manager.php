<?php



class User {
    private $conn;

    /**
     * Constructor for the User class.
     *
     * @param mysqli $conn The database connection object.
     */
    public function __construct(mysqli $conn) {
        $this->conn = $conn;
    }

    /**
     * Registers a new user.
     *
     * @param string $email The user's email.
     * @param string $passkey The user's password (will be hashed).
     * @return array Success status and message.
     */
    public function register(string $email, string $passkey): array {
        if (empty($email) || empty($passkey)) {
            return ["success" => false, "message" => "Email and password cannot be empty."];
        }


        // Check if email already exists
        $stmt = $this->conn->prepare("SELECT user_id FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            $stmt->close();
            return ["success" => false, "message" => "Email already registered. ".$email];
        }
        $stmt->close();

        $hashedPasskey = password_hash($passkey, PASSWORD_DEFAULT);

        // Insert new user with default settings for timetable_enabled and hard_switch_enabled
        $stmt = $this->conn->prepare("INSERT INTO users (email,password_hash,role) VALUES (?, ?, 'student')");
        $stmt->bind_param("ss", $email, $hashedPasskey);

        if ($stmt->execute()) {
            $stmt->close();
            return ["success" => true, "message" => "Registration successful!"];
        } else {
            error_log("User registration error: " . $stmt->error);
            $stmt->close();
            return ["success" => false, "message" => "Registration failed. Please try again."];
        }
    }

    /**
     * Logs in a user.
     *
     * @param string $email The user's email.
     * @param string $passkey The user's password.
     * @return array Success status and message. Sets session variables on success.
     */
    public function login(string $email, string $passkey): array {
        if (empty($email) || empty($passkey)) {
            return ["success" => false, "message" => "Email and password cannot be empty."];
        }

        $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            if (password_verify($passkey, $user['password_hash'])) {
                // Set session variables
                $_SESSION['logged_in'] = true;
                $_SESSION['user_id'] = $user['user_id'];
                $_SESSION['email'] = $user['email'];
                $_SESSION['role'] = $user['role'] ?? 'user'; // Default to 'user' if role not set
            
                $stmt->close();
                return ["success" => true, "message" => "Login successful!"];
            } else {
                $stmt->close();
                return ["success" => false, "message" => "Incorrect password."];
            }
        } else {
            $stmt->close();
            return ["success" => false, "message" => "Email not found."];
        }
    }

    /**
     * Logs out the current user.
     *
     * @return array Success status and message. Destroys session.
     */
    public function logout(): array {
        // Unset all session variables
        $_SESSION = [];

        // Destroy the session
        session_destroy();

        // Also clear the session cookie
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }

        return ["success" => true, "message" => "Logged out successfully."];
    }

    /**
     * Changes the user's password.
     *
     * @param int $userId The ID of the user.
     * @param string $currentPassword The current password.
     * @param string $newPassword The new password.
     * @return array Success status and message.
     */
    public function changePassword(int $userId, string $currentPassword, string $newPassword): array {
        if (empty($currentPassword) || empty($newPassword)) {
            return ["success" => false, "message" => "Current and new passwords cannot be empty."];
        }
        if (strlen($newPassword) < 8) {
            return ["success" => false, "message" => "New password must be at least 8 characters long."];
        }

        $stmt = $this->conn->prepare("SELECT passkey FROM users WHERE id_users = ?");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            if (password_verify($currentPassword, $user['passkey'])) {
                $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);
                $updateStmt = $this->conn->prepare("UPDATE users SET passkey = ? WHERE id_users = ?");
                $updateStmt->bind_param("si", $hashedNewPassword, $userId);
                if ($updateStmt->execute()) {
                    $updateStmt->close();
                    return ["success" => true, "message" => "Password changed successfully."];
                } else {
                    error_log("Password update error: " . $updateStmt->error);
                    $updateStmt->close();
                    return ["success" => false, "message" => "Failed to change password."];
                }
            } else {
                $stmt->close();
                return ["success" => false, "message" => "Incorrect current password."];
            }
        } else {
            $stmt->close();
            return ["success" => false, "message" => "User not found."];
        }
    }

    /**
     * Changes the user's email.
     *
     * @param int $userId The ID of the user.
     * @param string $currentPassword The user's current password for verification.
     * @param string $newEmail The new email address.
     * @return array Success status and message.
     */
    public function changeEmail(int $userId, string $currentPassword, string $newEmail): array {
        if (empty($currentPassword) || empty($newEmail)) {
            return ["success" => false, "message" => "Current password and new email cannot be empty."];
        }
        if (!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
            return ["success" => false, "message" => "Invalid new email format."];
        }

        // Verify current password and fetch existing email
        $stmt = $this->conn->prepare("SELECT passkey, email FROM users WHERE id_users = ?");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            if (password_verify($currentPassword, $user['passkey'])) {
                if ($user['email'] === $newEmail) {
                    $stmt->close();
                    return ["success" => false, "message" => "New email is the same as the current email."];
                }

                // Check if new email already exists for another user
                $checkEmailStmt = $this->conn->prepare("SELECT id_users FROM users WHERE email = ? AND id_users != ?");
                $checkEmailStmt->bind_param("si", $newEmail, $userId);
                $checkEmailStmt->execute();
                $checkEmailStmt->store_result();
                if ($checkEmailStmt->num_rows > 0) {
                    $checkEmailStmt->close();
                    $stmt->close();
                    return ["success" => false, "message" => "This email is already in use by another account."];
                }
                $checkEmailStmt->close();

                // Update email
                $updateStmt = $this->conn->prepare("UPDATE users SET email = ? WHERE id_users = ?");
                $updateStmt->bind_param("si", $newEmail, $userId);
                if ($updateStmt->execute()) {
                    // Update session email if successful
                    $_SESSION['email'] = $newEmail;
                    $updateStmt->close();
                    $stmt->close();
                    return ["success" => true, "message" => "Email changed successfully."];
                } else {
                    error_log("Email update error: " . $updateStmt->error);
                    $updateStmt->close();
                    $stmt->close();
                    return ["success" => false, "message" => "Failed to change email."];
                }
            } else {
                $stmt->close();
                return ["success" => false, "message" => "Incorrect current password."];
            }
        } else {
            $stmt->close();
            return ["success" => false, "message" => "User not found."];
        }
    }

    
   
}









?>