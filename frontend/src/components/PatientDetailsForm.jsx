import React, { useState } from 'react';

const PatientDetailsForm = () => {
  const [activeForm, setActiveForm] = useState("patient");

  // Style classes for active and inactive buttons
  const activeTextColor = "text-black";
  const inactiveTextColor = "text-gray-500 hover:text-black";

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
            onClick={() => setActiveForm("lighting")}
            className={`w-[300px] h-[40px] text-sm md:text-base px-1 py-1 font-medium rounded-lg cursor-pointer ${activeForm === "lighting" ? `${activeTextColor} bg-gray-100` : `${inactiveTextColor}`
              }`}
          >
            Lighting Settings
          </button>
        </div>

        {/* Display Patient Details form if 'patient' tab is active */}
        {activeForm === "patient" && (
          <div className="shadow-md rounded-xl border p-6 space-y-9 h-[400px]">
            <div>
              <p className="font-semibold ">Patient Name</p>
            </div>
            <div>
              <p className="font-semibold">Age</p>
            </div>
            <div>
              <p className="font-semibold">Gender</p>
            </div>
            <div>
              <p className="font-semibold">Room Number</p>
            </div>
            <div>
              <p className="font-semibold">Disease</p>
            </div>
            <div>
              <p className="font-semibold">Disease Type</p>
            </div>
          </div>
        )}

        {/* Display Lighting Settings form if 'lighting' tab is active */}
        {activeForm === "lighting" && (
          <div className="shadow-md rounded-xl border p-6 space-y-9 h-[400px]">
            <div>
              <p className="font-semibold">Intensity</p>
            </div>
            <div>
              <p className="font-semibold">Color Temperature</p>
            </div>
            <div>
              <p className="font-semibold">Light Color</p>
            </div>
            <div>
              <p className="font-semibold">Lighting Duration</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PatientDetailsForm;
