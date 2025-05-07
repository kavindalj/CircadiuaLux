import React from 'react';
import { useNavigate } from 'react-router-dom';

const PatientDetailsRow = ({patientData}) => {
    const navigate = useNavigate();

    // Example status - in a real application, this would be passed as a prop
    // const status = "Admitted"; // Or "Discharged", or any other value
    const blueTextColor = "#34A8DD";
    const blueBgLightColor = "#E1F5FE"; // A light blue similar to Tailwind's blue-100

    return (
        <div className="flex items-center border-b py-3 px-4 hover:bg-gray-50 transition duration-150">
            <div className="w-1/5">{patientData.patient_name}</div>
            <div className="w-1/5">{patientData.room_no}</div>
            <div className="w-1/5">{patientData.gender}</div>
            <div className="w-1/5">
                <span
                    className={`${patientData.patient_status === "Admitted"
                            ? `bg-[${blueBgLightColor}] text-[${blueTextColor}] border-[${blueTextColor}]`
                            : patientData.patient_status === "Discharged"
                                ? `bg-[${blueBgLightColor}] text-[${blueTextColor}] border-[${blueTextColor}]`
                                : "bg-gray-100 text-gray-600 border-gray-400"
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