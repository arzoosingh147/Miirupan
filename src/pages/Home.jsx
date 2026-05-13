import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Zap } from "lucide-react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Community from "./Community";
import PostProject from "./PostProject";

const Home = () => {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // Monitor layout scroll position to display auxiliary utility key
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white text-black relative min-h-screen selection:bg-[#FF8000] selection:text-black">
      {/* Structural Gate Hook: Smooth Top-Level Mounting */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Hero />
        
        {/* Upgraded Feature: Inter-Section Live Neon Ticker */}
        <div className="bg-black text-white py-4 overflow-hidden border-y-4 border-black flex whitespace-nowrap select-none">
          <div className="animate-marquee flex gap-12 font-black text-xs sm:text-sm uppercase tracking-widest shrink-0 items-center">
            <span>🚀 Scale Your Freelance Network</span>
            <Zap size={14} className="text-[#F7CB46] fill-[#F7CB46]" />
            <span>💻 4,000+ Active Creative Developers</span>
            <Zap size={14} className="text-[#F196E4] fill-[#F196E4]" />
            <span>🎨 Match Requirements Instantly</span>
            <Zap size={14} className="text-[#FF8000] fill-[#FF8000]" />
            <span>✍️ Build Real World Production MVPs</span>
          </div>
          {/* Duplicate row to sustain infinite loop alignment */}
          <div className="animate-marquee flex gap-12 font-black text-xs sm:text-sm uppercase tracking-widest shrink-0 items-center ml-12" aria-hidden="true">
            <span>🚀 Scale Your Freelance Network</span>
            <Zap size={14} className="text-[#F7CB46] fill-[#F7CB46]" />
            <span>💻 4,000+ Active Creative Developers</span>
            <Zap size={14} className="text-[#F196E4] fill-[#F196E4]" />
            <span>🎨 Match Requirements Instantly</span>
            <Zap size={14} className="text-[#FF8000] fill-[#FF8000]" />
            <span>✍️ Build Real World Production MVPs</span>
          </div>
        </div>

        <Features />
        <Community />
        <PostProject />
      </motion.div>

      {/* Upgraded Feature: Interactive Neo-Brutalist Scroll-To-Top Trigger */}
      <AnimatePresence>
        {showScrollBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 bg-[#FF8000] text-black border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFD9B3] transition-colors focus:outline-none flex items-center justify-center"
            title="Scroll back to layout top header"
          >
            <ArrowUp size={22} strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
