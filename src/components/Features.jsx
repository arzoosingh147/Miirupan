import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, Rocket, PenTool, Star, CheckCircle } from "lucide-react";

const features = [
  {
    title: "Post Projects Easily",
    description: "Clients can quickly post new freelance-friendly projects and connect with the right talent.",
    icon: <Briefcase size={28} className="text-[#E39AE1]" />,
    category: "clients",
  },
  {
    title: "Find Team Members",
    description: "Freelancers can join forces with others on exciting, real-world projects.",
    icon: <Users size={28} className="text-[#E39AE1]" />,
    category: "freelancers",
  },
  {
    title: "Real-Time Collaboration",
    description: "Work together smoothly with intuitive tools, feedback options, and status tracking.",
    icon: <Rocket size={28} className="text-[#E39AE1]" />,
    category: "both",
    hasPreview: true, // Triggers interactive milestone visual
  },
  {
    title: "Showcase Your Skills",
    description: "Create your public profile to stand out and build a solid freelance portfolio.",
    icon: <PenTool size={28} className="text-[#E39AE1]" />,
    category: "freelancers",
  },
  {
    title: "Earn & Grow",
    description: "Get recognition, testimonials, and future opportunities by contributing to real projects.",
    icon: <Star size={28} className="text-[#E39AE1]" />,
    category: "freelancers",
  },
];

const Features = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredFeatures = features.filter((f) => {
    if (activeFilter === "all") return true;
    return f.category === activeFilter || f.category === "both";
  });

  return (
    <section className="bg-[#F7CB46] py-20 px-4 sm:px-6 md:px-20 text-black overflow-hidden">
      {/* Section Title Heading */}
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-black text-center mb-8 tracking-tight"
      >
        Why <span className="text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">miirupan?</span>
      </motion.h2>

      {/* Upgraded Persona Segment Filter */}
      <div className="flex justify-center gap-3 mb-16">
        {[
          { id: "all", label: "All Features" },
          { id: "freelancers", label: "For Freelancers" },
          { id: "clients", label: "For Clients" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-4 py-2 border-4 border-black font-black rounded-lg transition-all duration-200 text-sm md:text-base ${
              activeFilter === tab.id
                ? "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
                : "bg-transparent text-black hover:bg-white/40"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid Layout Container - Explicit item stretching added here */}
      <motion.div 
        layout
        className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto items-stretch"
      >
        {filteredFeatures.map((feature, index) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ scale: 1.02, translateY: -4 }}
            key={feature.title}
            className="border-4 border-black bg-white p-6 rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-200 flex flex-col justify-between h-full"
          >
            {/* Upper Content Group - Expands dynamically via flex-1 */}
            <div className="flex-1 flex flex-col">
              {/* Icon Holder Frame */}
              <div className="mb-4 inline-block border-2 border-black bg-black p-2 rounded-lg self-start">
                {feature.icon}
              </div>
              
              <h3 className="text-2xl font-black mb-2 tracking-tight">{feature.title}</h3>
              <p className="text-gray-800 font-medium leading-relaxed mb-6">{feature.description}</p>
            </div>

            {/* Bottom Content Group - Keeps dashboard previews or structural placeholders anchored evenly */}
            <div className="mt-auto">
              {feature.hasPreview ? (
                /* Embedded Live Workspace Feature Demonstration Card */
                <div className="border-2 border-black rounded-lg bg-gray-50 p-3 text-xs font-bold space-y-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-gray-400 uppercase tracking-wider text-[10px]">Active Board Preview</p>
                  <div className="flex items-center justify-between border border-black p-1.5 rounded bg-white">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle size={14} className="text-emerald-500" /> UI Layout Design
                    </span>
                    <span className="bg-[#E39AE1] border border-black px-1 rounded text-[10px]">Done</span>
                  </div>
                  <div className="flex items-center justify-between border border-black p-1.5 rounded bg-white">
                    <span className="flex items-center gap-1.5">
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="w-3.5 h-3.5 border-2 border-[#F7CB46] border-t-transparent rounded-full"
                      /> API Integration
                    </span>
                    <span className="bg-[#F7CB46] border border-black px-1 rounded text-[10px]">In Progress</span>
                  </div>
                </div>
              ) : (
                /* Invisible Structural Spacer element to guarantee exact matching heights across row blocks */
                <div className="hidden lg:block h-[76px]" aria-hidden="true" />
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;
