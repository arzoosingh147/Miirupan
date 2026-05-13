import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertCircle, Briefcase, User } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("freelancer"); // new platform intent state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!email || !password || (!isLogin && (!name || password !== confirmPassword))) {
      setFormError("Please fill all fields correctly.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    const newUser = {
      name: isLogin ? "Miirupan User" : name,
      email,
      avatar: "https://i.pravatar.cc/150?u=" + email,
      bio: `${role === "freelancer" ? "Freelancer" : "Client"} at Miirupan 💼`,
      role: role,
      posts: [],
    };

    setUser(newUser);
    navigate("/userdashboard");
  };

  return (
    <div className="min-h-screen bg-[#F7CB46] text-black flex items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-black text-center text-black mb-6 tracking-tight">
          {isLogin ? "Login to miirupan" : "Create Account"}
        </h2>

        {/* Upgraded Role Intent Selectors (Visible during registration) */}
        <AnimatePresence mode="wait">
          {!isLogin && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-2 gap-3 mb-6 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setRole("freelancer")}
                className={`p-3 border-4 border-black rounded-lg font-black text-xs sm:text-sm flex flex-col items-center gap-1.5 transition-all duration-150 ${
                  role === "freelancer" 
                    ? "bg-[#F196E4] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]" 
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <Briefcase size={18} />
                I am a Freelancer
              </button>
              <button
                type="button"
                onClick={() => setRole("client")}
                className={`p-3 border-4 border-black rounded-lg font-black text-xs sm:text-sm flex flex-col items-center gap-1.5 transition-all duration-150 ${
                  role === "client" 
                    ? "bg-[#F196E4] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]" 
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <User size={18} />
                I want to Hire
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inline Neo-Brutalist Error Message Box */}
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

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full mt-1 p-3 rounded-lg bg-white text-black border-4 border-black font-bold focus:outline-none focus:bg-gray-50"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-black uppercase tracking-wider text-black">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full mt-1 p-3 rounded-lg bg-white text-black border-4 border-black font-bold focus:outline-none focus:bg-gray-50"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-wider text-black">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full p-3 pr-10 rounded-lg bg-white text-black border-4 border-black font-bold focus:outline-none focus:bg-gray-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-black">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="********"
                className="w-full mt-1 p-3 rounded-lg bg-white text-black border-4 border-black font-bold focus:outline-none focus:bg-gray-50"
              />
            </div>
          )}

          {/* Upgraded High-Contrast Action Form Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full mt-2 py-3.5 bg-[#FF8000] border-4 border-black text-black rounded-lg font-black text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFD9B3] transition-colors duration-150"
          >
            {isLogin ? "Login to Workspace" : "Complete Registration"}
          </motion.button>
        </form>

        <p className="text-center text-sm mt-6 font-bold text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={toggleMode}
            className="ml-2 text-[#FF8000] font-black hover:underline focus:outline-none"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
