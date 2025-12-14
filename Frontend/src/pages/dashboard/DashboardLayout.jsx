// src/pages/dashboard/DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Sidebar from "../../components/Sidebar.jsx";

const DashboardLayout = () => {
  return (
    <div className="dashboard-root">
      <Header />
      <div className="dashboard-body">
        <Sidebar />
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;