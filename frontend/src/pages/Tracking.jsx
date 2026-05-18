import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  Package,
  Truck,
  Home,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const orderSteps = [
  {
    title: "Order Confirmed",
    icon: CheckCircle2,
  },
  {
    title: "Packed",
    icon: Package,
  },
  {
    title: "Shipped",
    icon: Truck,
  },
  {
    title: "Delivered",
    icon: Home,
  },
];

const Tracking = () => {
  const [currentStep, setCurrentStep] =
    useState(1);

  // TEMPORARY AUTO UPDATE
  useEffect(() => {
    const interval =
      setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < 4)
            return prev + 1;

          clearInterval(
            interval
          );

          return prev;
        });
      }, 4000);

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto">

          {/* SUCCESS CARD */}
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle2
                size={45}
                className="text-green-600"
              />
            </div>

            <h1 className="text-3xl font-bold mt-5">
              Payment Successful 🎉
            </h1>

            <p className="text-gray-500 mt-2">
              Your order has been placed
              successfully.
            </p>

            <div className="mt-5 inline-block bg-orange-50 text-orange-600 px-5 py-3 rounded-xl font-semibold">
              Tracking ID:
              #ORD123456
            </div>
          </div>

          {/* TRACKING */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-10">
              Order Tracking
            </h2>

            <div className="relative">

              {/* LINE */}
              <div className="absolute top-7 left-7 h-[80%] w-1 bg-gray-200"></div>

              {orderSteps.map(
                (
                  step,
                  index
                ) => {
                  const Icon =
                    step.icon;

                  const completed =
                    index <
                    currentStep;

                  return (
                    <div
                      key={
                        index
                      }
                      className="relative flex items-center gap-5 mb-10"
                    >
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center z-10 ${
                          completed
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        <Icon />
                      </div>

                      <div>
                        <h3 className="font-bold text-lg">
                          {
                            step.title
                          }
                        </h3>

                        <p className="text-gray-500 text-sm">
                          {completed
                            ? "Completed"
                            : "Pending"}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Tracking;