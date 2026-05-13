import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, MessageSquare, ShieldAlert } from "lucide-react";

const Contact = () => {
  const [topic, setTopic] = useState("general");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSent, setIsSent] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Simulate API form post dispatch
    setIsSent(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setIsSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F7CB46] text-black px-4 sm:px-6 py-16 relative overflow-hidden">
      
      {/* Dynamic Form Success Notification banner */}
      <AnimatePresence>
        {isSent && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-white border-4 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 w-11/12 max-w-sm"
          >
            <CheckCircle className="text-emerald-500 shrink-0" size={24} />
            <div>
              <p className="font-black text-sm">Message Transmitted!</p>
              <p className="text-xs font-bold text-gray-600">Arzoo will get back to you shortly.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.h1
        className="text-4xl sm:text-6xl font-black text-center mb-12 text-black tracking-tight"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Get in Touch
      </motion.h1>

      <motion.div
        className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-black mb-8 text-base sm:text-lg font-bold text-center leading-relaxed">
          Have a question, want to collaborate, or just want to say hi? Drop a message
          below — we would love to hear from you!
        </p>

        {/* Upgraded Feature: Quick-Topic Routing Segment */}
        <div className="mb-6">
          <label className="block text-xs font-black uppercase tracking-wider text-black mb-2">
            Select Message Reason
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              { id: "general", label: "General", icon: <MessageSquare size={14} /> },
              { id: "collab", label: "Collab Project", icon: <Mail size={14} /> },
              { id: "bug", label: "Platform Bug", icon: <ShieldAlert size={14} /> }
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTopic(t.id)}
                className={`p-2.5 border-2 border-black rounded-lg font-black text-xs flex items-center justify-center gap-2 transition-all duration-150 ${
                  topic === t.id
                    ? "bg-[#F196E4] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="name" className="block text-xs font-black uppercase tracking-wider text-black mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-white text-black border-4 border-black font-bold focus:outline-none focus:bg-gray-50"
              placeholder="e.g. John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-black uppercase tracking-wider text-black mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-white text-black border-4 border-black font-bold focus:outline-none focus:bg-gray-50"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-black uppercase tracking-wider text-black mb-1">
              Message Content
            </label>
            <textarea
              id="message"
              required
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg bg-white text-black border-4 border-black font-bold focus:outline-none focus:bg-gray-50 resize-none"
              placeholder="Type out project parameters or notes here..."
            ></textarea>
          </div>

          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3.5 bg-[#FF8000] text-black border-4 border-black rounded-lg font-black text-base transition flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFD9B3]"
            >
              <Send size={18} strokeWidth={2.5} />
              Send Message
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
