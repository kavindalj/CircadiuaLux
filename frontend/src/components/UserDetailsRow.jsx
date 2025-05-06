import React from 'react';

const UserDetailsRow = ({ userType = 'Caretaker' }) => {
    const typeStyles =
        userType === 'Caretaker'
            ? 'bg-yellow-100 text-yellow-700 border-yellow-400'
            : 'bg-purple-100 text-purple-700 border-purple-400';

    return (
        <div className="flex items-center border-b py-3 px-4 hover:bg-gray-50 transition duration-150">
            <div className="w-[11.5%]">C1101</div> {/* User ID */}
            <div className="w-[19%]">
                <span className={`${typeStyles} text-sm px-3 py-1 rounded border`}>
                    {userType}
                </span>
            </div>
            <div className="w-[25%]">Srimal Fernando</div> {/* Name */}
            <div className="w-[30%]">srimal@example.com</div> {/* Email */}
            <div className="w-[18%]">0703898435</div> {/* Mobile */}
        </div>
    );
};

export default UserDetailsRow;
