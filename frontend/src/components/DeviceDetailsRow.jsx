import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeviceDetailsRow = ({deviceData}) => {

    const navigate = useNavigate();

    const statusStyles = deviceData.active_status === 'Online'
        ? 'bg-green-100 text-green-700 border-green-400'
        : 'bg-red-100 text-red-700 border-red-400';

    return (
        <div className="flex items-center border-b py-3 px-4 hover:bg-gray-50 transition duration-150">
            <div className="w-[17%]">{deviceData.device_id}</div>
            <div className="w-[17%] pt-0 pr-0 pb-0 pl-2">{deviceData.room_no}</div>
            <div className="w-[19%] pt-0 pr-1 pb-0 pl-3.5">
                <span className={`text-sm px-3 py-1 rounded border ${statusStyles}`}>
                    {deviceData.active_status}
                </span>
            </div>
            <div className="w-[19%] pt-0 pr-2 pb-0 pl-10">{deviceData.CCT_estimated || '-'}</div>
            <div className="w-1/2 pt-0 pr-2 pb-0 pl-16 flex justify-between items-center text-right">
                {deviceData.PhotopicLux || '-'}
                <span
                    className="text-sky-500 cursor-pointer hover:underline ml-2"
                    onClick={() => navigate('/dashboardAdmin/seeMoreDevice', { state: { defaultForm: 'lighting' }})
                    }
                >
                    See More &gt;&gt;
                </span>
            </div>
        </div>
    );
}

export default DeviceDetailsRow;
