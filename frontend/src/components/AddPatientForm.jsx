import React, { useState } from "react";

const AddPatientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    roomNumber: "",
    sleepDuration: "",
    wakeUpTime: "",
    personType: "",
    diseaseType: "",
    symptoms: "",
    diseaseDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const stringOnlyFields = ["name", "symptoms", "diseaseDescription"];
    if (stringOnlyFields.includes(name)) {
      const lettersOnly = value.replace(/[^A-Za-z\s]/g, "");
      setFormData({ ...formData, [name]: lettersOnly });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = Object.values(formData).some((val) => val === "");
    if (isEmpty) {
      alert("Please fill all fields!");
      return;
    }
    alert("Patient added successfully!");
    console.log("Submitted:", formData);
  };

  return (
    <div className="flex justify-center items-start py-6 px-4 min-h-[75vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-md shadow-md w-full max-w-lg space-y-1.5 min-h-[100px]"
      >
        {/* Top Title */}
        <div>
          <h2 className="text-left text-xl font-bold">Patient’s Information</h2>
          <p className="text-sm text-gray-500 text-left mb-4">
            Provide the necessary person’s information, disease details, and sleep information.
          </p>
        </div>

        {/* Patient Information */}
        <div className="space-y-1.5">
          <h3 className="font-medium text-sm text-black">Patient Information</h3>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="p-1.5 text-sm border rounded-md border-gray-300"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="p-1.5 text-sm border rounded-md border-gray-300 "
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="p-1.5 rounded-md text-sm border border-gray-300 text-gray-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="text"
              name="roomNumber"
              placeholder="Room Number"
              value={formData.roomNumber}
              onChange={handleChange}
              className="p-1.5 text-sm border rounded-md border-gray-300"
            />
          </div>
        </div>

       {/* Sleep Information */}
<div className="space-y-1.5">
  <h3 className="font-medium text-sm text-black">Sleep Information</h3>
  <div className="grid grid-cols-3 gap-3">
    <select
      name="sleepDuration"
      value={formData.sleepDuration}
      onChange={handleChange}
      className="p-1.5 text-sm border rounded-md border-gray-300 text-gray-500"
    >
      <option value="">Sleep Duration</option>
      {Array.from({ length: 144 }, (_, i) => {
        const hours = String(Math.floor(i / 6)).padStart(2, '0');
        const minutes = String((i % 6) * 10).padStart(2, '0');
        return (
          <option key={`duration-${i}`} value={`${hours}:${minutes}`}>
            {hours}:{minutes}
          </option>
        );
      })}
    </select>

    <select
      name="wakeUpTime"
      value={formData.wakeUpTime}
      onChange={handleChange}
      className="p-1.5 text-sm border rounded-md border-gray-300 text-gray-500"
    >
      <option value="">Wake Up Time</option>
      {Array.from({ length: 144 }, (_, i) => {
        const hours = String(Math.floor(i / 6)).padStart(2, '0');
        const minutes = String((i % 6) * 10).padStart(2, '0');
        return (
          <option key={`wake-${i}`} value={`${hours}:${minutes}`}>
            {hours}:{minutes}
          </option>
        );
      })}
    </select>

    <select
      name="personType"
      value={formData.personType}
      onChange={handleChange}
      className="p-1.5 text-sm border rounded-md border-gray-300 text-gray-500"
    >
      <option value="">Person Type</option>
      <option value="Definitely a morning type">Definitely a morning type</option>
      <option value="Rather more a morning type than an evening type">
        Rather more a morning type than an evening type
      </option>
      <option value="Rather more an evening type than a morning type">
        Rather more an evening type than a morning type
      </option>
      <option value="Definitely an evening type">Definitely an evening type</option>
    </select>
  </div>
</div>

        {/* Disease Information */}
        <div className="space-y-1.5">
          <h3 className="font-medium text-sm text-black">Disease Information</h3>
          <div className="grid grid-cols-2 gap-3">
            <select
              name="diseaseType"
              value={formData.diseaseType}
              onChange={handleChange}
              className="p-1.5 text-sm border rounded-md border-gray-300 text-gray-500"
            >
              <option value="">Select Disease Type</option>
              <option value="Diabetes">Diabetes</option>
              <option value="Cholesterol">Cholesterol</option>
              <option value="Asthma">Asthma</option>
              <option value="Flu">Flu</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="symptoms"
              placeholder="Symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              className="p-1.5 text-sm border rounded-md border-gray-300"
            />
          </div>
          <textarea
            name="diseaseDescription"
            placeholder="Disease Description"
            value={formData.diseaseDescription}
            onChange={handleChange}
            className="w-full p-2 text-sm border rounded-md border-gray-300 rounded resize-none"
            rows={2}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full mt-4 py-2 font-bold text-white rounded-md cursor-pointer transition-all bg-[#34A8DD] hover:bg-[#056c9c]"
          >
            Add Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatientForm;