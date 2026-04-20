import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
        "http://localhost:4001/api/v1/user/signup",
        formData,
      );

      // ✅ Show toast instead of message
      toast.success(res.data.message || "Signup successful 🎉");

      // ✅ Delay navigation (important)
      setTimeout(() => {
        navigate("/login");
      }, 1500);
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
      <Navbar />
      <div className="min-h-screen grid md:grid-cols-2">
        {/* LEFT SIDE IMAGE */}
        <div
          className="hidden md:flex items-center justify-center bg-cover bg-top relative"
          style={{
            backgroundImage: `url("/side_image.avif")`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="relative text-white text-center px-6">
            <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
            <p className="text-lg opacity-90">
              Discover amazing products and deals every day.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="flex items-center justify-center bg-gray-100 px-4">
          <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-center mb-6">
              Create Account
            </h2>

            {message && (
              <p className="text-center text-sm text-red-500 mb-4">{message}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First + Last Name */}
              <div className="flex gap-3">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-1/2 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-1/2 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

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

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
              >
                {loading ? "Creating..." : "Sign Up"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-2 text-sm text-gray-500">or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Login Link */}
            <p className="text-sm text-center">
              Already have an account?{" "}
              <span className="text-indigo-600 cursor-pointer hover:underline">
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
