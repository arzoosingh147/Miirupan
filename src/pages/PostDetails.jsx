import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PostContext } from "../context/PostContext";
import { motion } from "framer-motion";
import { ArrowLeft, MessageSquare, Calendar, Send, User } from "lucide-react";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, addComment } = useContext(PostContext);
  const post = posts.find((p) => p.id === id || String(p.id) === String(id));

  const [comment, setComment] = useState("");

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F196E4] flex items-center justify-center p-6">
        <div className="bg-white border-4 border-black p-6 rounded-xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
          <p className="text-lg mb-4">Workspace update metadata not found.</p>
          <button 
            onClick={() => navigate("/community")}
            className="bg-[#FF8000] border-2 border-black px-4 py-2 rounded font-black text-xs uppercase"
          >
            Return to Community
          </button>
        </div>
      </div>
    );
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      addComment(post.id, comment.trim());
      setComment("");
    }
  };

  return (
    <div className="min-h-screen bg-[#F196E4] px-4 py-12 flex flex-col items-center text-black">
      <div className="max-w-3xl w-full mb-6">
        {/* Upgraded Feature: Quick Return Controller Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-white border-4 border-black px-4 py-2 rounded-lg font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-transform hover:translate-y-[-2px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        >
          <ArrowLeft size={14} strokeWidth={3} /> Back to Forum Feed
        </button>
      </div>

      {/* Main Content Layout Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full bg-white rounded-xl p-6 sm:p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        {/* Tag Meta Strip */}
        {post.tag && (
          <span className="inline-block bg-[#F7CB46] border-2 border-black rounded text-[10px] font-black uppercase tracking-wider px-2 py-0.5 mb-3 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            🚀 {post.tag}
          </span>
        )}

        <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mb-3 tracking-tight leading-tight">{post.title}</h2>
        
        {/* Metadata info grid row */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-500 mb-6 pb-4 border-b-2 border-dashed border-black">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            Posted: {post.createdAt ? new Date(post.createdAt).toLocaleString() : "Recent"}
          </span>
          <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 border border-black rounded">
            <MessageSquare size={12} /> {post.comments?.length || 0} Replies
          </span>
        </div>

        <p className="text-gray-800 font-medium text-base sm:text-lg leading-relaxed mb-8">{post.description}</p>

        {/* Reply Submission Entry Field Framework */}
        <div className="bg-gray-50 border-4 border-black p-4 rounded-xl mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-lg font-black mb-3 tracking-tight flex items-center gap-1.5">
            <MessageSquare size={18} /> Join the Discussion
          </h3>

          <form onSubmit={handleCommentSubmit} className="space-y-3">
            <textarea
              maxLength={250}
              className="w-full border-4 border-black font-bold rounded-lg p-3 h-24 resize-none focus:outline-none bg-white text-sm leading-relaxed"
              placeholder="Provide constructive feedback or state alignment interest..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">
                {comment.length}/250 characters max
              </span>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-[#FF8000] text-black border-4 border-black px-6 py-2.5 rounded-lg font-black text-sm flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFD9B3]"
              >
                <Send size={14} strokeWidth={2.5} /> Add Response
              </motion.button>
            </div>
          </form>
        </div>

        {/* Dynamic Comments List Deck */}
        <h3 className="text-xl font-black mb-4 tracking-tight">Active Conversation Thread</h3>
        <div className="space-y-4">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((c, index) => (
              <div 
                key={c.id || index} 
                className="bg-white border-2 border-black p-4 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-start gap-3"
              >
                <div className="p-1.5 bg-[#F7CB46] border border-black rounded shrink-0">
                  <User size={14} strokeWidth={2.5} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-bold text-sm sm:text-base leading-relaxed break-words">{c.text}</p>
                  <span className="text-[10px] font-black text-gray-400 block mt-2 uppercase tracking-wide">
                    ⏱️ {c.createdAt ? new Date(c.createdAt).toLocaleString() : "Just Now"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center text-sm font-bold text-gray-500 bg-gray-50">
              No replies matching these parameters have dropped yet. Be the first to add yours above!
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PostDetails;
