import React from "react";

const FormSection = ({ title, fields }) => {
  return (
    <div className="p-4 rounded-2xl shadow-md w-full max-w-lg">
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
      <form className="space-y-4">
        {fields.map((field, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            {field.type === "select" ? (
              <select className="w-full border border-gray-300 p-2 rounded text-gray-500 font-semibold">
                <option disabled selected>{field.placeholder}</option>
                {field.options.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 p-2 rounded placeholder-gray-500 placeholder:font-semibold"
              />
            )}
          </div>
        ))}
      </form>
    </div>
  );
};

const Dashboard = () => {
  const patientDetails = [
    { label: "Name", type: "text", placeholder: "Enter Name" },
    { label: "Gender", type: "select", placeholder: "Select Gender", options: ["Male", "Female", "Other"] },
    { label: "Age", type: "number", placeholder: "Enter Age" },
    { label: "Room Number", type: "select", placeholder: "Select Room Number", options: ["101", "102", "103"] },
  ];

  const diseaseInfo = [
    { label: "Disease Type", type: "select", placeholder: "Select Disease Type", options: ["Diabetes", "Cholesterol", "Flu", "Allergy"] },
    { label: "Disease Description", type: "text", placeholder: "Enter Description" },
    { label: "mm/dd/yy", type: "date", placeholder: "Enter Date" },
    { label: "Symptoms", type: "text", placeholder: "Enter Symptoms" },
  ];

  const sleepingDetails = [
    { label: "Wakeup Time", type: "time", placeholder: "Select Wakeup Time" },
    { label: "Person Type", type: "select", placeholder: "Select Person Type", options: ["Early Riser", "Night Owl"] },
  ];

  return (
<div className="flex flex-col px-4 pt-0">
  <div className="w-full max-w-7xl">
    <div className="grid md:grid-cols-3 gap-8 justify-center">
      <FormSection title="Patient Details" fields={patientDetails} />
      <FormSection title="Disease Information" fields={diseaseInfo} />
      <FormSection title="Sleeping Details" fields={sleepingDetails} />
    </div>
    <div className="flex justify-center mt-4 mb-2">
      <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition w-full max-w-4xl cursor-pointer">
        Add Patient
      </button>
    </div>
  </div>
</div>

 );
};

export default Dashboard;
