import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { ShoppingBag, User } from "lucide-react";


const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-[120px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/10 pb-12">
          
          {/* Brand */}
          <div>
              {/* LOGO */}
         
          <div  className="flex items-center gap-2 group">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl shadow-md group-hover:scale-105 transition duration-300">
              <ShoppingBag className="text-white w-5 h-5" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white">
              E<span className="text-orange-500">Shop</span>
            </h1>
          </div>
         

            <p className="text-gray-400 mt-4 leading-relaxed text-sm">
              Discover premium fashion and trending products at the best prices.
              Shop smarter and elevate your lifestyle.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 transition flex items-center justify-center">
                <FaFacebookF />
              </button>

              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-pink-500 transition flex items-center justify-center">
                <FaInstagram />
              </button>

              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-sky-500 transition flex items-center justify-center">
                <FaTwitter />
              </button>

              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-700 transition flex items-center justify-center">
                <FaLinkedinIn />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-400 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <button className="hover:text-blue-400 transition">
                  About Us
                </button>
              </li>

              <li>
                <button className="hover:text-blue-400 transition">
                  Contact
                </button>
              </li>

              <li>
                <Link
                  to="/products"
                  className="hover:text-blue-400 transition"
                >
                  Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">
              Customer
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  to="/login"
                  className="hover:text-blue-400 transition"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/signup"
                  className="hover:text-blue-400 transition"
                >
                  Signup
                </Link>
              </li>

              <li>
                <Link
                  to="/purchases"
                  className="hover:text-blue-400 transition"
                >
                  Orders
                </Link>
              </li>

              <li>
                <button className="hover:text-blue-400 transition">
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">
              Contact Us
            </h3>

            <div className="space-y-3 text-gray-400 text-sm">
              <p>📧 support@eshop.com</p>
              <p>📞 +91 9876543210</p>
              <p>📍 Delhi, India</p>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm text-gray-300 mb-3">
                Subscribe for updates
              </p>

              <div className="flex bg-white/10 rounded-xl overflow-hidden border border-white/10">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-transparent px-4 py-3 w-full outline-none text-sm"
                />

                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 hover:opacity-90 transition">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} E-Shop. All rights reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <button className="hover:text-blue-400 transition">
              Privacy Policy
            </button>

            <button className="hover:text-blue-400 transition">
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;