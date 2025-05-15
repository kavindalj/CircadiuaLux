import React from 'react';

const UserDetailsRow = ({ userData }) => {
          
    return (
        <div className="flex items-center border-b py-3 px-4 hover:bg-gray-50 transition duration-150">
            <div className="w-[30%] ">{userData.id}</div> {/* User ID */}
            <div className="w-[15%] flex justify-start text-center ">
                <span
                    className={`text-sm px-3 py-1 rounded border text-center w-[100px]  ${
                        userData.role?.toLowerCase() === 'caretaker'
                            ? 'bg-yellow-100 text-yellow-700 border-yellow-400'
                            : 'bg-purple-100 text-purple-700 border-purple-400'
                    }`}>
                    {userData.role}
                </span>
            </div>
            <div className="w-[20%] ">{userData.full_name}</div> {/* Name */}
            <div className="w-[20%] ">{userData.email}</div> {/* Email */}
            <div className="w-[15%]  ">{userData.phone}</div> {/* Mobile */}
        </div>
    );
};

export default UserDetailsRow;
