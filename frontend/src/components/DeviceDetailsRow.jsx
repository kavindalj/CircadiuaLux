import React from 'react';

const DeviceDetailsRow = () => {
    const handleSeeMore = () => {
        alert('Viewing more details...');
    };

    return (
        <div className="flex items-center border-b py-3 px-4 hover:bg-gray-50 transition duration-150">
            <div className="w-[17%]">D1101</div>
            <div className="w-[17%] pt-0 pr-0 pb-0 pl-2">202</div>
            <div className="w-[19%] pt-0 pr-1 pb-0 pl-3.5">
                <span className="bg-green-100 text-green-700 border-green-400 text-sm px-3 py-1 rounded border">
                    Online
                </span>
            </div>
            <div className="w-[19%] pt-0 pr-2 pb-0 pl-10">#####</div>
            <div className="w-1/2 pt-0 pr-2 pb-0 pl-16 flex justify-between items-center text-right">
                #####
                <span
                    className="text-sky-500 cursor-pointer hover:underline ml-2"
                    onClick={handleSeeMore}
                >
                    See More &gt;&gt;
                </span>
            </div>
        </div>
    );
};

export default DeviceDetailsRow;
