import React, { useState, useContext } from "react";
import { PostContext } from "../context/PostContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PenTool, Heading, AlignLeft, Info } from "lucide-react";

const CreatePost = () => {
  const { addPost } = useContext(PostContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("project"); // Aligns with Community category keys
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      addPost(title, description, tag);
      navigate("/community");
    }
  };

  return (
    <div className="min-h-screen bg-[#F196E4] flex justify-center items-center px-4 py-12 text-black">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-6 sm:p-8 rounded-xl w-full max-w-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Upper Header Module (Spans full grid width) */}
        <div className="md:col-span-3 border-b-4 border-black pb-4 text-center md:text-left flex items-center justify-center md:justify-start gap-2.5">
          <PenTool size={26} className="text-[#FF8000]" />
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Draft Workspace Update</h2>
        </div>

        {/* Left Side Column: Guidelines Block */}
        <div className="md:col-span-1 border-4 border-black bg-gray-50 p-4 rounded-lg flex flex-col justify-between h-fit gap-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <div>
            <div className="flex items-center gap-1.5 font-black text-xs uppercase tracking-wider mb-2 text-gray-700">
              <Info size={14} />
              <span>Posting Tips</span>
            </div>
            <ul className="text-xs font-bold text-gray-600 space-y-2 list-disc list-inside">
              <li>Keep titles concise and action-focused.</li>
              <li>State collaboration requirements clearly.</li>
              <li>Assign the closest matching topical category label.</li>
            </ul>
          </div>
          <div className="bg-[#F7CB46] p-2 border-2 border-black rounded text-[10px] font-black text-center uppercase tracking-tight">
            ⚡ Publicly visible instantly
          </div>
        </div>

        {/* Right Side Column: Primary Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4 md:col-span-2">
          {/* Post Title Field */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider mb-1">
              <Heading size={14} /> Title
            </label>
            <input
              type="text"
              maxLength={70}
              placeholder="What are you building or looking for?"
              className="w-full border-4 border-black font-bold rounded-lg p-3 focus:outline-none bg-gray-50 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <div className="text-right text-[10px] font-bold text-gray-500 mt-1">
              {title.length}/70 chars
            </div>
          </div>

          {/* Topic Routing Selector Badge Array */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1">
              Post Category Tag
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "project", label: "🚀 Project", color: "bg-[#FF8000]" },
                { id: "guidance", label: "💡 Guidance", color: "bg-[#F7CB46]" },
                { id: "skills", label: "⚡ Skill Pitch", color: "bg-[#E39AE1]" }
              ].map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setTag(category.id)}
                  className={`px-3 py-1.5 border-2 border-black rounded text-xs font-black transition-all ${
                    tag === category.id
                      ? `${category.color} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]`
                      : "bg-white hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description Content Area */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider mb-1">
              <AlignLeft size={14} /> Body Description
            </label>
            <textarea
              maxLength={400}
              placeholder="Detail your technology stack parameters, goals, timelines, or skill requests..."
              className="w-full border-4 border-black font-bold rounded-lg p-3 h-32 resize-none focus:outline-none bg-gray-50 text-sm leading-relaxed"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            <div className="text-right text-[10px] font-bold text-gray-500 mt-1">
              {description.length}/400 chars
            </div>
          </div>

          {/* Submission CTA Block */}
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#FF8000] border-4 border-black text-black px-6 py-3.5 rounded-lg font-black text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFD9B3] transition-colors duration-150"
            >
              Publish Post Now
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreatePost;
