import React from 'react';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import PatientDetailsRow from './PatientDetailsRow';
import { supabase } from "../supabaseClient";

const AllPatientsTable = () => {

    const navigate = useNavigate();

    const [fetchError, setFetchError] = useState(null)
    const [patientsData, setpatientsData] = useState(null)

    //Fetch patent details
    useEffect(() => {
        const fetchPatientsData = async () => {
            const { data,error } = await supabase
                .from("patients")
                .select("id,patient_name, room_no, gender, patient_status");

                if(error){
                    setFetchError("Could not fetch patient data");
                    setpatientsData(null);
                    console.log("Error fetching: " , error);
                }
                if (data) {
                    console.log("Fetched patients:", data);
                    setpatientsData (data);
                    setFetchError(null);
                }
        }
        fetchPatientsData();
    }, [])

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg w-[1000px] text-center">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-left text-xl font-bold mb-1">Patient Details</h2>
                <button 
                    className="bg-sky-500 text-white font-bold px-10 py-2 rounded hover:bg-sky-600 transition"
                    onClick={() => navigate('/dashboard/addPatient')}
                >
                    Add Patient
                </button>
            </div>

            {/* Table Headers */}
            <div className="flex text-sm font-semibold text-gray-400 border-b pb-2">
                <div className="w-1/5">Name</div>
                <div className="w-1/5">Room</div>
                <div className="w-1/5">Gender</div>
                <div className="w-1/5">Status</div>
            </div>

            {fetchError && (<p>{fetchError}</p>)}
            {patientsData && (
                <div>
                    {patientsData.map(patientData => (
                        <PatientDetailsRow key={patientData.id} patientData={patientData} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllPatientsTable;
