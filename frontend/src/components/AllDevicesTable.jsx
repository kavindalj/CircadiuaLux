import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeviceDetailsRow from './DeviceDetailsRow';
import { supabase } from "../supabaseClient";
import DevicesListPagination from './DevicesListPagination';

const AllDevicesTable = () => {

    const navigate = useNavigate();

    const [fetchError, setFetchError] = useState(null)
    const [devicesData, setdevicesData] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [devicesPerPage] = useState(7)

    //Fetch patent details
    useEffect(() => {
        const fetchdevicesData = async () => {

            //To get the current colombo time 
            const timeZone = import.meta.env.VITE_TIMEZONE;
            const time = new Date().toLocaleString("en-US", { timeZone });
            const current = new Date(time);
            const hours = current.getHours().toString().padStart(2, '0');
            const minutes = current.getMinutes() < 30 ? '00' : '30';
            const blockTime = `${hours}:${minutes}`;

            const { data, error } = await supabase
                .from("devices")
                .select(`
                    device_id,
                    room_no,
                    patients (
                        id,
                        patient_status,
                        lighting_predictions (
                            time,
                            PhotopicLux,
                            CCT_estimated
                        )
                    )
                `)
                .order('device_id', { ascending: true });

            if (error) {
                setFetchError("Could not fetch patient data");
                setdevicesData(null);
                console.log("Error fetching: ", error);
            }
            if (data) {
                const formatted = data.map(device => {
                    const admittedPatient = device.patients?.find(p => p.patient_status === 'Admitted');
                    const prediction = admittedPatient?.lighting_predictions?.find(lp => lp.time === blockTime);

                    return {
                        device_id: device.device_id,
                        room_no: device.room_no,
                        active_status: admittedPatient ? 'Online' : 'Offline',
                        CCT_estimated: prediction?.CCT_estimated || '-',
                        PhotopicLux: prediction?.PhotopicLux || '-',
                        patient_id: admittedPatient?.id || null
                    };
                });

                setdevicesData(formatted);
                setFetchError(null);
            }
        }
        fetchdevicesData();
    }, [])

    //Pagination part
    const lastDeviceIndex = currentPage * devicesPerPage
    const firstDeviceIndex = lastDeviceIndex - devicesPerPage
    const currentDevices = devicesData.slice(firstDeviceIndex, lastDeviceIndex)

    return (
        <div className="bg-white pt-8 pr-8 pb-8 pl-8 rounded-lg shadow-lg w-[1000px] text-left">

            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-left text-xl font-bold mb-2">All Devices</h2>
                <button
                    className="bg-sky-500 shadow-md cursor-pointer rounded-md text-white font-bold px-6 py-1 bg-gradient-to-r from-[#36AFDE] to-[#74DAF6] text-white  hover:brightness-90"
                    onClick={() => navigate('/dashboardAdmin/addDevice')}
                >
                    Add Device
                </button>
            </div>

            {/* Table Headers */}
            <div className="flex text-sm font-semibold text-gray-400 border-b pb-3 ">
                <div className="w-[12%] pt-0 pr-10 pb-0 pl-3">DeviceID</div>
                <div className="w-[16.5%] pl-3">Room Number</div>
                <div className="w-[15%] pl-1">Active Status</div>
                <div className="w-[18%]">Color Temperature</div>
                <div className="w-[12%] text-right">Color Intensity</div>
            </div>

            {/* Device Rows */}
            {/* <DeviceDetailsRow />
            <DeviceDetailsRow />
            <DeviceDetailsRow />
            <DeviceDetailsRow />
            <DeviceDetailsRow /> */}

            {fetchError && <p>{fetchError}</p>}
            {devicesData && (
                <div className="min-h-[430px] flex flex-col justify-between">
                    <div>
                        {currentDevices.map(device => (
                            <DeviceDetailsRow key={device.device_id} deviceData={device} />
                        ))}
                    </div>

                    <DevicesListPagination
                        totalDevices={devicesData.length}
                        devicesPerPage={devicesPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </div>
            )}

        </div>
    );
};

export default AllDevicesTable;
