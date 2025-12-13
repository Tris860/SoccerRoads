 // src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import ModeSelectionPage from "./pages/ModeSelectionPage.jsx";
import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx";
import DashboardHome from "./pages/dashboard/DashboardHome.jsx";
import SubjectPage from "./pages/dashboard/SubjectPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/mode-selection" element={<ModeSelectionPage />} />

      {/* Dashboard layout with nested routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route
          path="road-signs"
          element={<SubjectPage title="Road Signs" />}
        />
        <Route
          path="traffic-rules"
          element={<SubjectPage title="Traffic Rules" />}
        />
        <Route
          path="practice-questions"
          element={<SubjectPage title="Practice Questions" />}
        />
      </Route>
    </Routes>
  );
}

export default App;