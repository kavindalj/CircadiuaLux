import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaCheckCircle } from "react-icons/fa";
import Modal from '../components/Modal';
import { supabase } from "../supabaseClient";
import { IoMdCheckboxOutline } from "react-icons/io";



const PatientDetailsRow = ({patientData}) => {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(patientData.patient_status);

    const [wakeTime, setWakeTime] = useState(patientData.wake_time || '');
    const [sleepDuration, setSleepDuration] = useState(patientData.sleep_duration || '');

    const [isSaving, setIsSaving] = useState(false);

    const handleSaveUpdatedTime = async () => {

        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

        if (!timeRegex.test(sleepDuration)) {
            alert("Sleep Duration must be in hh:mm format.");
            return;
        }

        if (!timeRegex.test(wakeTime)) {
            alert("Wake-up Time must be in hh:mm format.");
            return;
        }

        setIsSaving(true);
        const updates = {};

        if (wakeTime !== patientData.wake_time) {
        updates.wake_time = wakeTime;
        }
        if (sleepDuration !== patientData.sleep_duration) {
        updates.sleep_duration = sleepDuration;
        }

        if (Object.keys(updates).length === 0) {
        setIsSaving(false);
        return;
        }

        const { error } = await supabase
        .from('patients')
        .update(updates)
        .eq('id', patientData.id);

        if (error) {
        console.error('Error updating patient data:', error.message);
        } else {
        console.log('Patient data updated successfully');
        }

        setIsSaving(false);
    };

    return (
        <>
            <div className="flex items-center border-b py-3  hover:bg-gray-50 transition duration-150 text-left">
                <div className="w-[14%]">{patientData.patient_name}</div>
                <div className="w-[14%]">{patientData.room_no}</div>
                <div className="w-[13%]">{patientData.gender}</div>
                <div className="w-[18%] flex items-center gap-2">
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
                <div className="w-[13%]">
                    {currentStatus?.toLowerCase() !== "discharged" && (
                        <input
                        type="text"
                        name="wakeTime"
                        value={wakeTime}
                        onChange={(e) => setWakeTime(e.target.value)}
                        className="w-[100px] border rounded border-[#34A8DD] text-sm px-3 py-1"
                        placeholder="Wake Time"
                        />
                    )}
                </div>
                <div className="w-[18%]">
                    {currentStatus?.toLowerCase() !== "discharged" && (
                        <div className="flex items-center gap-2">
                        <input
                            type="text"
                            name="sleepDuration"
                            value={sleepDuration}
                            onChange={(e) => setSleepDuration(e.target.value)}
                            className="w-[100px] border rounded border-[#34A8DD] text-sm px-3 py-1"
                            placeholder="Sleep Duration"
                        />
                        {isSaving ? (
                            <div className="w-4 h-4 border-2 border-t-[#34A8DD] border-r-[#34A8DD] border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                        ) : (
                            <IoMdCheckboxOutline 
                            onClick={handleSaveUpdatedTime}
                            className="cursor-pointer text-gray-500 hover:text-gray-700 text-s"
                            />
                        )}
                        </div>
                    )}
                </div>
                <div
                    className="w-[10%] text-sky-500 cursor-pointer hover:underline text-right"
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