import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Briefcase, Calendar, ExternalLink, ArrowUpDown, Layers, CheckCircle } from "lucide-react";

const staticProjects = [
  {
    title: "Portfolio Website for a Designer",
    description: "Need a React dev to help build a minimalist portfolio site for a fashion designer.",
    category: "Web Development",
    skills: "React, TailwindCSS, Framer Motion",
    contact: "https://linkedin.com/in/designer123",
    createdAt: "2024-10-01T10:00:00Z"
  },
  {
    title: "Figma to HTML Conversion",
    description: "I have a complete Figma file and need someone to turn it into responsive HTML/CSS.",
    category: "UI/UX Design",
    skills: "HTML, CSS, Figma",
    contact: "https://linkedin.com/in/frontendqueen",
    createdAt: "2024-10-10T15:00:00Z"
  },
  {
    title: "Mobile App for Study Tracker",
    description: "Looking for a Flutter developer to create a habit/study tracker for students.",
    category: "Mobile App",
    skills: "Flutter, Firebase",
    contact: "https://linkedin.com/in/techyteens",
    createdAt: "2024-11-05T09:30:00Z"
  }
];

const FindWork = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search term track state
  const [sortNewestFirst, setSortNewestFirst] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [appliedJobs, setAppliedJobs] = useState({}); // Tracking simulation lookup hash map

  const getUniqueOptions = (items, key) => {
    const allItems = items.flatMap(item => item[key]?.split(",").map(s => s.trim()) || []);
    return Array.from(new Set(allItems));
  };

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("miirupan-projects")) || [];

    const formattedUserProjects = storedProjects.map((p) => ({
      ...p,
      contact: `mailto:${p.authorEmail}`,
      skills: p.skills || "", 
    }));

    const all = [...staticProjects, ...formattedUserProjects];
    setProjects(all);
  }, []);

  const handleApplyToggle = (jobIdx) => {
    setAppliedJobs(prev => ({ ...prev, [jobIdx]: !prev[jobIdx] }));
  };

  const filteredProjects = projects
    .filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((p) =>
      selectedCategory === "All" || p.category.toLowerCase() === selectedCategory.toLowerCase()
    )
    .filter((p) => {
      if (selectedSkill === "All") return true;
      const skillsArray = p.skills?.toLowerCase().split(",").map(s => s.trim());
      return skillsArray?.includes(selectedSkill.toLowerCase());
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortNewestFirst ? dateB - dateA : dateA - dateB;
    });

  const allCategories = ["All", ...getUniqueOptions(projects, "category")];
  const allSkills = ["All", ...getUniqueOptions(projects, "skills")];

  return (
    <section className="min-h-screen px-4 md:px-20 py-16 bg-[#F196E4] text-[#1c1c1c] overflow-hidden">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-black text-center mb-10 tracking-tight"
      >
        Find open <span className="text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">Projects</span>
      </motion.h2>

      {/* Upgraded Feature: Title Search Input Module */}
      <div className="max-w-xl mx-auto mb-6 relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          <Search size={18} strokeWidth={2.5} />
        </div>
        <input 
          type="text"
          placeholder="Search by keywords, titles or tools..."
          className="w-full p-3.5 pl-11 rounded-xl border-4 border-black font-bold focus:outline-none bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm placeholder-gray-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Upgraded Control Panel Dropdowns Framework */}
      <div className="flex flex-wrap gap-3 justify-center mb-12 max-w-4xl mx-auto">
        <div className="flex items-center gap-1.5 border-4 border-black bg-white px-3 py-1.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <Layers size={14} className="text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="font-black text-xs sm:text-sm bg-transparent focus:outline-none cursor-pointer text-black"
          >
            {allCategories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat === "All" ? "All Categories" : cat}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5 border-4 border-black bg-white px-3 py-1.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <Briefcase size={14} className="text-gray-500" />
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="font-black text-xs sm:text-sm bg-transparent focus:outline-none cursor-pointer text-black"
          >
            {allSkills.map((skill, idx) => (
              <option key={idx} value={skill}>{skill === "All" ? "All Skills" : skill}</option>
            ))}
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSortNewestFirst(!sortNewestFirst)}
          className="px-4 py-2 border-4 border-black rounded-xl bg-[#FF8000] text-black font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFD9B3] transition-colors duration-150"
        >
          <ArrowUpDown size={14} />
          Order: {sortNewestFirst ? "Newest" : "Oldest"}
        </motion.button>
      </div>

      {/* Upgraded Feed Results Deck Card Container */}
      <motion.div layout className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white border-4 border-black p-8 rounded-xl text-center col-span-full font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              No matching freelance project specifications found. Try adjusting keywords.
            </motion.div>
          ) : (
            filteredProjects.map((project, index) => {
              const uniqueId = project.title + index;
              const hasApplied = appliedJobs[uniqueId];

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={uniqueId}
                  className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl p-5 sm:p-6 flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-150"
                >
                  <div>
                    {/* Category Label Strip */}
                    <span className="inline-block bg-[#F7CB46] text-black text-[10px] font-black px-2 py-0.5 border-2 border-black rounded uppercase tracking-wider mb-3 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                      {project.category}
                    </span>

                    <h3 className="text-xl font-black mb-2 tracking-tight leading-snug">{project.title}</h3>
                    <p className="text-gray-800 font-medium text-sm leading-relaxed mb-4">{project.description}</p>
                    
                    {/* Rendered Skill Chips Grid */}
                    {project.skills && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.skills.split(",").map((sk, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-800 font-bold text-[11px] px-2 py-0.5 border border-black rounded">
                            {sk.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Metadata and Actions Row */}
                  <div className="border-t-2 border-black pt-3 mt-2 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs font-bold text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} />
                        {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : "Recent"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      {project.contact && (
                        <a
                          href={project.contact}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center bg-white border-2 border-black text-black font-black text-xs py-2 rounded-md hover:bg-gray-100 transition flex items-center justify-center gap-1"
                        >
                          Details <ExternalLink size={12} />
                        </a>
                      )}
                      
                      {/* Upgraded Interactive State Option Switch */}
                      <button
                        onClick={() => handleApplyToggle(uniqueId)}
                        className={`flex-1 font-black text-xs py-2 border-2 border-black rounded-md transition duration-150 flex items-center justify-center gap-1 ${
                          hasApplied 
                            ? "bg-emerald-100 text-emerald-800 border-emerald-800" 
                            : "bg-[#FF8000] text-black hover:bg-[#FFD9B3]"
                        }`}
                      >
                        {hasApplied ? (
                          <>Applied <CheckCircle size={12} /></>
                        ) : (
                          "Apply Now"
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default FindWork;
