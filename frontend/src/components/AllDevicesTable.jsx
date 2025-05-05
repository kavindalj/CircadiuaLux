import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeviceDetailsRow from './DeviceDetailsRow';

const AllDevicesTable = () => {

    const navigate = useNavigate();

    return (
        <div className="bg-white pt-8 pr-8 pb-8 pl-8 rounded-lg shadow-lg w-[950px] text-left">

            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-left text-xl font-bold mb-1">All Devices</h2>
                <button 
                    className="bg-sky-500 text-white font-bold px-10 py-1.5 rounded hover:bg-sky-600 transition"
                    onClick={() => navigate('/dashboardAdmin/addDevice')}
                >
                    Add Device
                </button>
            </div>

            {/* Table Headers */}
            <div className="flex text-sm font-semibold text-gray-400 border-b pb-3 ">
                <div className="w-[12%]pt-0 pr-10 pb-0 pl-2">DeviceID</div>
                <div className="w-[16.5%]">Room Number</div>
                <div className="w-[15%]">Active Status</div>
                <div className="w-[18%]">Color Temperature</div>
                <div className="w-[12%] text-right">Color Intensity</div>
            </div>

            {/* Device Rows */}
            <DeviceDetailsRow />
            <DeviceDetailsRow />
            <DeviceDetailsRow />
            <DeviceDetailsRow />
            <DeviceDetailsRow />
        </div>
    );
};

export default AllDevicesTable;
