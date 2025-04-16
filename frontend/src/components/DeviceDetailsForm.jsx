import React from 'react';
import DeviceDetailsRow from './DeviceDetailsRow';

const DeviceDetailsForm = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-[1000px] text-center">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-left text-xl font-bold mb-1">All Devices</h2>
        <button className="bg-sky-500 text-white font-bold px-10 py-2 rounded hover:bg-sky-600 transition cursor-pointer">
          Add Caretaker
        </button>

      </div>

      <div className="flex text-sm font-semibold text-gray-400 border-b pb-2 text-center">
        <div className="w-1/5">Patient Name</div>
        <div className="w-1/5">Room Number</div>
        <div className="w-1/5">Gender</div>
        <div className="w-1/5">Age</div>
        <div className="w-1/5"></div> {/* Empty header for action column */}
      </div>



      {/* Patient Rows */}
      <DeviceDetailsRow />
      <DeviceDetailsRow />
      <DeviceDetailsRow />
      <DeviceDetailsRow />
    </div>
  );
};

export default DeviceDetailsForm;
