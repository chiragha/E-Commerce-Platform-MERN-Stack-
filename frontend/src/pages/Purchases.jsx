import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BACKEND_URL } from "../utils/utils";

import { Package, ShoppingBag } from "lucide-react";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchPurchases = async () => {
    try {
      const token = localStorage.getItem("token");

      // redirect if not logged in
      if (!token) {
        toast.error("Please login first");

        navigate("/login");
        return;
      }

      const res = await axios.get(`${BACKEND_URL}/user/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setPurchases(res.data.orders || []);
    } catch (error) {
      console.log("Error fetching purchases:", error);

      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 px-4 md:px-8 py-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>

            <p className="text-gray-500 mt-1">
              View all your purchased products
            </p>
          </div>

          <div className="bg-white px-5 py-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
            <ShoppingBag className="text-orange-500" />

            <div>
              <p className="text-sm text-gray-500">Total Orders</p>

              <h3 className="font-bold text-xl">{purchases.length}</h3>
            </div>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center items-center h-[50vh]">
            <p className="text-gray-500 text-lg">Loading your orders...</p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && purchases.length === 0 && (
          <div className="bg-white rounded-3xl shadow-md p-12 text-center max-w-xl mx-auto">
            <Package size={70} className="mx-auto text-gray-300" />

            <h2 className="text-2xl font-bold text-gray-800 mt-5">
              No Orders Yet
            </h2>

            <p className="text-gray-500 mt-2">
              You haven't purchased anything yet.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:scale-105 transition"
            >
              Explore Products
            </button>
          </div>
        )}

        {/* PURCHASE GRID */}
        {!loading && purchases.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {purchases.map((order) =>
              order.products.map((item) => (
                <div
                  key={item.productId._id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 border border-gray-100 group"
                >
                  {/* IMAGE */}
                  <div className="bg-gray-100 h-[260px] flex items-center justify-center overflow-hidden relative">
                    <span className="absolute top-4 left-4 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {order.status || "Paid"}
                    </span>

                    <img
                      src={item.productId.image?.url || item.productId.image}
                      alt={item.productId.title}
                      className="h-[200px] object-contain group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
                      {item.productId.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {item.productId.description}
                    </p>

                    <div className="mt-3 flex justify-between text-sm text-gray-500">
                      <span>Qty: {item.quantity}</span>

                      <span>
                        Order Date:{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-5">
                      <div>
                        <p className="text-sm text-gray-400">Price</p>

                        <h4 className="text-xl font-bold text-gray-900">
                          ₹{item.productId.price}
                        </h4>
                      </div>

                      <button
                        onClick={() => navigate(`/buy/${item.productId._id}`)}
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2.5 rounded-xl hover:scale-105 transition"
                      >
                        Buy Again
                      </button>
                    </div>
                  </div>
                </div>
              )),
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Purchases;
