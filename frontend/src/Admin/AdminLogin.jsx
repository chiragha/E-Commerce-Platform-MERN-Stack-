import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const res = await axios.post(
      "http://localhost:4001/api/v1/admin/login",
      formData
    );

    const { admin, token } = res.data;

    // ✅ FIXED STORAGE
    localStorage.setItem("token", token);
    localStorage.setItem(
      "admin",
      JSON.stringify({
        _id: admin._id,
        role: admin.role,
      })
    );

    toast.success(res.data.message || "Admin Login successful 🎉");

    setFormData({ email: "", password: "" });

   window.location.href = "/admin/dashboard";

  } catch (error) {
    const backendError = error.response?.data;

    if (backendError?.errors) {
      toast.error(backendError.errors.join(", "));
    } else {
      toast.error(backendError?.message || "Something went wrong");
    }
  } finally {
    setLoading(false);
  }
};
  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen grid md:grid-cols-2 ">
        {/* LEFT IMAGE SECTION */}
        <div className="hidden md:flex relative">
          <img
            src="/leftimg.avif"
            alt=""
            className="absolute inset-0 w-full h-full object-cover "
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative text-white flex flex-col justify-center items-center text-center px-6">
            <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
            <p className="text-lg opacity-90">
              Login to continue your shopping journey.
            </p>
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="flex items-center justify-center bg-gray-100 px-4">
          <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-center mb-6">
              Login to Your Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              {/* Password */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              {/* Forgot Password */}
              <div className="text-right text-sm">
                <span className="text-indigo-600 cursor-pointer hover:underline">
                  Forgot Password?
                </span>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-2 text-sm text-gray-500">or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Signup Redirect */}
            <p className="text-sm text-center">
              Don’t have an account?{" "}
              <span className="text-indigo-600 cursor-pointer hover:underline">
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
