import React from 'react'

const DevicesListPagination = ({totalDevices,devicesPerPage,setCurrentPage, currentPage}) => {

    const pages = [];

    for(let i=1; i<= Math.ceil(totalDevices/devicesPerPage) ; i++) {
       pages.push(i); 
    }

    return (
        <div className="flex justify-center mt-4 gap-2">
            {pages.map((page) => (
                <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded cursor-pointer ${page === currentPage ? 'bg-[#34A8DD] hover:bg-[#056c9c] text-white' : 'bg-white text-gray-800 border-[#34A8DD] hover:bg-gray-100'}`}
                >
                {page}
                </button>
            ))}
        </div>
  );
};

export default DevicesListPagination