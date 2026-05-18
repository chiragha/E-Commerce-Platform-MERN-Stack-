import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import promoImg from "../assets/promo.avif";
const PromoBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[40px]"
        >
          {/* Background Image */}
          <img
            src={promoImg}
            alt="Fashion Banner"
            className="w-full h-[500px] object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/45"></div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl px-10 md:px-20 text-white">
              <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm">
                Limited Time Offer
              </span>

              <h2 className="text-4xl md:text-6xl font-bold mt-6 leading-tight">
                Up to 50% OFF
                <span className="block text-blue-300">New Collection</span>
              </h2>

              <p className="mt-5 text-lg text-gray-200">
                Upgrade your wardrobe with the latest fashion trends curated
                just for you.
              </p>

              <button
                onClick={() => navigate("/products")}
                className="mt-8 bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-xl font-semibold transition cursor-pointer"
              >
                Shop Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoBanner;
