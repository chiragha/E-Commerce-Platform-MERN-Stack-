import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BACKEND_URL } from "../utils/utils";

import {
  MapPin,
  Trash2,
  Plus,
} from "lucide-react";

const Address = () => {
  const navigate =
    useNavigate();

  const { productId } =
    useParams();

  const token =
    localStorage.getItem(
      "token"
    );

  const [addresses, setAddresses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showForm, setShowForm] =
    useState(false);

  const [formData, setFormData] =
    useState({
      fullName: "",
      mobileNumber: "",
      pincode: "",
      city: "",
      state: "",
      country: "India",
      addressLine: "",
      landmark: "",
    });

  // FETCH ADDRESS
  const fetchAddresses =
    async () => {
      try {
        const res =
          await axios.get(
            `${BACKEND_URL}/address/all`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setAddresses(
          res.data.addresses
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // INPUT CHANGE
  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // SAVE ADDRESS
  const handleSave =
    async () => {
      try {
        await axios.post(
          `${BACKEND_URL}/address/save`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Address saved"
        );

        fetchAddresses();

        setShowForm(false);

        // redirect checkout
        setTimeout(() => {
          navigate(
            `/checkout/${productId}`
          );
        }, 1000);
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to save address"
        );
      }
    };

  // DELETE
  const handleDelete =
    async (
      addressId
    ) => {
      try {
        await axios.delete(
          `${BACKEND_URL}/address/delete/${addressId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Address deleted"
        );

        fetchAddresses();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold">
                My Addresses
              </h1>

              <p className="text-gray-500 mt-2">
                Manage your saved delivery addresses
              </p>
            </div>

            <button
              onClick={() =>
                setShowForm(
                  !showForm
                )
              }
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl transition"
            >
              <Plus size={18} />
              Add Address
            </button>
          </div>

          {/* ADDRESS FORM */}
          {showForm && (
            <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">
                Add New Address
              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  onChange={
                    handleChange
                  }
                  className="border rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-400"
                />

                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  onChange={
                    handleChange
                  }
                  className="border rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-400"
                />

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  onChange={
                    handleChange
                  }
                  className="border rounded-xl p-4"
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  onChange={
                    handleChange
                  }
                  className="border rounded-xl p-4"
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  onChange={
                    handleChange
                  }
                  className="border rounded-xl p-4"
                />

                <input
                  type="text"
                  name="landmark"
                  placeholder="Landmark"
                  onChange={
                    handleChange
                  }
                  className="border rounded-xl p-4"
                />

                <textarea
                  name="addressLine"
                  placeholder="Complete Address"
                  rows="4"
                  onChange={
                    handleChange
                  }
                  className="border rounded-xl p-4 md:col-span-2"
                />
              </div>

              <button
                onClick={
                  handleSave
                }
                className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold"
              >
                Save Address
              </button>
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <p>
              Loading addresses...
            </p>
          )}

          {/* EMPTY */}
          {!loading &&
            addresses.length ===
              0 && (
              <div className="bg-white rounded-3xl shadow-md p-12 text-center">
                <MapPin
                  className="mx-auto text-gray-400 mb-4"
                  size={50}
                />

                <h2 className="text-2xl font-bold">
                  No Address Found
                </h2>

                <p className="text-gray-500 mt-2">
                  Please add your delivery address
                </p>
              </div>
            )}

          {/* ADDRESS LIST */}
          <div className="grid md:grid-cols-2 gap-6">
            {addresses.map(
              (address) => (
                <div
                  key={
                    address._id
                  }
                  className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-xl">
                        {
                          address.fullName
                        }
                      </h3>

                      <p className="text-gray-600 mt-2">
                        {
                          address.addressLine
                        }
                      </p>

                      <p className="text-gray-600">
                        {
                          address.city
                        }
                        ,{" "}
                        {
                          address.state
                        }{" "}
                        -{" "}
                        {
                          address.pincode
                        }
                      </p>

                      <p className="font-medium mt-2">
                        📞{" "}
                        {
                          address.mobileNumber
                        }
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleDelete(
                          address._id
                        )
                      }
                    >
                      <Trash2 className="text-red-500" />
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/checkout/${productId}`
                      )
                    }
                    className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
                  >
                    Deliver Here
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Address;