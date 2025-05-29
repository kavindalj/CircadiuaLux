import React from 'react'

const DevicesListPagination = ({ totalDevices, devicesPerPage, setCurrentPage, currentPage }) => {

    const pages = [];

    for (let i = 1; i <= Math.ceil(totalDevices / devicesPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center mt-4 gap-2">
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`cursor-pointer shadow-md bg-gradient-to-r from-[#36AFDE] to-[#74DAF6] text-white hover:brightness-90 focus:outline-none text-bold focus:ring-4 focus:ring-blue-300 px-3 py-1 border rounded transition-all ${page === currentPage ? 'bg-[#73D9F6] hover:bg-[#056c9c] text-white' : 'bg-white text-gray-800 border-[#34A8DD] hover:bg-gray-100'}`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default DevicesListPagination