import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
const Contact = () => {
  return (
    <>
    <Navbar />
    <section className="relative py-24 bg-slate-950 overflow-hidden text-white">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 opacity-20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 opacity-20 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <span className="uppercase tracking-[4px] text-blue-400 text-sm">
            Contact Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Need Help? We’re Here
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Reach out to us for product inquiries, support,
            or shopping assistance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-[35px] p-8">
            <h3 className="text-2xl font-bold mb-6">
              Send a Message
            </h3>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none resize-none"
              />

              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-4 rounded-2xl font-semibold hover:scale-[1.02] transition duration-300">
                Send Message
              </button>
            </div>
          </div>

          {/* Mini Chatbot */}
          <div className="bg-white rounded-[35px] text-black p-8 shadow-2xl">
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl">
                🤖
              </div>

              <div>
                <h3 className="font-bold text-xl">
                  AI Shopping Assistant
                </h3>

                <p className="text-green-600 text-sm">
                  Online Now
                </p>
              </div>
            </div>

            <div className="space-y-4">
              
              <div className="bg-gray-100 p-4 rounded-2xl max-w-[80%]">
                👋 Hi! How can I help you today?
              </div>

              <div className="bg-indigo-600 text-white p-4 rounded-2xl ml-auto max-w-[80%]">
                I need help finding trending fashion.
              </div>

              <div className="bg-gray-100 p-4 rounded-2xl max-w-[80%]">
                🔥 Our latest streetwear collection is trending now.
              </div>
            </div>

            <div className="flex mt-6 gap-3">
              <input
                type="text"
                placeholder="Type message..."
                className="flex-1 border rounded-2xl px-4"
              />

              <button className="bg-indigo-600 text-white px-6 rounded-2xl">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default Contact;