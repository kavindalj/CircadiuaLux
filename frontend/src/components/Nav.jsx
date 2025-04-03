import React from 'react';
import { Search, Settings, Bell, User } from 'lucide-react';
import Logo from '../assets/images/Logo.png';

const Nav = () => {
  return (
    <nav className="bg-white shadow flex items-center justify-between p-4 h-16">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-42 overflow-hidden flex items-center justify-center">
          <img src={Logo} alt="Logo" className="h-auto w-auto scale-165" />
        </div>
      </div>
      <div className="flex-1 text-center">
        <span className="text-lg font-semibold">Dashboard</span>
      </div>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for something"
            className="px-2 py-1.5 bg-gray-100 rounded-full pl-10 focus:outline-none"
          />
          <a href="/search">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 cursor-pointer" />
          </a>
        </div>
        <a href="/settings" className="relative p-2 rounded-full bg-gray-100">
          <Settings className="h-6 w-6 text-gray-500 cursor-pointer" />
        </a>
        <a href="/notifications" className="relative p-2 rounded-full bg-gray-100">
          <Bell className="h-6 w-6 text-gray-500 cursor-pointer" />
        </a>
        <a href="/profile" className="relative p-2 rounded-full bg-gray-100">
          <User className="h-6 w-6 text-gray-500 cursor-pointer" />
        </a>
      </div>
    </nav>
  );
};

export default Nav;
