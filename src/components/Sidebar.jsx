// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Dashboard Home
        </NavLink>

        <NavLink
          to="/dashboard/road-signs"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Road Signs
        </NavLink>

        <NavLink
          to="/dashboard/traffic-rules"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Traffic Rules
        </NavLink>

        <NavLink
          to="/dashboard/practice-questions"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Practice Questions
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;