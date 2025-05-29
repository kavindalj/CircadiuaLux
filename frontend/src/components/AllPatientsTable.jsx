import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientDetailsRow from './PatientDetailsRow';
import { supabase } from "../supabaseClient";
import PatientsListPagination from './PatientsListPagination';

const AllPatientsTable = () => {

    const navigate = useNavigate();

    const [fetchError, setFetchError] = useState(null)
    const [patientsData, setpatientsData] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [patientsPerPage] = useState(7)

    //Fetch patent details
    useEffect(() => {
        const fetchPatientsData = async () => {
            const { data, error } = await supabase
                .from("patients")
                .select("id,patient_name, room_no, gender, patient_status, wake_time, sleep_duration ")
                .order("patient_name", { ascending: true });

            if (error) {
                setFetchError("Could not fetch patient data");
                setpatientsData(null);
                console.log("Error fetching: ", error);
            }
            if (data) {
                console.log("Fetched patients:", data);
                setpatientsData(data);
                setFetchError(null);
            }
        }
        fetchPatientsData();
    }, [])

    //Pagination part
    const lastPatientIndex = currentPage * patientsPerPage
    const firstPatientIndex = lastPatientIndex - patientsPerPage
    const currentPatients = patientsData.slice(firstPatientIndex, lastPatientIndex)

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg w-[1000px] text-center">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-left mb-2 text-xl font-bold ">Patient Details</h2>
                <button
                    className=" cursor-pointer  bg-gradient-to-r from-[#36AFDE] to-[#74DAF6] text-white  hover:brightness-90 focus:outline-none rounded-md font-bold focus:ring-4 focus:ring-blue-300text-white shadow-md font-bold px-10 py-2 rounded hover:bg-sky-600 transition"
                    onClick={() => navigate('/dashboard/addPatient')}
                >
                    Add Patient
                </button>
            </div>

            {/* Table Headers */}
            <div className="flex text-sm font-semibold text-gray-400 border-b pb-2 text-left">
                <div className="w-[14.2%]">Name</div>
                <div className="w-[11.5%]">Room</div>
                <div className="w-[8%]">Gender</div>
                <div className="w-[20.9%]  pl-13">Status</div>
                <div className="w-[13%] ">Wakeup time</div>
                <div className="w-[18%]">Sleep duration</div>

            </div>

            {fetchError && (<p>{fetchError}</p>)}
            {patientsData && (
                <div className="min-h-[430px] flex flex-col justify-between">
                    <div>
                        {currentPatients.map(patientData => (
                            <PatientDetailsRow key={patientData.id} patientData={patientData} />
                        ))}
                    </div>

                    <PatientsListPagination
                        totalPatients={patientsData.length}
                        patientsPerPage={patientsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </div>
            )}
        </div>
    );
};

export default AllPatientsTable;
