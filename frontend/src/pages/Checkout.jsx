import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle2, MapPin, Plus, CreditCard } from "lucide-react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BACKEND_URL } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
const Checkout = () => {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [loading, setLoading] = useState(true);

  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  // FETCH ADDRESSES
  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${BACKEND_URL}/address/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setAddresses(res.data.addresses || []);

      // auto select first address
      if (res.data.addresses?.length > 0) {
        setSelectedAddress(res.data.addresses[0]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  const handlePayment = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );

    if (!res) {
      toast.error("Razorpay failed to load");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!product || !product.price) {
        toast.error("Product not loaded");
        return;
      }
      // create order
      const orderRes = await axios.post(`${BACKEND_URL}/payment/create-order`, {
        amount: product?.price || 0,
      });

      const order = orderRes.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: order.amount,

        currency: order.currency,

        name: "Your Store",

        description: "Product Payment",

        order_id: order.id,

        handler: async (response) => {
          const verifyRes = await axios.post(
            `${BACKEND_URL}/payment/verify-payment`,
            response,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (verifyRes.data.success) {
            toast.success("Payment Successful");

            navigate("/tracking");
          }
        },

        theme: {
          color: "#f97316",
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.open();
    } catch (error) {
      console.log(error);

      toast.error("Payment failed");
    }
  };
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/product/${productId}`);

      setProduct(res.data.product);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load product");
    }
  };
  useEffect(() => {
    fetchAddresses();
    fetchProduct();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* TITLE */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Checkout</h1>

            <p className="text-gray-500 mt-2">
              Select your delivery address and continue payment
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">
              {/* ADDRESS CARD */}
              <div className="bg-white rounded-3xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <MapPin className="text-orange-500" />
                    Saved Addresses
                  </h2>

                  <button
                    onClick={() => navigate("/address")}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl transition cursor-pointer"
                  >
                    <Plus size={18} />
                    Add Address
                  </button>
                </div>

                {/* LOADING */}
                {loading && <p>Loading addresses...</p>}

                {/* EMPTY ADDRESS */}
                {!loading && addresses.length === 0 && (
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center">
                    <h3 className="text-xl font-semibold text-gray-700">
                      No Address Found
                    </h3>

                    <p className="text-gray-500 mt-2">
                      Please add an address to continue checkout.
                    </p>

                    <button
                      onClick={() => navigate("/address")}
                      className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition"
                    >
                      Add Address
                    </button>
                  </div>
                )}

                {/* SAVED ADDRESSES */}
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address._id}
                      onClick={() => setSelectedAddress(address)}
                      className={`border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
                        selectedAddress?._id === address._id
                          ? "border-orange-500 bg-orange-50 shadow-md"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-bold text-lg">
                            {address.fullName}
                          </h3>

                          <p className="text-gray-600 mt-1">
                            {address.addressLine},{address.city},{address.state}
                          </p>

                          <p className="text-gray-600">
                            PIN:
                            {address.pincode}
                          </p>

                          <p className="text-gray-600">
                            Phone:
                            {address.phone}
                          </p>
                        </div>

                        {selectedAddress?._id === address._id && (
                          <CheckCircle2 className="text-green-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="bg-white rounded-3xl shadow-md p-6 h-fit sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="border-b pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={product?.image?.url}
                    alt={product?.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                  <div>
                    <h3 className="font-semibold">{product?.title}</h3>

                    <p className="text-gray-500 text-sm">Qty: 1</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-b pb-5">
                <div className="flex justify-between">
                  <span>Subtotal</span>

                  <span>₹{product?.price || 0}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>

                  <span className="text-green-600">FREE</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold mt-5">
                <span>Total</span>

                <span>₹{product?.price || 0}</span>
              </div>

              <button
                onClick={handlePayment}
                disabled={!selectedAddress}
                className={`w-full mt-6 py-4 rounded-2xl font-semibold text-lg flex justify-center items-center gap-2 transition ${
                  selectedAddress
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:scale-[1.02]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <CreditCard />
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
