import React from "react";
import aboutImg from "../assets/about.avif";
import Navbar from "./Navbar";
import Footer from "./Footer";

const About = () => {
  return (
   <>
   <Navbar />
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      
      {/* Blur Effects */}
      <div className="absolute top-10 left-0 w-72 h-72 bg-blue-300 opacity-20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300 opacity-20 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[40px] blur-2xl opacity-20 group-hover:opacity-30 transition duration-500"></div>

            <img
              src={aboutImg}
              alt="About"
              className="relative rounded-[40px] shadow-2xl object-cover h-[500px] w-full group-hover:scale-[1.02] transition duration-500"
            />
          </div>

          {/* Right Content */}
          <div>
            <span className="text-indigo-600 uppercase tracking-[4px] font-semibold text-sm">
              About Us
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">
              Fashion That Speaks Your Style
            </h2>

            <p className="text-gray-600 mt-6 leading-8">
              We bring premium quality fashion products that combine
              comfort, confidence, and affordability. Our mission is to
              make online shopping seamless with curated collections
              inspired by global fashion trends.
            </p>

            <div className="grid grid-cols-3 gap-5 mt-10">
              
              <div className="bg-white rounded-3xl shadow-lg p-5 text-center hover:-translate-y-2 transition duration-300">
                <h3 className="text-3xl font-bold text-indigo-600">
                  10K+
                </h3>
                <p className="text-gray-500 text-sm mt-2">
                  Happy Customers
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-lg p-5 text-center hover:-translate-y-2 transition duration-300">
                <h3 className="text-3xl font-bold text-indigo-600">
                  500+
                </h3>
                <p className="text-gray-500 text-sm mt-2">
                  Products
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-lg p-5 text-center hover:-translate-y-2 transition duration-300">
                <h3 className="text-3xl font-bold text-indigo-600">
                  99%
                </h3>
                <p className="text-gray-500 text-sm mt-2">
                  Satisfaction
                </p>
              </div>
            </div>

            <button className="mt-10 bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-4 rounded-2xl hover:scale-105 transition duration-300 shadow-lg">
              Explore Collection
            </button>
          </div>
        </div>
      </div>
    </section>
    <Footer />
   </>
  );
};

export default About;