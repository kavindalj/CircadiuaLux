import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientDetailsRow from './PatientDetailsRow';
import { supabase } from "../supabaseClient";
import PatientsListPagination from './PatientsListPagination';

const AllPatientsTable = ({ filterByStatus = null }) => {
  const navigate = useNavigate();
  const [fetchError, setFetchError] = useState(null);
  const [patientsData, setpatientsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(7);

  useEffect(() => {
    const fetchPatientsData = async () => {
      const { data, error } = await supabase
        .from("patients")
        .select("id, patient_name, room_no, gender, patient_status")
        .order("patient_name", { ascending: true });

      if (error) {
        setFetchError("Could not fetch patient data");
        setpatientsData([]);
        console.error("Error fetching:", error);
      } else {
        const filteredData = filterByStatus
          ? data.filter((patient) =>
              patient.patient_status?.toLowerCase() === filterByStatus.toLowerCase()
            )
          : data;
        setpatientsData(filteredData);
        setFetchError(null);
      }
    };

    fetchPatientsData();
  }, [filterByStatus]);

  const lastPatientIndex = currentPage * patientsPerPage;
  const firstPatientIndex = lastPatientIndex - patientsPerPage;
  const currentPatients = patientsData.slice(firstPatientIndex, lastPatientIndex);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-[1000px] text-center">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-left text-xl font-bold mb-1">Patient Details</h2>
        <button
          className="bg-sky-500 text-white font-bold px-10 py-2 rounded hover:bg-sky-600 transition"
          onClick={() => navigate('/dashboard/addPatient')}
        >
          Add Patient
        </button>
      </div>

      <div className="flex text-sm font-semibold text-gray-400 border-b pb-2">
        <div className="w-1/5">Name</div>
        <div className="w-1/5">Room</div>
        <div className="w-1/5">Gender</div>
        <div className="w-1/5">Status</div>
      </div>

      {fetchError && <p>{fetchError}</p>}

      {patientsData && (
        <div className="min-h-[430px] flex flex-col justify-between">
          <div>
            {currentPatients.map((patientData) => (
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
