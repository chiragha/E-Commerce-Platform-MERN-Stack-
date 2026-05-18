import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  RefreshCcw,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: <Truck size={32} />,
    title: "Free Shipping",
    desc: "Free shipping on all orders above ₹999 across India.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Secure Payment",
    desc: "100% secure checkout with trusted payment methods.",
  },
  {
    icon: <RefreshCcw size={32} />,
    title: "Easy Returns",
    desc: "7-day hassle-free return and exchange policy.",
  },
  {
    icon: <Headphones size={32} />,
    title: "24/7 Support",
    desc: "Dedicated support team ready to help anytime.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-blue-600 font-semibold mb-3">
            WHY SHOP WITH US
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Experience Shopping
            <span className="text-blue-600"> Made Better</span>
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            We bring premium quality fashion with trusted
            service, secure shopping, and fast delivery.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;