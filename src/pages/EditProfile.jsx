import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, FileText, Link2, AlertCircle, Sparkles } from "lucide-react";

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [skills, setSkills] = useState(user?.skills || ["React", "UI Design"]);
  const [newSkill, setNewSkill] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSave = () => {
    setErrorMsg("");
    if (!name.trim() || !bio.trim() || !avatar.trim()) {
      setErrorMsg("Please fill out all required layout fields.");
      return;
    }

    setUser({ ...user, name, bio, avatar, skills });
    navigate("/userdashboard"); // Fixed to match your established routing paths
  };

  return (
    <div className="min-h-screen bg-[#F196E4] flex items-center justify-center px-4 py-12 text-black">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white p-6 sm:p-8 border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        <h2 className="text-3xl font-black text-center text-black mb-8 tracking-tight">Update Freelancer Profile</h2>

        {/* Inline Error Indicator Panel */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-5 p-3 bg-red-100 border-2 border-black rounded-lg text-sm font-bold flex items-center gap-2"
            >
              <AlertCircle size={18} className="text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upgraded Live Image Viewport Frame */}
        <div className="flex flex-col items-center gap-3 mb-6 pb-6 border-b-2 border-black">
          <div className="w-24 h-24 rounded-full border-4 border-black overflow-hidden bg-gray-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative group">
            {avatar ? (
              <img 
                src={avatar} 
                alt="Profile Live View Preview" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "pravatar.cc"; }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <User size={32} className="text-gray-400" />
              </div>
            )}
          </div>
          <p className="text-xs font-black uppercase tracking-wider text-gray-500">Live Avatar Viewport</p>
        </div>

        <div className="space-y-5">
          {/* Full Name Input Node */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-black mb-1">
              <User size={14} /> Full Name
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border-4 border-black font-bold focus:outline-none bg-gray-50 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
            />
          </div>

          {/* Biography Area Node */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-black mb-1">
              <FileText size={14} /> Brief Biography
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border-4 border-black font-bold focus:outline-none bg-gray-50 text-sm"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Your profession, skills, or target work domains..."
            />
          </div>

          {/* Profile Media URL Asset String Input */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-black mb-1">
              <Link2 size={14} /> Avatar Image URL
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border-4 border-black font-bold focus:outline-none bg-gray-50 text-sm"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="unsplash.com... or hosted image path"
            />
          </div>

          {/* Upgraded Feature: Skill Tags Creator Framework */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-black mb-1">
              <Sparkles size={14} /> Work Competencies & Skills
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="e.g. Tailwind, Copywriting"
                className="flex-1 p-2.5 rounded-lg border-4 border-black font-bold focus:outline-none bg-gray-50 text-xs"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(e)}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="bg-black text-white px-4 py-2 border-2 border-black rounded-lg font-black text-xs hover:bg-gray-800 transition"
              >
                Add
              </button>
            </div>
            
            {/* Rendered Skill Chips Grid */}
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-[#F7CB46] text-black font-black text-[11px] px-2.5 py-1 border-2 border-black rounded flex items-center gap-1.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                >
                  {skill}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-red-600 focus:outline-none font-black text-xs"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Primary Action Button Submission Row */}
          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="w-full bg-[#FF8000] border-4 border-black text-black py-3.5 rounded-lg font-black text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFD9B3] transition-colors duration-150"
            >
              Save Profile Updates
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EditProfile;
