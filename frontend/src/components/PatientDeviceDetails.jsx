import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from "../supabaseClient";

const PatientDeviceDetails = () => {
  const location = useLocation();
  const patientId = location.state?.patientId;
  const defaultForm = location.state?.defaultForm || 'patient';  // fallback to 'patient'
  const [activeForm, setActiveForm] = useState(defaultForm);

  const patientStatus = location.state?.patientStatus;
  const isDischarged = patientStatus?.toLowerCase() === 'discharged';

  // Style classes for active and inactive buttons
  const activeTextColor = "text-black";
  const inactiveTextColor = "text-gray-500 hover:text-black";

  const [patientData, setPatientData] = useState(null)
  const [lightingData, setLightingData] = useState(null)

  const [patientError, setPatientError] = useState(null);
  const [lightingError, setLightingError] = useState(null);

  //Fetch users details
    useEffect(() => {
        const fetchpatientData = async () => {
          
          if (!patientId) return;

          const { data,error } = await supabase
              .from("patients")
              .select(`
                id,
                patient_name, 
                age, 
                gender,
                room_no, 
                disease_description, 
                Symptoms,
                diseases(
                  disease_name
                )
              `)
              .eq("id", patientId)
              .single();
      
              if(error){
                  setPatientError("Could not fetch patient data");
                  setPatientData(null);
                  console.log("Error fetching: " , error);
              }
              if (data) {
                  console.log("Fetched patients:", data);
                  setPatientData (data);
                  setPatientError(null);
                }
        }
        fetchpatientData();
    }, [patientId]);

    useEffect(() => {
        const fetchlightingData = async () => {
          
          if (!patientId) return;

          const timeZone = import.meta.env.VITE_TIMEZONE || 'Asia/Colombo';
          const time = new Date().toLocaleString("en-US", { timeZone });
          const current = new Date(time);
          const hours = current.getHours().toString().padStart(2, '0');
          const minutes = current.getMinutes() < 30 ? '00' : '30';
          const blockTime = `${hours}:${minutes}`;

          const { data,error } = await supabase
              .from("lighting_predictions")
              .select(`
                id,
                PhotopicLux, 
                mel_ratio, 
                CCT_estimated,
                time
              `)
              .eq("patient_id", patientId)
              .eq("time", blockTime)
              .single();
      
              if(error){
                  setLightingError("Could not fetch lighting data");
                  setLightingData(null);
                  console.log("Error fetching: " , error);
              }
              if (data) {
                  console.log("Fetched lighting data:", data);
                  setLightingData(data);
                  setLightingError(null);
                }
        }
        fetchlightingData();
    }, [patientId]);

  return (
    
 <div className="w-full h-[70vh] px-15 py-7 flex flex-col items-start">

      {/* Main container for buttons and forms */}
      <div className="w-full max-w-[350px] mt-1">

        {/* Buttons for switching between forms */}
        <div className="flex gap-4 mb-3">
          <button
            onClick={() => setActiveForm("patient")}
            className={`w-[300px] h-[40px] text-sm md:text-base px-1 py-1 font-medium rounded-lg cursor-pointer ${activeForm === "patient" ? `${activeTextColor} bg-gray-100` : `${inactiveTextColor}`
              }`}
          >
            Patient Details
          </button>
          <button
            onClick={() => {
              if (!isDischarged) setActiveForm("lighting");
            }}
            disabled={isDischarged}
            className={`w-[300px] h-[40px] text-sm md:text-base px-1 py-1 font-medium rounded-lg  
              ${isDischarged
                ? 'cursor-not-allowed text-gray-400 bg-gray-100'
                : activeForm === "lighting" 
                  ? `${activeTextColor} bg-gray-100`
                  : `${inactiveTextColor}`
              }`}
            title={isDischarged ? 'Lighting data is not available for discharged patients' : ''}  
          >
            Lighting Settings
          </button>
        </div>
        
        {patientError && <p className="text-red-500">{patientError}</p>}

        {/* Display Patient Details form if 'patient' tab is active */}
        {activeForm === "patient" && patientData && (
          <div className="shadow-md rounded-xl border p-6 space-y-7 h-[425px]">
            <div>
              <p className="font-semibold ">Patient Name : {patientData.patient_name}</p>
            </div>
            <div>
              <p className="font-semibold">Age : {patientData.age}</p>
            </div>
            <div>
              <p className="font-semibold">Gender : {patientData.gender}</p>
            </div>
            <div>
              <p className="font-semibold">Room Number : {patientData.room_no}</p>
            </div>
            <div>
              <p className="font-semibold">Disease : {patientData.diseases?.disease_name}</p>
            </div>
            <div>
              <p className="font-semibold">Disease description : {patientData.disease_description}</p>
            </div>
            <div>
              <p className="font-semibold">Symptoms : {patientData.Symptoms}</p>
            </div>
          </div>
        )}

        {lightingError && <p className="text-red-500">{lightingError}</p>}

        {/* Display Lighting Settings form if 'lighting' tab is active */}
        {activeForm === "lighting" && lightingData && (
          <div className="shadow-md rounded-xl border p-6 space-y-9 h-[400px]">
            <div>
              <p className="font-semibold">Intensity : {lightingData.PhotopicLux} </p>
            </div>
            <div>
              <p className="font-semibold">Color Temperature : {lightingData.CCT_estimated} </p>
            </div>
            <div>
              <p className="font-semibold">Mel-ratio : {lightingData.mel_ratio} </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PatientDeviceDetails;
