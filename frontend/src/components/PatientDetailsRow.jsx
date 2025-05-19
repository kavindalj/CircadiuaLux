import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import Modal from '../components/Modal';

const PatientDetailsRow = ({patientData}) => {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(patientData.patient_status);

    return (
        <>
            <div className="flex items-center border-b py-3 px-4 hover:bg-gray-50 transition duration-150">
                <div className="w-1/5">{patientData.patient_name}</div>
                <div className="w-1/5">{patientData.room_no}</div>
                <div className="w-1/5">{patientData.gender}</div>
                <div className="w-1/5 flex justify-center items-center gap-2">
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
                <div
                    className="w-1/5 text-sky-500 cursor-pointer hover:underline text-right"
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