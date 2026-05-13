import React, { useContext, useState } from "react";
import { PostContext } from "../context/PostContext";
import { ArrowUp, ArrowDown, Heart, Bookmark, MessageSquare, CornerDownRight, Tag, ChevronLeft, ChevronRight, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Community = () => {
  const context = useContext(PostContext) || {};
  const { addPost, updateVotes, addComment } = context;
  
  const [localPosts, setLocalPosts] = useState(context.posts || [
    {
      id: "1",
      title: "Welcome to miirupan Community!",
      description: "This is your creative space to share ideas, pitch skills, and find awesome project teammates.",
      tag: "guidance",
      votes: { up: 5, down: 0 },
      comments: [
        { text: "This layout looks incredibly clean!", replies: ["Agreed, brutalism rules!"] }
      ]
    }
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("project");
  const [filter, setFilter] = useState("all");
  const [commentInput, setCommentInput] = useState({});
  const [replyInput, setReplyInput] = useState({});
  const [showReplyBox, setShowReplyBox] = useState({});
  
  // Upgraded Feature: Modal state to hold the currently selected post for viewing comments
  const [activeModalPost, setActiveModalPost] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const [likes, setLikes] = useState({});
  const [saved, setSaved] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newPostObject = {
      id: String(Date.now()),
      title: title.trim(),
      description: description.trim(),
      tag: tag,
      votes: { up: 0, down: 0 },
      comments: [],
      createdAt: new Date().toISOString()
    };

    setLocalPosts((prev) => [newPostObject, ...prev]);

    if (typeof addPost === "function") {
      addPost(title, description, tag);
    }

    setTitle("");
    setDescription("");
    setTag("project");
    setCurrentPage(1);
  };

  const handleLocalVote = (postId, type) => {
    if (typeof updateVotes === "function") {
      updateVotes(postId, type);
    }
    
    const updated = localPosts.map((post) => {
      if (post.id !== postId) return post;
      const currentVotes = post.votes || { up: 0, down: 0 };
      return {
        ...post,
        votes: {
          up: type === "upvote" ? currentVotes.up + 1 : currentVotes.up,
          down: type === "downvote" ? currentVotes.down + 1 : currentVotes.down,
        },
      };
    });

    setLocalPosts(updated);

    // Sync active modal if it's currently open
    if (activeModalPost && activeModalPost.id === postId) {
      setActiveModalPost(updated.find(p => p.id === postId));
    }
  };

  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    const text = commentInput[postId];
    if (!text || !text.trim()) return;

    if (typeof addComment === "function") {
      addComment(postId, text);
    }

    const updated = localPosts.map((post) => {
      if (post.id !== postId) return post;
      const existingComments = post.comments || [];
      return {
        ...post,
        comments: [...existingComments, { text: text.trim(), replies: [] }]
      };
    });

    setLocalPosts(updated);
    
    // Dynamically re-sync modal state view data so the new comment populates the screen instantly
    if (activeModalPost && activeModalPost.id === postId) {
      setActiveModalPost(updated.find(p => p.id === postId));
    }

    setCommentInput({ ...commentInput, [postId]: "" });
  };

  const handleReplySubmit = (e, postId, commentIndex) => {
    e.preventDefault();
    const replyKey = `${postId}-${commentIndex}`;
    const text = replyInput[replyKey];
    if (!text || !text.trim()) return;

    const updated = localPosts.map((post) => {
      if (post.id !== postId) return post;
      const currentComments = [...(post.comments || [])];
      if (currentComments[commentIndex]) {
        const existingReplies = currentComments[commentIndex].replies || [];
        currentComments[commentIndex] = {
          ...currentComments[commentIndex],
          replies: [...existingReplies, text.trim()]
        };
      }
      return { ...post, comments: currentComments };
    });

    setLocalPosts(updated);

    if (activeModalPost && activeModalPost.id === postId) {
      setActiveModalPost(updated.find(p => p.id === postId));
    }

    setReplyInput({ ...replyInput, [replyKey]: "" });
    setShowReplyBox({ ...showReplyBox, [replyKey]: false });
  };

  const toggleLike = (postId) => {
    setLikes((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleSave = (postId) => {
    setSaved((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleReplyBox = (key) => {
    setShowReplyBox((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const filteredPosts =
    filter === "all" ? localPosts : localPosts.filter((post) => post.tag === filter);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const renderTagBadge = (tag) => {
    let color = "";
    switch (tag) {
      case "project":
        color = "bg-[#FF8000]";
        break;
      case "guidance":
        color = "bg-[#F7CB46]";
        break;
      case "skills":
        color = "bg-[#E39AE1]";
        break;
      default:
        color = "bg-white";
    }
    return (
      <span className={`px-2.5 py-1 border-2 border-black rounded font-black text-xs text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider`}>
        {tag}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F196E4] px-4 sm:px-6 py-12 text-black">
      <style dangerouslySetInnerHTML={{__html: `
        .modal-scrollbar::-webkit-scrollbar { width: 8px; }
        .modal-scrollbar::-webkit-scrollbar-track { background: #f3f4f6; border-left: 2px solid #000000; }
        .modal-scrollbar::-webkit-scrollbar-thumb { background: #000000; border-radius: 4px; }
      `}} />

      <h1 className="text-4xl sm:text-5xl font-black text-center mb-10 tracking-tight">Community Forum</h1>

      {/* Filter Segment System */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {[
          { id: "all", label: "All Topics" },
          { id: "project", label: "🚀 Projects" },
          { id: "guidance", label: "💡 Guidance" },
          { id: "skills", label: "⚡ Skill Pitch" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleFilterChange(tab.id)}
            className={`px-4 py-2 border-4 border-black font-black text-sm rounded-lg transition-all ${
              filter === tab.id
                ? "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
                : "bg-transparent hover:bg-white/30"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Post Submission Card */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl max-w-2xl mx-auto mb-16 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        <h2 className="text-2xl font-black mb-4 tracking-tight">Create a Post</h2>
        <input
          type="text"
          placeholder="Give your topic a clear title..."
          className="w-full p-3 mb-4 border-4 border-black font-bold rounded-lg focus:outline-none bg-gray-50 text-black font-bold"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Share your thought or project detail..."
          rows={3}
          className="w-full p-3 mb-4 border-4 border-black font-bold rounded-lg focus:outline-none bg-gray-50 text-black font-bold"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="flex items-center gap-2 border-4 border-black rounded-lg p-2 bg-gray-50">
            <Tag size={18} />
            <select
              className="bg-transparent font-black text-sm focus:outline-none cursor-pointer text-black"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              <option value="project">Project Listing</option>
              <option value="guidance">Request Guidance</option>
              <option value="skills">Skill Pitch Showcase</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-[#FF8000] border-4 border-black hover:bg-[#FFD9B3] text-black px-8 py-3 rounded-lg font-black transition shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            Publish Post
          </button>
        </div>
      </motion.form>

      {/* Forum Stream Layout Grid - Strictly Fixed Uniform Sizing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
        {currentPosts.length === 0 ? (
          <div className="bg-white border-4 border-black p-8 rounded-xl text-center col-span-full font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            No community updates match this category selection yet.
          </div>
        ) : (
          currentPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-5 rounded-xl border-4 border-black flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] min-h-[280px]"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-xl font-black tracking-tight leading-tight line-clamp-2 break-words">{post.title}</h3>
                  <div className="shrink-0">{renderTagBadge(post.tag)}</div>
                </div>
                <p className="text-gray-800 font-medium text-sm leading-relaxed line-clamp-4 break-words whitespace-pre-wrap mb-4">
                  {post.description}
                </p>
              </div>

              {/* Engagement Panel Section */}
              <div className="border-t-2 border-black pt-4 mt-auto">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 border-2 border-black rounded bg-gray-50 p-1">
                    <button
                      type="button"
                      onClick={() => handleLocalVote(post.id, "upvote")}
                      className="p-1 text-emerald-600 hover:bg-emerald-100 rounded transition"
                    >
                      <ArrowUp size={16} strokeWidth={3} />
                    </button>
                    <span className="font-black text-xs px-1">
                      {post.votes ? post.votes.up - post.votes.down : 0}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleLocalVote(post.id, "downvote")}
                      className="p-1 text-red-600 hover:bg-red-100 rounded transition"
                    >
                      <ArrowDown size={16} strokeWidth={3} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Upgraded Feature: Strict Uniform Sized Modal Router Trigger Button */}
                    <button
                      type="button"
                      onClick={() => setActiveModalPost(post)}
                      className="px-3 py-1.5 border-2 border-black rounded font-black text-xs flex items-center gap-1.5 bg-[#F7CB46] hover:bg-white transition shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black"
                    >
                      <MessageSquare size={14} />
                      <span>Comments ({post.comments?.length || 0})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleLike(post.id)}
                      className={`p-2 border-2 border-black rounded flex items-center justify-center transition shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                        likes[post.id] ? "bg-[#F196E4]" : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      <Heart size={16} fill={likes[post.id] ? "black" : "none"} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upgraded Feature: Infinite Workspace Sizing Fix - Overlay Bottom Panel Modal Slider */}
      <AnimatePresence>
        {activeModalPost && (
          <>
            {/* Dark background blanket blur layer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalPost(null)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Tactile Flat Neo-Brutalist Drawer Container */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto bg-white border-t-4 border-x-4 border-black rounded-t-2xl z-50 p-6 shadow-[0px_-8px_0px_0px_rgba(0,0,0,1)] max-h-[85vh] flex flex-col text-black"
            >
              {/* Drawer Top Header Module */}
              <div className="flex justify-between items-start gap-4 border-b-4 border-black pb-4 mb-4 shrink-0">
                <div>
                  <span className="inline-block mb-1.5 shrink-0">{renderTagBadge(activeModalPost.tag)}</span>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight line-clamp-1">{activeModalPost.title}</h2>
                </div>
                <button 
                  onClick={() => setActiveModalPost(null)}
                  className="p-1.5 border-2 border-black rounded-lg bg-gray-100 hover:bg-red-200 transition"
                >
                  <X size={18} strokeWidth={3} />
                </button>
              </div>

              {/* Scrollable Active Discussion Area Stream */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-4 modal-scrollbar mb-4">
                <div className="bg-gray-50 border-2 border-black p-3.5 rounded-xl mb-2">
                  <p className="text-xs font-black uppercase text-gray-400 tracking-wider mb-1">Topic Concept Description</p>
                  <p className="text-sm font-bold text-gray-800 break-words whitespace-pre-wrap">{activeModalPost.description}</p>
                </div>

                <h3 className="font-black text-sm uppercase tracking-widest text-gray-500 border-b-2 border-dashed border-gray-300 pb-1 flex items-center gap-1.5">
                  <MessageSquare size={14} /> Forum Replies Stream
                </h3>

                {activeModalPost.comments && activeModalPost.comments.length > 0 ? (
                  activeModalPost.comments.map((comment, index) => {
                    const replyKey = `${activeModalPost.id}-${index}`;
                    return (
                      <div key={index} className="bg-white border-2 border-black p-3 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] space-y-2 text-xs font-bold text-black break-words">
                        <p className="text-sm font-bold text-gray-900 leading-relaxed">{comment.text}</p>
                        
                        {/* Nested replies dynamic thread rendering logic panel */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="space-y-2 pl-3 border-l-2 border-dashed border-gray-400 mt-2 bg-gray-50 p-2 rounded-lg">
                            {comment.replies.map((reply, rIdx) => (
                              <div key={rIdx} className="flex items-start gap-1 text-gray-700 break-words">
                                <CornerDownRight size={12} className="mt-0.5 shrink-0" />
                                <p className="font-medium">{reply}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex justify-end pt-1">
                          <button
                            type="button"
                            onClick={() => toggleReplyBox(replyKey)}
                            className="text-[10px] uppercase font-black tracking-wider text-[#FF8000] hover:text-black"
                          >
                            {showReplyBox[replyKey] ? "[ Close ]" : "[ Reply ]"}
                          </button>
                        </div>

                        {/* Inline Nested Reply Form Input */}
                        <AnimatePresence>
                          {showReplyBox[replyKey] && (
                            <motion.form
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              onSubmit={(e) => handleReplySubmit(e, activeModalPost.id, index)}
                              className="flex gap-1.5 mt-2 overflow-hidden"
                            >
                              <input
                                type="text"
                                placeholder="Write structural solution reply..."
                                className="flex-1 p-2 border-2 border-black rounded focus:outline-none bg-white text-black font-bold text-xs"
                                value={replyInput[replyKey] || ""}
                                onChange={(e) => setReplyInput({ ...replyInput, [replyKey]: e.target.value })}
                                required
                              />
                              <button type="submit" className="bg-black text-white px-3 py-1 rounded text-xs font-black">
                                Send
                              </button>
                            </motion.form>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-gray-400 font-black py-4 italic text-center">No community feedback matching this topic parameters has dropped yet.</p>
                )}
              </div>

              {/* Bottom Main Content Level Form Submission Box */}
              <form 
                onSubmit={(e) => handleCommentSubmit(e, activeModalPost.id)} 
                className="flex gap-2 border-t-4 border-black pt-4 bg-white shrink-0"
              >
                <input
                  type="text"
                  placeholder="Contribute ideas to discussion context thread..."
                  className="flex-1 p-3 border-2 border-black rounded-lg text-xs font-bold focus:outline-none bg-gray-50 text-black placeholder-gray-400"
                  value={commentInput[activeModalPost.id] || ""}
                  onChange={(e) => setCommentInput({ ...commentInput, [activeModalPost.id]: e.target.value })}
                  required
                />
                <button
                  type="submit"
                  className="border-2 border-black bg-[#FF8000] p-3 rounded-lg hover:bg-[#FFD9B3] transition text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
                >
                  <Send size={14} strokeWidth={2.5} />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* High-Contrast Neo-Brutalist Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`p-2.5 border-4 border-black rounded-lg font-black text-sm flex items-center justify-center gap-1.5 transition-all ${
              currentPage === 1
                ? "bg-gray-300 opacity-50 cursor-not-allowed text-gray-500"
                : "bg-white text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
            }`}
          >
            <ChevronLeft size={16} strokeWidth={3} /> Prev
          </button>
          
          <div className="bg-black text-white border-4 border-black font-black px-4 py-2 rounded-lg text-sm shadow-[3px_3px_0px_0px_rgba(255,128,0,1)]">
            Page {currentPage} of {totalPages}
          </div>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`p-2.5 border-4 border-black rounded-lg font-black text-sm flex items-center justify-center gap-1.5 transition-all ${
              currentPage === totalPages
                ? "bg-gray-300 opacity-50 cursor-not-allowed text-gray-500"
                : "bg-white text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
            }`}
          >
            Next <ChevronRight size={16} strokeWidth={3} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Community;
