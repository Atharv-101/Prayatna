import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Map, Ship, Compass, BarChart2, Bell, Menu, X, User, Search } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-full mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Anchor className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">OceanRoute</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="flex items-center px-3 py-2 rounded hover:bg-blue-800">
              <Map className="h-5 w-5 mr-1" />
              <span>Map</span>
            </Link>
            <Link to="/vessels" className="flex items-center px-3 py-2 rounded hover:bg-blue-800">
              <Ship className="h-5 w-5 mr-1" />
              <span>Vessels</span>
            </Link>
            <Link to="/routes" className="flex items-center px-3 py-2 rounded hover:bg-blue-800">
              <Compass className="h-5 w-5 mr-1" />
              <span>Routes</span>
            </Link>
            <Link to="/analytics" className="flex items-center px-3 py-2 rounded hover:bg-blue-800">
              <BarChart2 className="h-5 w-5 mr-1" />
              <span>Analytics</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search vessels, routes, ports..."
                  className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </form>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center">
            <Link to="/alerts" className="relative p-2 rounded-full hover:bg-blue-800 mr-2">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span>
            </Link>
            <Link to="/login" className="flex items-center px-4 py-2 rounded bg-blue-700 hover:bg-blue-600">
              <User className="h-5 w-5 mr-1" />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="mobile-menu-button p-2 rounded-md hover:bg-blue-800 focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <form onSubmit={handleSearch} className="mb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-full focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </form>
          <Link to="/" className="flex items-center px-3 py-2 rounded hover:bg-blue-800">
            <Map className="h-5 w-5 mr-2" />
            <span>Map</span>
          </Link>
          <Link to="/vessels" className="flex items-center px-3 py-2 rounded hover:bg-blue-800">
            <Ship className="h-5 w-5 mr-2" />
            <span>Vessels</span>
          </Link>
          <Link to="/routes" className="flex items-center px-3 py-2 rounded hover:bg-blue-800">
            <Compass className="h-5 w-5 mr-2" />
            <span>Routes</span>
          </Link>
          <Link to="/analytics" className="flex items-center px-3 py-2 rounded hover:bg-blue-800">
            <BarChart2 className="h-5 w-5 mr-2" />
            <span>Analytics</span>
          </Link>
          <Link to="/alerts" className="flex items-center px-3 py-2 rounded hover:bg-blue-800">
            <Bell className="h-5 w-5 mr-2" />
            <span>Alerts</span>
            <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">3</span>
          </Link>
          <Link to="/login" className="flex items-center px-3 py-2 rounded bg-blue-700 hover:bg-blue-600">
            <User className="h-5 w-5 mr-2" />
            <span>Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;