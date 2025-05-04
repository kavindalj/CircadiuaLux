import React from 'react';
import CaretakerDetailsRow from './CaretakerDetailsRow';

const AllCaretakersForm = () => {
    return (
        <div className="bg-white pt-8 pr-8 pb-8 pl-8 rounded-lg shadow-lg w-[500px] text-left">

            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-left text-xl font-bold mb-2">All Caretakers</h2>
                <button className="bg-sky-500 cursor-pointer text-white font-bold px-6 py-1 rounded hover:bg-sky-600 transition">
                    Add Caretaker
                </button>
            </div>

            {/* Table Headers */}
            <div className="flex text-sm font-semibold text-gray-400 border-b pb-3">
                <div className="w-[64%] pt- pr-10 pb-0 pl-4">Caretaker's Name</div>
                <div className="w-[40%]">Contact Number</div>
            </div>

            {/* Caretaker Rows */}
            <CaretakerDetailsRow />
            <CaretakerDetailsRow />
            <CaretakerDetailsRow />
        </div>
    );
};

export default AllCaretakersForm;
