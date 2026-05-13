import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#F196E4] px-4 md:px-20 text-center relative overflow-hidden">
      <div className="max-w-4xl z-10">
        {/* Live Activity Ticker */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block border-4 border-black bg-white text-black font-bold px-4 py-1.5 rounded-full text-sm mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          ⚡ Live: 1,240+ freelancers collaborating right now
        </motion.div>

        {/* Heading animation */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-[#1c1c1c] leading-tight"
        >
          Empowering <span className="text-white">Freelancers</span> <br />
          One Collaboration at a Time.
        </motion.h1>

        {/* Paragraph animation */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          viewport={{ once: true }}
          className="mt-6 text-lg md:text-xl text-[#1c1c1c] max-w-2xl mx-auto font-medium"
        >
          miirupan is your creative space to find collaborators, post projects, and track progress — all in one place.
        </motion.p>

        {/* Upgraded Feature: High-Contrast Navigation Actions Linked Blocks */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col sm:flex-row justify-center gap-4 items-center w-full max-w-md mx-auto"
        >
          {/* Get Started Button Wrapper -> Navigates to /auth login screen */}
          <Link to="/auth" className="w-full sm:w-auto block">
            <motion.button 
              whileHover={{ scale: 1.05, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto border-4 border-black bg-[#FF8000] text-black px-8 py-3.5 rounded-lg font-black hover:bg-[#FFD9B3] transition duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap"
            >
              Get Started Free
            </motion.button>
          </Link>

          {/* Explore Projects Button Wrapper -> Navigates to /find-work deck */}
          <Link to="/find-work" className="w-full sm:w-auto block">
            <motion.button 
              whileHover={{ scale: 1.05, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto border-4 border-black bg-white text-black px-8 py-3.5 rounded-lg font-black hover:bg-[#FFD9B3] transition duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap"
            >
              Explore Projects
            </motion.button>
          </Link>
        </motion.div>

        {/* Platform Trust Stats Counter */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-3 gap-4 border-4 border-black bg-white p-4 rounded-xl max-w-lg mx-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
          <div>
            <div className="text-xl md:text-2xl font-black text-[#1c1c1c]">10k+</div>
            <div className="text-xs md:text-sm font-bold text-gray-600">Creators</div>
          </div>
          <div className="border-x-4 border-black">
            <div className="text-xl md:text-2xl font-black text-[#1c1c1c]">4.8k+</div>
            <div className="text-xs md:text-sm font-bold text-gray-600">Projects</div>
          </div>
          <div>
            <div className="text-xl md:text-2xl font-black text-[#1c1c1c]">$2M+</div>
            <div className="text-xs md:text-sm font-bold text-gray-600">Earned</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
