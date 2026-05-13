import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FindWork from './pages/FindWork';
import PostProject from "./pages/PostProject";
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from "./components/Footer";
import Auth from "./pages/Auth";
import Community from "./pages/Community";
import CreatePost from "./pages/CreatePost"; 
import PostDetails from "./pages/PostDetails";
import UserDashboard from "./pages/UserDashboard";
import EditProfile from './pages/EditProfile';

// Upgraded Feature: Automatic Viewport Scroll Restorer
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Upgraded Feature: 404 Fallback Error Layout Component
const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#F196E4] flex items-center justify-center p-6 text-black">
      <div className="bg-white border-4 border-black p-8 rounded-xl max-w-md text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <span className="text-5xl font-black block mb-4">🚧 404</span>
        <h2 className="text-xl font-black mb-2 tracking-tight">Workspace Missing</h2>
        <p className="text-sm font-bold text-gray-600 mb-6 leading-relaxed">
          The project route parameter link has moved or does not exist inside our directory index.
        </p>
        <a 
          href="/" 
          className="inline-block bg-[#FF8000] border-2 border-black text-black font-black px-6 py-2 rounded-lg text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
          Return Home
        </a>
      </div>
    </div>
  );
};

// Upgraded Feature: Structural Static Information Mock Frameworks
const PrivacyPolicy = () => (
  <div className="min-h-screen bg-[#F7CB46] text-black p-8 flex items-center justify-center">
    <div className="bg-white border-4 border-black p-8 rounded-xl max-w-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-2xl font-black mb-4">Privacy Policy</h2>
      <p className="font-bold text-gray-700 text-sm">miirupan platform handles your data securely to match freelancers safely.</p>
    </div>
  </div>
);

const TermsOfService = () => (
  <div className="min-h-screen bg-[#F7CB46] text-black p-8 flex items-center justify-center">
    <div className="bg-white border-4 border-black p-8 rounded-xl max-w-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-2xl font-black mb-4">Terms of Service</h2>
      <p className="font-bold text-gray-700 text-sm">By collaborating here, you promise to maintain fair contribution standards.</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      {/* Resets layout height on navigation actions */}
      <ScrollToTop />
      
      <Navbar />
      
      <Routes>
        {/* Core Layout Interface Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/find-work" element={<FindWork />} />
        <Route path="/post-project" element={<PostProject />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Forum & Communication Deck Channels */}
        <Route path="/community" element={<Community />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostDetails />} />
        
        {/* Profile Tracking Settings Hubs */}
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/edit-profile" element={<EditProfile />} />

        {/* Legal & Static Information Links matching Footer references */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />

        {/* Fallback 404 Route Interceptor Catch-All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
