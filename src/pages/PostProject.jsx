import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, FileText, FolderGit, CheckCircle2, AlertCircle } from "lucide-react";

const PostProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!title.trim() || !description.trim() || !category.trim()) {
      setFormError("Please fill out all required fields.");
      return;
    }

    // Safety Guard: Check if the user is authenticated first
    if (!user?.email) {
      setFormError("Please log in to your account to post a project listing.");
      return;
    }

    const newProject = {
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      skills: skills.trim(), 
      authorEmail: user.email,
      createdAt: new Date().toISOString()
    };

    const existingProjects = JSON.parse(localStorage.getItem("miirupan-projects")) || [];
    const updatedProjects = [...existingProjects, newProject];
    localStorage.setItem("miirupan-projects", JSON.stringify(updatedProjects));

    setTitle("");
    setDescription("");
    setCategory("");
    setSkills("");

    setIsSuccess(true);
    
    // Smooth delay before redirecting back to workspace feed
    setTimeout(() => {
      setIsSuccess(false);
      navigate("/find-work");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F7CB46] text-black flex items-center justify-center px-4 py-16 relative overflow-hidden">
      
      {/* Upgraded Feature: Custom Animated Neo-Brutalist Success Alert */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-white border-4 border-black p-4 rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 w-11/12 max-w-sm"
          >
            <CheckCircle2 className="text-emerald-500 shrink-0" size={24} strokeWidth={2.5} />
            <div>
              <p className="font-black text-sm">Listing Live!</p>
              <p className="text-xs font-bold text-gray-600">Redirecting you to the platform matching deck...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl bg-white rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8"
      >
        <h2 className="text-3xl font-black text-center text-black mb-8 tracking-tight">
          Post a Project
        </h2>

        {/* Inline Error Notice Board Container */}
        <AnimatePresence>
          {formError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-5 p-3 bg-red-100 border-2 border-black rounded-lg text-sm font-bold flex items-center gap-2"
            >
              <AlertCircle size={18} className="text-red-600 shrink-0" />
              <span>{formError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Project Title Input Area */}
          <div>
            <label className="text-black flex items-center gap-1.5 text-xs font-black uppercase tracking-wider mb-1">
              Project Title
            </label>
            <input
              type="text"
              maxLength={60}
              className="border-4 border-black w-full px-4 py-3 bg-white text-black rounded-lg font-bold focus:outline-none focus:bg-gray-50 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Build a Portfolio Website"
              required
            />
          </div>

          {/* Project Body Context Summary Area */}
          <div>
            <label className="text-black flex items-center gap-1.5 text-xs font-black uppercase tracking-wider mb-1">
              Description Summary
            </label>
            <textarea
              maxLength={300}
              className="border-4 border-black w-full px-4 py-3 bg-white text-black rounded-lg font-bold focus:outline-none focus:bg-gray-50 text-sm leading-relaxed resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a brief overview of your milestones, timelines, or parameters..."
              rows="4"
              required
            ></textarea>
            <div className="text-right text-[10px] font-black text-gray-500 mt-1 uppercase tracking-wide">
              {description.length}/300 characters
            </div>
          </div>

          {/* Grid Layout Row: Core Specification Metas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category Node Field */}
            <div>
              <label className="text-black flex items-center gap-1.5 text-xs font-black uppercase tracking-wider mb-1">
                <FolderGit size={13} /> Domain Category
              </label>
              <input
                type="text"
                className="border-4 border-black w-full px-3 py-2.5 bg-white text-black rounded-lg font-bold focus:outline-none focus:bg-gray-50 text-xs sm:text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Ex: Frontend, UI/UX Design"
                required
              />
            </div>

            {/* Core Competencies Skill Tokens Input */}
            <div>
              <label className="text-black flex items-center gap-1.5 text-xs font-black uppercase tracking-wider mb-1">
                <Sparkles size={13} /> Required Skills
              </label>
              <input
                type="text"
                className="border-4 border-black w-full px-3 py-2.5 bg-white text-black rounded-lg font-bold focus:outline-none focus:bg-gray-50 text-xs sm:text-sm"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Ex: React, Tailwind, Figma"
              />
            </div>
          </div>

          {/* High Contrast Primary CTA Button Action */}
          <div className="pt-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#FF8000] border-4 border-black text-black font-black py-3.5 px-4 rounded-lg text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFD9B3] transition-colors duration-150"
            >
              Publish Project Listing
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PostProject;
