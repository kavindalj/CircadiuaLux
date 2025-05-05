import React, { useState } from 'react';
import { MdDashboard, MdPeople, MdDevices, MdSettings, MdLogout } from 'react-icons/md';
import {Link} from 'react-router';

const AdminSidebar = () => {
    const [activeItem, setActiveItem] = useState('Dashboard');

    const navItems = [
        { label: 'Dashboard', icon: MdDashboard, link: '/dashboardAdmin' },
        { label: 'Manage Users', icon: MdPeople, link: '/dashboardAdmin/manageUsers' },
        { label: 'Manage Devices', icon: MdDevices, link: '/dashboardAdmin/manageDevices' },
        { label: 'Settings', icon: MdSettings, link: '/dashboardAdmin/settings' },
    ];

    const handleNavClick = (label) => {
        setActiveItem(label);
    };

    return (
        <div className="w-[240px] h-[92vh] bg-gray-00 shadow-md border-r shadow-[#34A8DD] flex flex-col justify-between items-center py-5">
            <ul className="w-full mt-8 list-none">
                {navItems.map(({ label, icon: Icon, link }) => (
                    <li key={label} className="w-full flex justify-center">
                        <Link
                            to={link}
                            onClick={() => handleNavClick(label)}
                            className={`flex items-center font-bold text-sm no-underline gap-2 px-10 py-2 w-full justify-start transition-colors duration-200 ${activeItem === label ? 'text-[#34A8DD]' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <Icon className="text-lg" />
                            <span>{label}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="w-full px-5 mb-4 flex justify-center">
                <Link
                    to="/"
                    className="flex items-center font-bold text-sm no-underline gap-2 text-[#dc3545] hover:text-[#c82333] transition-colors duration-200 px-6 py-5 w-full justify-start"
                >
                    <MdLogout className="text-lg" />
                    <span>Log Out</span>
                </Link>
            </div>
        </div>
    );
};

export default AdminSidebar;
