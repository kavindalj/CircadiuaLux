import React from 'react';
import UserDetailsRow from './UserDetailsRow';

const AllUsersForm = () => {
    return (
        <div className="bg-white pt-8 pr-8 pb-8 pl-8 rounded-lg shadow-lg w-[860px] text-left">

            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-left text-xl font-bold mb-2">All Users</h2>
                <button className="bg-sky-500 cursor-pointer text-white font-bold px-6 py-1 rounded hover:bg-sky-600 transition">
                    Add User
                </button>
            </div>

            {/* Table Headers */}
            <div className="flex text-sm font-semibold text-gray-400 border-b pb-3">
                <div className="w-[14%] pl-4">User ID</div>
                <div className="w-[20%]">User Type</div>
                <div className="w-[26%]">Name</div>
                <div className="w-[23.5%]">Email</div>
                <div className="w-[0%]">Mobile</div>
            </div>

            {/* User Rows */}
            <UserDetailsRow/>
            <UserDetailsRow/>
            <UserDetailsRow/>
        </div>
    );
};

export default AllUsersForm;
