import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiBookOpen, FiUser, FiUserPlus, FiPlusCircle } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { to: "/", label: "Home", icon: <FiHome className="w-5 h-5" /> },
    { to: "/blogs", label: "All Blogs", icon: <FiBookOpen className="w-5 h-5" /> },
    { to: "/login", label: "Login", icon: <FiUser className="w-5 h-5" /> },
    { to: "/register", label: "Register", icon: <FiUserPlus className="w-5 h-5" /> },
    { to: "/new", label: "New Post", icon: <FiPlusCircle className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-900/95 border-b border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 group">
              <img 
                src="/avatar.png" 
                alt="Logo" 
                className="h-8 w-8 rounded-full ring-2 ring-gray-700 group-hover:ring-blue-500 transition-all duration-300" 
              />
              <span className="text-xl font-bold text-white hidden sm:block">
                BlogApp
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${location.pathname === item.to 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-200 hover:bg-gray-800 hover:text-white'}`}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-200 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200
                  ${location.pathname === item.to 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-200 hover:bg-gray-800 hover:text-white'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
