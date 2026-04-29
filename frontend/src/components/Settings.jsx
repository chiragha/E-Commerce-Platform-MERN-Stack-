import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { BACKEND_URL } from '../utils/utils';

const Settings = () => {

   const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("${BACKEND_URL}/user/logout", {
        withCredentials: true,
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.success("Logout successful 👋");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      toast.error("Logout failed");
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100"> 
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <p>Manage your account settings here.</p>
      </div>
    </div>
  )
}

export default Settings