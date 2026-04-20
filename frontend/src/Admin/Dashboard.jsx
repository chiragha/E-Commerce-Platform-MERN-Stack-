import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // later you can call API here
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Right Content Area */}
      <div className="flex-1 p-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">
            Welcome to Admin Dashboard
          </h1>
          <p className="text-gray-600">
            This is your control panel. From here you can manage posts, create
            new content, and monitor activity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
