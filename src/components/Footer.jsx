import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0C0C0C] text-white border-t-4 border-black relative overflow-hidden">
      {/* Upper Layout Content Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Left Column: Brand Statement */}
        <div className="md:col-span-1">
          <h2 className="text-3xl font-black mb-4 text-white tracking-tight">miirupan</h2>
          <p className="text-gray-400 font-medium text-sm leading-relaxed max-w-sm">
            Where freelancers and innovators unite to build something awesome. Collaborate. Create. Grow.
          </p>
          {/* Dynamic Platform System Health Badge */}
          <div className="mt-4 inline-flex items-center gap-2 border-2 border-black bg-[#1A1A1A] px-3 py-1 rounded-md text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-gray-300">All Systems Operational</span>
          </div>
        </div>

        {/* Center Column: Native Internal Routing */}
        <div className="flex flex-col gap-2.5">
          <h4 className="font-black text-lg text-white mb-1 uppercase tracking-wider text-xs">Navigation</h4>
          <Link to="/" className="text-gray-400 hover:text-[#FF8000] font-bold text-sm transition duration-200">Home</Link>
          <Link to="/about" className="text-gray-400 hover:text-[#FF8000] font-bold text-sm transition duration-200">About</Link>
          <Link to="/find-work" className="text-gray-400 hover:text-[#FF8000] font-bold text-sm transition duration-200">Find Work</Link>
          <Link to="/contact" className="text-gray-400 hover:text-[#FF8000] font-bold text-sm transition duration-200">Contact</Link>
        </div>

        {/* Right-Center Column: Newsletter Capturing Engine */}
        <div className="md:col-span-1">
          <h4 className="font-black text-lg text-white mb-2 uppercase tracking-wider text-xs">Stay Updated</h4>
          <p className="text-xs text-gray-400 font-bold mb-3">Get notifications about fresh creative project drops.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2 max-w-sm">
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full bg-[#1A1A1A] text-white border-2 border-black px-3 py-2 rounded-lg text-xs font-bold placeholder-gray-500 focus:outline-none focus:border-[#FF8000]"
            />
            <button className="bg-[#FF8000] text-black font-black text-xs px-4 py-2 border-2 border-black rounded-lg hover:bg-[#FFD9B3] transition duration-200 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] whitespace-nowrap">
              Join
            </button>
          </form>
        </div>

        {/* Right Column: High-Contrast Social Connectors */}
        <div>
          <h4 className="font-black text-lg text-white mb-3 uppercase tracking-wider text-xs">Connect</h4>
          <div className="flex gap-3">
            {[
              { icon: <FaTwitter />, url: "https://twitter.com/" },
              { icon: <FaGithub />, url: "https://github.com/" },
              { icon: <FaLinkedin />, url: "https://linkedin.com/" }
            ].map((social, idx) => (
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                key={idx}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 bg-[#1A1A1A] border-2 border-black text-white hover:text-black hover:bg-[#FF8000] hover:border-white rounded-lg transition-colors duration-200 text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Decorative Copyright Border Deck */}
      <div className="border-t-2 border-[#1A1A1A] max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-gray-500">
        <div>
          © {new Date().getFullYear()} miirupan. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
          <a href="/terms" className="hover:text-white transition">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
