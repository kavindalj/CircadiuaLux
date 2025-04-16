import React from 'react';

const DeviceDetailsRow = () => {
    const handleSeeMore = () => {
        alert('Viewing more details...');
    };

    const status = "Admitted"; 
    const blueTextColor = "#34A8DD";
    const blueBgLightColor = "#E1F5FE"; 

    return (
        <div className="flex items-center border-b py-3 px-4 hover:bg-gray-50 transition duration-150 text-center">
            <div className="w-1/5 ">Kavindu Perera</div>
            <div className="w-1/5">R1001</div>
            <div className="w-1/5">Male</div>
            <div className="w-1/5">14</div>
            <div
                className="w-1/5 text-sky-500 cursor-pointer hover:underline"
                onClick={handleSeeMore}
            >
                See more &gt;&gt;
            </div>
        </div>


    );
};

export default DeviceDetailsRow;