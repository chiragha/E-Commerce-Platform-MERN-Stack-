import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4001/api/v1/user/logout", {
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

 const fetchPurchases = async () => {
  try {
    const token = localStorage.getItem("token");

    // ❌ If no token → redirect to login
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const res = await axios.get(
      "http://localhost:4001/api/v1/user/purchases",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    setPurchases(res.data.productData || []);
  } catch (error) {
    console.log("Error fetching purchases:", error);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchPurchases();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* SIDEBAR */}
     <Sidebar />  

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">My Purchases</h1>

        {/* LOADING */}
        {loading && <p className="text-gray-600">Loading purchases...</p>}

        {/* EMPTY STATE */}
        {!loading && purchases.length === 0 && (
          <p className="text-gray-500">No purchases found</p>
        )}

        {/* GRID */}
        {!loading && purchases.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchases.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
              >
                {/* IMAGE */}
                <div className="h-40 flex items-center justify-center bg-gray-50 rounded-lg">
                  <img
                    src={item.image?.url || item.image}
                    alt={item.title}
                    className="h-32 object-contain"
                  />
                </div>

                {/* CONTENT */}
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {item.description}
                  </p>

                  <p className="font-bold text-gray-800 mt-2">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Purchases;