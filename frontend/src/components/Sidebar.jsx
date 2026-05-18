import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../utils/utils";
import {
  FaHome,
  FaShoppingBag,
  FaCog,
  FaShoppingCart,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setIsLoggedIn(false);

      toast.success("Logout successful 👋");

      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const menuItems = [
    {
      name: "Home",
      icon: <FaHome />,
      path: "/",
    },
    {
      name: "Products",
      icon: <FaShoppingBag />,
      path: "/products",
    },
    {
      name: "Purchases",
      icon: <FaShoppingCart />,
      path: "/purchases",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },
  ];

  return (
    <aside className="hidden md:flex w-72 min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white flex-col p-6 shadow-2xl sticky top-0">
      
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          E-Shop
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          Welcome back 👋
        </p>
      </div>

      {/* Menu */}
      <ul className="space-y-3 flex-1">
        {menuItems.map((item, index) => (
          <li
            key={index}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300
            ${
              location.pathname === item.path
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
                : "hover:bg-white/10"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </li>
        ))}
      </ul>

      {/* Login / Logout */}
      <div className="mt-auto">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-3 rounded-2xl font-semibold transition duration-300"
          >
            <FaSignOutAlt />
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 py-3 rounded-2xl font-semibold transition duration-300"
          >
            <FaSignInAlt />
            Login
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;