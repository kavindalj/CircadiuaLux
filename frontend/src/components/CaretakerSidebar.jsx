import React, { useState } from 'react';
import { MdDashboard, MdPeople, MdSettings, MdLogout } from 'react-icons/md';

const CaretakerSidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const navItems = [
    { label: 'Dashboard', icon: MdDashboard, link: '###########' },
    { label: 'Patients', icon: MdPeople, link: '###########' },
    { label: 'Settings', icon: MdSettings, link: '###########' },
  ];

  const handleNavClick = (label) => {
    setActiveItem(label);
  };

  return (
    <div className="w-[200px] h-[92vh] bg-gray-100 shadow-md border-r border-[#34A8DD] flex flex-col justify-between items-center py-5">
      <ul className="w-full mt-8 list-none">
        {navItems.map(({ label, icon: Icon, link }) => (
          <li key={label} className="w-full flex justify-center">
            <a
              href={link}
              onClick={() => handleNavClick(label)}
              className={`flex items-center font-bold text-sm no-underline gap-2 px-10 py-2 w-full justify-start transition-colors duration-200 ${
                activeItem === label ? 'text-[#34A8DD]' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="text-lg" />
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="w-full px-5 mb-4 flex justify-center">
        <a
          href="###########"
          className="flex items-center font-bold text-sm no-underline gap-2 text-[#dc3545] hover:text-[#c82333] transition-colors duration-200 px-6 py-5 w-full justify-start"
        >
          <MdLogout className="text-lg" />
          <span>Log Out</span>
        </a>
      </div>
    </div>
  );
};

export default CaretakerSidebar;
