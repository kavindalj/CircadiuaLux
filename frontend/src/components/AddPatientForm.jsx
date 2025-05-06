import React, { useState } from "react";

const FormSection = ({ title, fields, formData, setFormData, errors, setErrors }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const stringOnlyFields = ["Name", "Symptoms", "Disease Description"];

    if (stringOnlyFields.includes(name)) {
      const onlyLetters = value.replace(/[^A-Za-z\s]/g, "");
      setFormData({ ...formData, [name]: onlyLetters });

      if (/[^A-Za-z\s]/.test(value)) {
        setErrors((prev) => ({ ...prev, [name]: "Only letters are allowed." }));
      } else {
        const { [name]: removed, ...rest } = errors;
        setErrors(rest);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

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
              <select
                name={field.label}
                value={formData[field.label] || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded text-gray-500 font-semibold"
              >
                <option value="">{field.placeholder}</option>
                {field.options.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.label}
                placeholder={field.placeholder}
                value={formData[field.label] || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded placeholder-gray-500 placeholder:font-semibold"
              />
            )}
            {errors[field.label] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.label]}</p>
            )}
          </div>
        ))}
      </form>
    </div>
  );
};

const AddPatientForm = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const requiredFields = [
      "Name", "Gender", "Age", "Room Number",
      "Disease Type", "Disease Description", "mm/dd/yy", "Symptoms",
      "Wakeup Time", "Person Type"
    ];

    const emptyFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === "");

    if (emptyFields.length > 0) {
      alert("⚠️ Please fill in all fields before submitting.");
      return;
    }
    
    if (Object.keys(errors).length === 0) {
      alert("✅ Patient added successfully!");
      console.log("Submitted:", formData);
      setFormData({});
    } else {
      alert("❌ Please fix the errors before submitting.");
    }    
  };

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
          <FormSection
            title="Patient Details"
            fields={patientDetails}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
          <FormSection
            title="Disease Information"
            fields={diseaseInfo}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
          <FormSection
            title="Sleeping Details"
            fields={sleepingDetails}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        </div>
        <div className="flex justify-center mt-4 mb-2">
          <button
            onClick={handleSubmit}
            className="bg-[#34A8DD] text-white px-6 py-2 rounded hover:bg-[#2b96c5] transition w-full max-w-4xl cursor-pointer"
          >
            Add Patient
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPatientForm;