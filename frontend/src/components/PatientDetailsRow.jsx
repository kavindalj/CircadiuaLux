import React from 'react';
import { useNavigate } from 'react-router-dom';

const PatientDetailsRow = ({patientData}) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center border-b py-3 px-4 hover:bg-gray-50 transition duration-150">
            <div className="w-1/5">{patientData.patient_name}</div>
            <div className="w-1/5">{patientData.room_no}</div>
            <div className="w-1/5">{patientData.gender}</div>
            <div className="w-1/5">
                <span
                    className={`w-[100px] inline-block text-center 
                            ${patientData.patient_status.toLowerCase() === "admitted"
                            ? ` text-[#34A8DD] border-[#34A8DD]`
                            : patientData.patient_status.toLowerCase() === "discharged"
                                ? `text-[#DC2626] border-[#DC2626]`
                                : "text-gray-600 border-gray-400"
                        } text-sm px-3 py-1 rounded border`}
                >
                    {patientData.patient_status}
                </span>
            </div>
            <div
                className="w-1/5 text-sky-500 cursor-pointer hover:underline text-right"
                onClick={() => navigate('/dashboard/seeMorePatient')}
            >
                See more &gt;&gt;
            </div>
        </div>
    );
};

export default PatientDetailsRow;