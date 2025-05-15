import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const AddPatientForm = () => {
  const [formData, setFormData] = useState({
    patient_name: "",
    age: "",
    gender: "",
    room_number: "",
    sleep_duration: "",
    wake_time: "",
    chronotype: "",
    disease_type: "",
    disease_description: "",
  });

  const [diseaseOptions, setDiseaseOptions] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]); // ✅ New state for room numbers

  useEffect(() => {
    const fetchDiseases = async () => {
      const { data, error } = await supabase
        .from("diseases")
        .select("disease_name");

      if (error) {
        console.error("Error fetching diseases:", error.message);
      } else {
        const names = data.map((d) => d.disease_name);
        setDiseaseOptions(names);
      }
    };

    const fetchRooms = async () => {
      const { data, error } = await supabase.from("devices").select("room_no");

      if (error) {
        console.error("Error fetching room numbers:", error.message);
      } else {
        const roomNos = data.map((device) => device.room_no);
        setRoomOptions(roomNos);
      }
    };

    fetchDiseases();
    fetchRooms(); // ✅ Fetch room numbers
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const stringOnlyFields = ["patient_name", "disease_description"];
    if (stringOnlyFields.includes(name)) {
      const lettersOnly = value.replace(/[^A-Za-z\s]/g, "");
      setFormData({ ...formData, [name]: lettersOnly });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmpty = Object.values(formData).some(
      (val) => val === "" || val === null || val === undefined
    );
    if (isEmpty) {
      alert("Please fill all fields!");
      return;
    }

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!timeRegex.test(formData.sleep_duration)) {
      alert("Sleep Duration must be in hh:mm format.");
      return;
    }

    if (!timeRegex.test(formData.wake_time)) {
      alert("Wake-up Time must be in hh:mm format.");
      return;
    }

    // ✅ Validate if selected room number exists in the fetched list
    if (!roomOptions.includes(formData.room_number)) {
      alert("Invalid room number selected.");
      return;
    }

    const { data, error } = await supabase.from("patients").insert([
      {
        patient_name: formData.patient_name,
        age: parseInt(formData.age),
        gender: formData.gender,
        room_no: formData.room_number,
        sleep_duration: formData.sleep_duration,
        wake_time: formData.wake_time,
        chronotype: formData.chronotype,
        disease_type: formData.disease_type,
        disease_description: formData.disease_description,
        patient_status: "Admitted",
      },
    ]);

    if (error) {
      console.error("Error inserting data:", error.message);
      alert(`Error adding patient: ${error.message}`);
    } else {
      alert("Patient added successfully!");
      setFormData({
        patient_name: "",
        age: "",
        gender: "",
        room_number: "",
        sleep_duration: "",
        wake_time: "",
        chronotype: "",
        disease_type: "",
        disease_description: "",
      });
    }
  };

  return (
    <div className="flex justify-center items-start py-8 px-4 min-h-[60vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-md shadow-md w-full max-w-lg space-y-1.5"
      >
        <h2 className="text-left text-2xl font-bold">Patient’s Information</h2>
        <p className="text-sm text-gray-500 text-left mt-1">
          Provide the necessary patient details, disease info, and sleep data.
        </p>

        {/* Patient Info */}
        <div className="space-y-1.5">
          <h3 className="font-medium mt-4 text-sm text-black">Patient Information</h3>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="patient_name"
              placeholder="Name"
              value={formData.patient_name}
              onChange={handleChange}
              className="p-1.5 text-sm border rounded-md border-gray-300"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              min="1"
              className="p-1.5 text-sm border rounded-md border-gray-300"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`p-1.5 rounded-md text-sm border border-gray-300 ${
                formData.gender ? "text-black" : "text-gray-500"
              }`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            {/* ✅ Updated input to dropdown for room number */}
<div className="relative">
  <input
    type="text"
    name="room_number"
    placeholder="Room Number"
    value={formData.room_number}
    onChange={handleChange}
    autoComplete="off"
    className="p-1.5 text-sm border rounded-md border-gray-300 w-full"
  />
  {formData.room_number && (
    <ul className="absolute z-10 bg-white border border-gray-300 mt-1 rounded-md w-full max-h-36 overflow-y-auto text-sm">
      {roomOptions
        .filter((room) =>
          room.toLowerCase().includes(formData.room_number.toLowerCase())
        )
        .map((room, index) => (
          <li
            key={index}
            onClick={() =>
              setFormData((prev) => ({ ...prev, room_number: room }))
            }
            className="px-2 py-1 cursor-pointer hover:bg-gray-100"
          >
            {room}
          </li>
        ))}
    </ul>
  )}
</div>
          </div>
        </div>

        {/* Sleep Info */}
        <div className="space-y-1.5">
          <h3 className="font-medium mt-6 text-sm text-black">Sleep Information</h3>
          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              name="sleep_duration"
              placeholder="Sleep Duration hh:mm"
              value={formData.sleep_duration}
              onChange={handleChange}
              className="p-1.5 text-sm border rounded-md border-gray-300"
            />
            <input
              type="text"
              name="wake_time"
              placeholder="Wake-up Time hh:mm"
              value={formData.wake_time}
              onChange={handleChange}
              className="p-1.5 text-sm border rounded-md border-gray-300"
            />
            <select
              name="chronotype"
              value={formData.chronotype}
              onChange={handleChange}
              className={`p-1.5 text-sm border rounded-md border-gray-300 ${
                formData.chronotype ? "text-black" : "text-gray-500"
              }`}
            >
              <option value="">Chronotype</option>
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

        {/* Disease Info */}
        <div className="space-y-1.5">
          <h3 className="font-medium mt-6 text-sm text-black">Disease Information</h3>
          <div className="grid grid-cols-2 gap-3">
            <select
              name="disease_type"
              value={formData.disease_type}
              onChange={handleChange}
              className={`p-1.5 text-sm border rounded-md border-gray-300 ${
                formData.disease_type ? "text-black" : "text-gray-500"
              }`}
            >
              <option value="">Select Disease Type</option>
              {diseaseOptions.map((disease, index) => (
                <option key={index} value={disease}>
                  {disease}
                </option>
              ))}
            </select>
          </div>
          <textarea
            name="disease_description"
            placeholder="Disease Description"
            value={formData.disease_description}
            onChange={handleChange}
            className="w-full p-2 text-sm border rounded-md border-gray-300 resize-none"
            rows={2}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full mt-3 py-2 font-bold text-white rounded-md cursor-pointer transition-all bg-[#34A8DD] hover:bg-[#056c9c]"
          >
            Add Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatientForm;
