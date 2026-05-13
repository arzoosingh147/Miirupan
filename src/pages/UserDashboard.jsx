import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, MessageSquare, Briefcase, PlusCircle, Edit3, FolderGit, LayoutDashboard } from "lucide-react";

const UserDashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const { posts } = useContext(PostContext);
  const [userProjects, setUserProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("posts"); // New dynamic view filter state

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("miirupan-user");
    if (!user && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (user?.email) {
      const allProjects = JSON.parse(localStorage.getItem("miirupan-projects")) || [];
      const filteredProjects = allProjects.filter(p => p.authorEmail === user.email);
      setUserProjects(filteredProjects);
    }
  }, [user, setUser]);

  const userPosts = posts.filter(post => post.authorEmail === user?.email);

  // Upgraded Feature: High contrast interceptor layout card for anonymous guests
  if (!user) {
    return (
      <div className="min-h-screen bg-[#F7CB46] flex items-center justify-center p-6 text-black">
        <div className="bg-white border-4 border-black p-8 rounded-xl max-w-sm text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <LayoutDashboard size={44} className="mx-auto mb-4 text-[#FF8000]" />
          <p className="font-black text-xl mb-3 tracking-tight">Access Restricted</p>
          <p className="text-sm font-bold text-gray-600 mb-6 leading-relaxed">Please log in to your creator account to inspect workspace metrics.</p>
          <button 
            onClick={() => navigate("/auth")}
            className="w-full bg-[#FF8000] text-black font-black py-3 border-4 border-black rounded-lg text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFD9B3] transition-colors"
          >
            Authenticate Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-[#F7CB46] min-h-screen text-black overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white p-5 sm:p-8 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        {/* Upper Profile Overview Header block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-4 border-black pb-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-4 border-black overflow-hidden bg-gray-50 shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <img 
                src={user.avatar || `pravatar.cc{user.email}`} 
                alt={user.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-none mb-1">Welcome, {user.name}</h2>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{user.bio || "Freelancer Workspace Member"}</p>
            </div>
          </div>

          {/* Quick Actions Action Array buttons */}
          <div className="flex gap-2 w-full sm:w-auto">
            <button 
              onClick={() => navigate("/edit-profile")}
              className="flex-1 sm:flex-none border-2 border-black bg-white px-3 py-2 rounded-lg font-black text-xs flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 transition"
            >
              <Edit3 size={14} /> Profile
            </button>
            <button 
              onClick={() => navigate("/post-project")}
              className="flex-1 sm:flex-none border-2 border-black bg-[#FF8000] px-3 py-2 rounded-lg font-black text-xs flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFD9B3] transition"
            >
              <PlusCircle size={14} /> New Listing
            </button>
          </div>
        </div>

        {/* Upgraded Feature: Workspace Total Summary Counters Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="border-4 border-black p-4 bg-gray-50 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black uppercase tracking-wider text-gray-500">Forum Posts</span>
              <MessageSquare size={16} className="text-[#F196E4]" />
            </div>
            <span className="text-3xl font-black">{userPosts.length}</span>
          </div>
          <div className="border-4 border-black p-4 bg-gray-50 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black uppercase tracking-wider text-gray-500">Active Gigs</span>
              <Briefcase size={16} className="text-[#FF8000]" />
            </div>
            <span className="text-3xl font-black">{userProjects.length}</span>
          </div>
        </div>

        {/* Upgraded Feature: Content View Tab Filter Segment bar */}
        <div className="flex border-b-4 border-black mb-6">
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-4 py-2.5 font-black text-sm border-t-4 border-x-4 border-black rounded-t-lg relative top-[4px] transition-all ${
              activeTab === "posts" ? "bg-white border-b-4 border-b-white z-10" : "bg-gray-100/50 hover:bg-gray-100"
            }`}
          >
            Community Contributions ({userPosts.length})
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2.5 font-black text-sm border-t-4 border-x-4 border-black rounded-t-lg relative top-[4px] transition-all ml-2 ${
              activeTab === "projects" ? "bg-white border-b-4 border-b-white z-10" : "bg-gray-100/50 hover:bg-gray-100"
            }`}
          >
            Project Listings ({userProjects.length})
          </button>
        </div>

        {/* Dynamic Display Board Modules */}
        <div className="min-h-[200px]">
          <AnimatePresence mode="wait">
            {activeTab === "posts" ? (
              <motion.div
                key="posts-panel"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-3"
              >
                {userPosts.length > 0 ? (
                  userPosts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => navigate(`/post/${post.id}`)}
                      className="p-4 border-4 border-black bg-white rounded-xl cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(241,150,228,1)] transition-all flex justify-between items-center gap-4"
                    >
                      <div className="min-w-0">
                        <h4 className="font-black text-lg truncate tracking-tight">{post.title}</h4>
                        <p className="text-gray-600 font-medium text-sm truncate">{post.description}</p>
                      </div>
                      <span className="shrink-0 text-[10px] font-black uppercase tracking-wider bg-gray-100 px-2 py-1 border border-black rounded">
                        View Thread →
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-8 font-bold text-gray-500 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                    You have not added any forum workspace logs yet.
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="projects-panel"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-3"
              >
                {userProjects.length > 0 ? (
                  userProjects.map((project, index) => (
                    <div
                      key={index}
                      className="p-4 border-4 border-black bg-white rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-start gap-3"
                    >
                      <div className="p-2 bg-[#F7CB46] border-2 border-black rounded shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] shrink-0">
                        <FolderGit size={16} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-lg tracking-tight mb-0.5">{project.title}</h4>
                        <p className="text-gray-700 font-medium text-sm leading-relaxed">{project.description}</p>
                        {project.category && (
                          <span className="inline-block mt-2 text-[10px] font-black uppercase bg-[#F196E4] px-1.5 py-0.5 border border-black rounded">
                            {project.category}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-8 font-bold text-gray-500 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                    No matching project listing briefs found in local browser storage.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
