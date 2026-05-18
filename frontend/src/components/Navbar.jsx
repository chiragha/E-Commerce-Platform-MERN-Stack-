import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  ShoppingBag,
  User,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";

import { BACKEND_URL } from "../utils/utils";
import CartDrawer from "./CartDrawer";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] =
  useState(false);
  const user =
    JSON.parse(localStorage.getItem("user")) ||
    null;


const {
  cartItems = [],
  openCart,
  setOpenCart,
} = useCart() || {};


const handleLogout = async () => {
  try {
    await axios.get(
      `${BACKEND_URL}/user/logout`,
      {
        withCredentials: true,
      }
    );

    localStorage.removeItem(
      "token"
    );
    localStorage.removeItem(
      "user"
    );

    toast.success(
      "Logout successful 👋"
    );

    setTimeout(() => {
      window.location.href =
        "/login";
    }, 1000);
  } catch (error) {
    console.log(error);

    toast.error(
      "Logout failed"
    );
  }
};

  return (
    <>
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-[72px]">

      {/* LOGO */}
      <Link
        to="/"
        className="flex items-center gap-2 group shrink-0"
      >
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl shadow-md group-hover:scale-105 transition duration-300">
          <ShoppingBag className="text-white w-5 h-5" />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
          E
          <span className="text-orange-500">
            Shop
          </span>
        </h1>
      </Link>

      {/* DESKTOP MENU */}
      <ul className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-gray-700">
        {[
          {
            name: "Home",
            path: "/",
          },
          {
            name: "Products",
            path: "/products",
          },
          {
            name: "About",
            path: "/about",
          },
          {
            name: "Contact",
            path: "/contact",
          },
        ].map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className="relative hover:text-orange-500 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">

        {/* CART */}
        <button
          onClick={() =>
            setOpenCart(true)
          }
          className="relative hover:scale-110 transition duration-300"
        >
          <ShoppingCart
            size={24}
            className="text-gray-700 hover:text-orange-500"
          />

          {cartItems.length >
            0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {
                cartItems.length
              }
            </span>
          )}
        </button>

        {/* DESKTOP AUTH */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden xl:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                <User className="w-4 h-4 text-gray-600" />

                <span className="text-sm font-medium text-gray-700">
                  Hi,{" "}
                  {user.name?.split(
                    " "
                  )[0] ||
                    "User"}
                </span>
              </div>

              <button
                onClick={() =>
                  navigate(
                    "/purchases"
                  )
                }
                className="text-gray-700 hover:text-orange-500 transition font-medium"
              >
                My Orders
              </button>

              <button
                onClick={
                  handleLogout
                }
                className="bg-gradient-to-r from-red-500 to-red-600 hover:scale-105 text-white px-4 py-2 rounded-xl transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="font-medium text-gray-700 hover:text-orange-500 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2 rounded-xl hover:scale-105 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() =>
            setMobileMenu(
              !mobileMenu
            )
          }
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {mobileMenu ? (
            <X size={26} />
          ) : (
            <Menu size={26} />
          )}
        </button>
      </div>
    </div>
  </div>

  {/* MOBILE MENU */}
  <div
    className={`lg:hidden overflow-hidden transition-all duration-300 ${
      mobileMenu
        ? "max-h-[500px] border-t border-gray-200"
        : "max-h-0"
    }`}
  >
    <div className="px-5 py-5 bg-white space-y-5">

      {/* LINKS */}
      <div className="flex flex-col gap-4 text-gray-700 font-medium">
        <Link
          to="/"
          onClick={() =>
            setMobileMenu(
              false
            )
          }
        >
          Home
        </Link>

        <Link
          to="/products"
          onClick={() =>
            setMobileMenu(
              false
            )
          }
        >
          Products
        </Link>

        <Link
          to="/about"
          onClick={() =>
            setMobileMenu(
              false
            )
          }
        >
          About
        </Link>

        <Link
          to="/contact"
          onClick={() =>
            setMobileMenu(
              false
            )
          }
        >
          Contact
        </Link>

        {user && (
          <button
            onClick={() => {
              navigate(
                "/purchases"
              );
              setMobileMenu(
                false
              );
            }}
            className="text-left"
          >
            My Orders
          </button>
        )}
      </div>

      {/* AUTH */}
      <div className="border-t pt-4">
        {user ? (
          <button
            onClick={
              handleLogout
            }
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl"
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="flex-1 border text-center py-3 rounded-xl"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-3 rounded-xl"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  </div>
</nav>

      {/* CART DRAWER */}
      <CartDrawer
        open={openCart}
        setOpen={setOpenCart}
      />
    </>
  );
};

export default Navbar;