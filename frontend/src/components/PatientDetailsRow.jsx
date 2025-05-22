import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import Modal from '../components/Modal';
import { FaCheck } from "react-icons/fa";
import { supabase } from "../supabaseClient";



const PatientDetailsRow = ({patientData}) => {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(patientData.patient_status);

    const [wakeTime, setWakeTime] = useState(patientData.wake_time || '');
    const [sleepDuration, setsleepDuration] = useState(patientData.sleep_duration || '');

    const handleSaveWakeTime = async () => {
        const { error } = await supabase
        .from('patients')
        .update({ wake_time: wakeTime })
        .eq('id', patientData.id);

        if (error) {
        console.error('Error updating wake time:', error.message);
        } else {
        console.log('Wake time updated');
        }
    };

    const handleSaveSleepDuration = async () => {
        const { error } = await supabase
        .from('patients')
        .update({ sleep_duration: sleepDuration })
        .eq('id', patientData.id);

        if (error) {
        console.error('Error updating sleep duration:', error.message);
        } else {
        console.log('Sleep duration updated');
        }
    };

    return (
        <>
            <div className="flex items-center border-b py-3  hover:bg-gray-50 transition duration-150 text-left">
                <div className="w-[12%]">{patientData.patient_name}</div>
                <div className="w-[12%]">{patientData.room_no}</div>
                <div className="w-[12%]">{patientData.gender}</div>
                <div className="w-[16%] flex items-center gap-2">
                    <span
                        className={`w-[100px] inline-block text-center 
                                ${currentStatus?.toLowerCase() === "admitted"
                                ? ` text-[#34A8DD] border-[#34A8DD]`
                                : currentStatus?.toLowerCase() === "discharged"
                                    ? `text-[#DC2626] border-[#DC2626]`
                                    : "text-gray-600 border-gray-400"
                            } text-sm px-3 py-1 rounded border`}
                    >
                        {currentStatus}
                    </span>
                    <span className='text-sm'>
                        <FaEdit onClick={() => setShowModal(true)} className='cursor-pointer text-gray-500 hover:text-gray-700' />
                    </span>
                </div>
                <div className="w-[16%]">
                    <div className='flex items-center gap-2 '>
                        <input
                        type='time'
                        name='wakeTime'
                        value={wakeTime}
                        onChange={(e) => setWakeTime(e.target.value)}
                        className=" border rounded border-[#34A8DD] text-sm px-3 py-1 "
                        />
                        <FaCheck
                            onClick={handleSaveWakeTime}
                            className='cursor-pointer text-gray-500 hover:text-gray-700 text-xs' />
                    </div>
                </div>

                <div className="w-[16%]">
                    <div className='flex items-center gap-2'>
                        <input
                        type='time'
                        name='sleep duration'
                        value={sleepDuration}
                        onChange={(e) => setsleepDuration(e.target.value)}
                        className=" border border-[#34A8DD] rounded text-sm px-3 py-1"
                        />
                        <FaCheck 
                            onClick={handleSaveSleepDuration}
                            className='cursor-pointer text-gray-500 hover:text-gray-700 text-xs' />
                    </div>
                </div>
                <div
                    className="w-[16%] text-sky-500 cursor-pointer hover:underline text-right"
                    onClick={() => navigate('/dashboard/seeMorePatient', { state: { patientId: patientData.id , patientStatus: patientData.patient_status} })}
                >
                    See more &gt;&gt;
                </div>
            </div>

            {showModal && (
                <Modal
                    patientId={patientData.id}
                    currentStatus={currentStatus}
                    onClose={() => setShowModal(false)}
                    onStatusUpdated={(updatedStatus) => setCurrentStatus(updatedStatus)}
                />
            )}
        </>
    );
};

export default PatientDetailsRow;