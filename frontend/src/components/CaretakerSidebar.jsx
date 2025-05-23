import React, { useEffect, useState } from 'react';
import { MdDashboard, MdPeople, MdSettings, MdLogout } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const CaretakerSidebar = () => {
  const [activeItem, setActiveItem] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', icon: MdDashboard, link: '/dashboard' },
    { label: 'Patients', icon: MdPeople, link: '/dashboard/patientDetails' },
    { label: 'Settings', icon: MdSettings, link: '/dashboard/settings' },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const matchedItem = navItems.find(item => item.link === currentPath);
    if (matchedItem) {
      setActiveItem(matchedItem.label);
    }
  }, [location.pathname]);

  // Logout function clears cookies and redirects
  const handleLogout = () => {
    Cookies.remove("userEmail");
    Cookies.remove("userRole");
    Cookies.remove("userSession");
    navigate("/"); // redirect to home or login page
  };

  return (
    <div className="w-[200px] h-[92vh] bg-gray-00 shadow-md border-r shadow-[#34A8DD] flex flex-col justify-between items-center py-5">
      <ul className="w-full mt-8 list-none">
        {navItems.map(({ label, icon: Icon, link }) => (
          <li key={label} className="w-full flex justify-center">
            <Link
              to={link}
              className={`flex items-center font-bold text-sm no-underline gap-2 px-10 py-2 w-full justify-start transition-colors duration-200 ${
                activeItem === label ? 'text-[#34A8DD]' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="text-lg" />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="w-full px-5 mb-4 flex justify-center">
        <button
          onClick={handleLogout}
          className="flex items-center font-bold text-sm gap-2 text-[#dc3545] hover:text-[#c82333] transition-colors duration-200 px-6 py-5 w-full justify-start cursor-pointer"
        >
          <MdLogout className="text-lg" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default CaretakerSidebar;
