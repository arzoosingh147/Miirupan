import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell } from 'lucide-react';
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setShowNotifications(false);
  };

  // Helper function to apply styling to active links
  const linkStyle = (path) => 
    `transition duration-200 hover:text-[#F196E4] font-bold ${
      location.pathname === path ? 'text-[#F196E4] underline decoration-4 underline-offset-4' : 'text-white'
    }`;

  return (
    <nav className="bg-black border-b-4 border-black px-4 md:px-8 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
        <img src={logo} alt="Miirupan Logo" className="w-12 h-12 object-contain" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        <ul className="flex gap-6 font-bold items-center">
          <li><Link to="/" className={linkStyle('/')}>Home</Link></li>
          <li><Link to="/find-work" className={linkStyle('/find-work')}>Find Work</Link></li>
          <li><Link to="/about" className={linkStyle('/about')}>About</Link></li>
          <li><Link to="/contact" className={linkStyle('/contact')}>Contact</Link></li>
          <li><Link to="/userdashboard" className={linkStyle('/userdashboard')}>Dashboard</Link></li>
        </ul>

        {/* Action Items: Notifications & Auth */}
        <div className="flex items-center gap-4 relative">
          {/* Notification Feature */}
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-white hover:text-[#F196E4] transition duration-200"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-[#FF8000] border-2 border-black rounded-full"></span>
          </button>

          {/* Notification Dropdown Container */}
          {showNotifications && (
            <div className="absolute right-24 top-12 w-64 bg-white border-4 border-black text-black p-3 rounded-lg shadow-[4px_4px_0px_0px_rgba(241,150,228,1)] z-50 text-sm font-bold">
              <p className="border-b-2 border-black pb-1 mb-2 text-xs text-gray-500">Alerts</p>
              <div className="hover:bg-gray-100 p-1.5 rounded cursor-pointer">💼 New project match found!</div>
              <div className="hover:bg-gray-100 p-1.5 rounded cursor-pointer mt-1">💬 Design Guy sent a message</div>
            </div>
          )}

          <Link 
            to="/auth" 
            className="bg-white border-2 border-white text-black font-black text-center px-5 py-2 rounded-lg hover:bg-[#F196E4] hover:border-black transition duration-200 shadow-[3px_3px_0px_0px_rgba(255,128,0,1)]"
          >
            Log in
          </Link>
        </div>
      </div>

      {/* Mobile Right Controls */}
      <div className="flex md:hidden items-center gap-4">
        {/* Mobile Notification Bell */}
        <button 
          onClick={() => { setShowNotifications(!showNotifications); setIsOpen(false); }}
          className="relative p-1 text-white"
        >
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#FF8000] border border-black rounded-full"></span>
        </button>

        {/* Mobile Hamburger Trigger */}
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Floating Notification Card */}
      {showNotifications && !isOpen && (
        <div className="absolute right-4 top-16 w-64 bg-white border-4 border-black text-black p-3 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 text-sm font-bold md:hidden">
          <div className="hover:bg-gray-100 p-1.5 rounded">💼 New project match found!</div>
        </div>
      )}

      {/* Mobile Menu Panel */}
      {isOpen && (
        <ul className="absolute top-[76px] left-0 w-full bg-black border-b-4 border-black flex flex-col items-center gap-5 py-8 text-white font-bold md:hidden animate-in slide-in-from-top duration-200 z-40">
          <li><Link to="/" className={linkStyle('/')} onClick={closeMenu}>Home</Link></li>
          <li><Link to="/find-work" className={linkStyle('/find-work')} onClick={closeMenu}>Find Work</Link></li>
          <li><Link to="/about" className={linkStyle('/about')} onClick={closeMenu}>About</Link></li>
          <li><Link to="/contact" className={linkStyle('/contact')} onClick={closeMenu}>Contact</Link></li>
          <li><Link to="/userdashboard" className={linkStyle('/userdashboard')} onClick={closeMenu}>Dashboard</Link></li>
          <li className="w-full px-8 mt-2">
            <Link 
              to="/auth" 
              className="block bg-white text-black font-black text-center px-4 py-3 rounded-lg hover:bg-[#F196E4] transition duration-200 border-2 border-black" 
              onClick={closeMenu}
            >
              Log in
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
