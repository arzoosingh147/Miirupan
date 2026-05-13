import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Rocket, Users, Target } from "lucide-react";

const About = () => {
  // FAQ accordion state
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqData = [
    { q: "Is miirupan free to use?", a: "Yes! Connecting, posting projects, and finding collaborators on miirupan is completely free." },
    { q: "How do I secure my collaborations?", a: "We provide built-in progress milestones tracking workspaces to ensure all team members stay aligned." }
  ];

  return (
    <div className="min-h-screen bg-[#F196E4] text-black px-4 sm:px-6 py-16">
      {/* Title Header Block */}
      <motion.h1
        className="text-4xl sm:text-6xl font-black text-center mb-16 text-black tracking-tight"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About miirupan
      </motion.h1>

      <div className="max-w-4xl mx-auto space-y-16">
        {/* What is miirupan */}
        <motion.div
          className="bg-white rounded-xl p-6 sm:p-10 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="w-8 h-8 text-[#FF8000]" />
            <h2 className="text-2xl sm:text-3xl font-black text-black">What is miirupan?</h2>
          </div>
          <p className="text-black text-lg leading-relaxed font-medium">
            miirupan is a freelance collaboration hub designed to connect developers, designers,
            and writers in a friendly and productive space. It’s your go-to platform to post
            projects, find teammates, showcase skills, and build epic stuff together.
          </p>

          {/* Added Discipline Badges */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {["💻 Developers", "🎨 Designers", "✍️ Writers", "🚀 Product Managers"].map((badge, idx) => (
              <motion.span 
                whileHover={{ scale: 1.05 }}
                key={idx} 
                className="bg-[#FF8000] text-black text-sm font-black px-3 py-1.5 border-2 border-black rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                {badge}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Why it exists */}
        <motion.div
          className="bg-white rounded-xl p-6 sm:p-10 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-[#FF8000]" />
            <h2 className="text-2xl sm:text-3xl font-black text-black">Why miirupan?</h2>
          </div>
          <p className="text-black text-lg leading-relaxed font-medium">
            Most freelancers struggle to find reliable collaborators or fun passion projects to work
            on. miirupan solves that by making it easier to find like-minded creatives and build
            stuff that matters—together. Whether you're a coder, writer, or designer, this is your
            digital playground.
          </p>
        </motion.div>

        {/* How it works Layout Block */}
        <motion.div
          className="bg-white rounded-xl p-6 sm:p-10 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-[#FF8000]" />
            <h2 className="text-2xl sm:text-3xl font-black text-black">How does it work?</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { step: "01", text: "Post your project ideas and describe what you need." },
              { step: "02", text: "Collaborators can apply to join based on skills." },
              { step: "03", text: "Explore open listings and apply to join active teams." },
              { step: "04", text: "Connect, build elements, and grow together!" }
            ].map((item, idx) => (
              <div key={idx} className="border-2 border-black p-4 rounded-lg bg-gray-50 flex items-start gap-3">
                <span className="bg-[#FF8000] text-black font-black px-2 py-0.5 rounded border border-black text-sm">{item.step}</span>
                <p className="font-bold text-sm sm:text-base text-gray-800">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dynamic FAQ Accordion Block */}
        <motion.div
          className="bg-white rounded-xl p-6 sm:p-10 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-8 h-8 text-[#FF8000]" />
            <h2 className="text-2xl sm:text-3xl font-black text-black">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <div key={index} className="border-2 border-black rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 text-left font-black text-base transition-colors hover:bg-gray-100"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${activeFaq === index ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden bg-white"
                    >
                      <p className="p-4 border-t-2 border-black font-medium text-gray-700 text-sm sm:text-base">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Creator Block */}
        <motion.div
          className="bg-white rounded-xl p-6 sm:p-10 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl sm:text-3xl font-black text-black mb-4">Who built this?</h2>
          <p className="text-black text-lg leading-relaxed font-medium">
            Hi, I’m <span className="bg-[#FF8000] px-1.5 py-0.5 rounded border border-black font-black">Arzoo</span> – a passionate web developer and builder who loves turning ideas into
            interactive experiences. miirupan is my portfolio-worthy React + Tailwind + Framer
            Motion project that I hope helps other freelancers just like me!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
