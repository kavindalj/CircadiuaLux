import React from 'react';

const PatientDetailsRow = () => {
    const handleSeeMore = () => {
        alert('Viewing more details...');
    };

    return (
        <div className="flex items-center justify-between border-b py-3 px-4 hover:bg-gray-50 transition duration-150">
            <div className="w-1/5">Kavindu Perera</div>
            <div className="w-1/5">R1001</div>
            <div className="w-1/5">Male</div>
            <div className="w-1/5">
                <span className="bg-pink-100 text-pink-600 text-sm px-3 py-1 rounded border border-pink-600">
                    Discharged
                </span>

            </div>
            <div
                className="w-1/5 text-sky-500 cursor-pointer hover:underline text-right"
                onClick={handleSeeMore}
            >
                See more &gt;&gt;
            </div>
        </div>
    );
};

export default PatientDetailsRow;

