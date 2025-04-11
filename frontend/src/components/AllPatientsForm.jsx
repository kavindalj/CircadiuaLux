import React from 'react';
import PatientDetailsRow from './PatientDetailsRow';

const AllPatientsForm = () => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg w-[1000px] text-center">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-left text-xl font-bold mb-1">Patient Details</h2>
                <button className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition">
                    Add Patient
                </button>
            </div>

            {/* Table Headers */}
            <div className="flex text-sm font-semibold text-gray-400 border-b pb-2">
                <div className="w-1/5">Name</div>
                <div className="w-1/5">Room</div>
                <div className="w-1/5">Gender</div>
                <div className="w-1/5">Status</div>
            </div>

            {/* Patient Rows */}
            <PatientDetailsRow />
            <PatientDetailsRow />
            <PatientDetailsRow />
            <PatientDetailsRow />
            <PatientDetailsRow />
        </div>
    );
};

export default AllPatientsForm;
