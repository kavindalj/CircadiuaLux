import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Settings, Bell, User } from 'lucide-react';
import Logo from '../assets/images/Logo.png';

const suggestions = [
  { label: 'All patients form', path: '/all-patients-form' },
  { label: 'Add device form', path: '/add-device-form' },
  { label: 'Patient details form', path: '/patient-details-form' },
  { label: 'Password change form', path: '/password-change-form' },
];

const Nav = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const dropdownRef = useRef(null); 

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredSuggestions([]);
      return;
    }

    const filtered = suggestions.filter((item) =>
      item.label.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setFilteredSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className="bg-white shadow flex items-center justify-between p-4 h-16 border-b border-[#34A8DD]">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-42 overflow-hidden flex items-center justify-center">
            <img src={Logo} alt="Logo" className="h-auto w-auto scale-165" />
          </div>
        </div>

        <div className="flex-1 text-center">
          <span className="text-lg font-semibold">Dashboard</span>
        </div>

        <div className="relative flex items-center space-x-6" ref={dropdownRef}>
          {/* Search Input */}
          <div className="relative w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Search for something"
              className="px-2 py-1.5 bg-gray-100 rounded-full pl-10 w-full focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />

            {/* Dropdown */}
            {filteredSuggestions.length > 0 && (
              <ul className="absolute top-10 left-0 w-full bg-white border rounded-md shadow z-10">
                {filteredSuggestions.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                      onClick={() => {
                        setSearchTerm('');
                        setFilteredSuggestions([]);
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link to="/settings" className="relative p-2 rounded-full bg-gray-100">
            <Settings className="h-6 w-6 text-gray-500 cursor-pointer" />
          </Link>
          <Link to="/notifications" className="relative p-2 rounded-full bg-gray-100">
            <Bell className="h-6 w-6 text-gray-500 cursor-pointer" />
          </Link>
          <Link to="/profile" className="relative p-2 rounded-full bg-gray-100">
            <User className="h-6 w-6 text-gray-500 cursor-pointer" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
