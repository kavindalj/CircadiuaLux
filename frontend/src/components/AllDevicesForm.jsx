import React from 'react';
import DeviceDetailsRow from './DeviceDetailsRow';

const AllDevicesForm = () => {
    return (
        <div className="bg-white pt-8 pr-8 pb-8 pl-8 rounded-lg shadow-lg w-[950px] text-left">

            {/* Header Section */}
            <h2 className="text-2xl font-bold mb-6">All Devices</h2>

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

export default AllDevicesForm;
