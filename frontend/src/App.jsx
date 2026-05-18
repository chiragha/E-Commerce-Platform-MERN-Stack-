import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import Buy from "./pages/Buy";
import Purchases from "./pages/Purchases";

import Settings from "./components/Settings";
import About from "./components/About";
import Contact from "./components/Contact";
import Address from "./pages/Address";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./pages/Checkout";
import Tracking from "./pages/Tracking";

// ADMIN
import AdminSignup from "./Admin/AdminSignup";
import AdminLogin from "./Admin/AdminLogin";
import Dashboard from "./Admin/Dashboard";
import CreateProduct from "./Admin/CreateProduct";
import OurProducts from "./Admin/OurProducts";
import UpdateProduct from "./Admin/UpdateProduct";

const App = () => {
  const user = localStorage.getItem("user");

  const admin = localStorage.getItem("admin");

  return (
    <div>
      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/products" element={<Products />} />

        <Route path="/buy/:productId" element={<Buy />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/settings" element={<Settings />} />
        <Route path="/address/:productId" element={<Address />} />

        <Route path="/checkout/:productId" element={<Checkout />} />
        {/* PROTECTED PURCHASES */}
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/tracking" element={<Tracking />} />
        {/* ADMIN ROUTES */}
        <Route path="/admin/signup" element={<AdminSignup />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={admin ? <Dashboard /> : <Navigate to="/admin/login" />}
        />

        <Route path="/admin/create-product" element={<CreateProduct />} />

        <Route path="/admin/our-products" element={<OurProducts />} />

        <Route
          path="/admin/update-products/:productId"
          element={<UpdateProduct />}
        />
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;
