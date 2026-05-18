import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full min-h-[92vh] bg-cover bg-center"
      style={{
        backgroundImage: `url("/hero.avif")`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[92vh] flex items-center">
        <div className="max-w-2xl text-white">
          
          {/* Badge */}
          <span className="inline-block bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm tracking-wide mb-6">
            ✨ New Streetwear Collection 2026
          </span>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            The Future of
            <span className="block text-blue-300">
              Streetwear Fashion
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            Discover premium fashion that blends comfort,
            confidence, and bold street style into every outfit.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/products")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold transition cursor-pointer"
            >
              Shop Collection
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="bg-white/10 border border-white/30 backdrop-blur-md hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition cursor-pointer"
            >
              Explore More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;