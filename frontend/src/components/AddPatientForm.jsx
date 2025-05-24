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
    disease_id: "",
    disease_description: "",
    disease_search: "",
  });

  const [diseaseOptions, setDiseaseOptions] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);
  const [occupiedRooms, setOccupiedRooms] = useState([]);
  const [showRoomSuggestions, setShowRoomSuggestions] = useState(false);

  useEffect(() => {
    const fetchDiseases = async () => {
      const { data, error } = await supabase
        .from("diseases")
        .select("disease_id, disease_name");
      if (!error) setDiseaseOptions(data);
    };

    const fetchRooms = async () => {
      const { data: allRooms, error: roomsError } = await supabase
        .from("devices")
        .select("room_no");

      if (roomsError) return console.error("Error fetching rooms:", roomsError);

      const { data: occupiedData, error: occupiedError } = await supabase
        .from("patients")
        .select("room_no")
        .eq("patient_status", "Admitted");

      if (occupiedError) return console.error("Error fetching occupied rooms:", occupiedError);

      const occupied = occupiedData.map(room => room.room_no);
      setOccupiedRooms(occupied);
      setRoomOptions(allRooms.map(device => device.room_no));
    };

    fetchDiseases();
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["patient_name", "disease_description"].includes(name)) {
      setFormData({ ...formData, [name]: value.replace(/[^A-Za-z\s]/g, "") });
    } else if (name === "room_number") {
      setFormData({ ...formData, [name]: value.trim() });
      setShowRoomSuggestions(true);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRoomSelect = (room) => {
    if (occupiedRooms.includes(room)) {
      alert("This room is already occupied. Please select a different room.");
      return;
    }
    setFormData((prev) => ({ ...prev, room_number: room }));
    setShowRoomSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmpty = Object.entries(formData).some(
      ([key, val]) => key !== "disease_search" && (val === "" || val == null)
    );
    if (isEmpty) return alert("Please fill all fields!");

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(formData.sleep_duration)) return alert("Sleep Duration must be in hh:mm format.");
    if (!timeRegex.test(formData.wake_time)) return alert("Wake-up Time must be in hh:mm format.");
    if (!roomOptions.includes(formData.room_number)) return alert("Invalid room number selected.");

    const { data: existingRoom, error: roomCheckError } = await supabase
      .from("patients")
      .select("id")
      .eq("room_no", formData.room_number)
      .eq("patient_status", "Admitted")
      .maybeSingle();

    if (roomCheckError) return alert("Error verifying room number: " + roomCheckError.message);
    if (existingRoom) return alert("This room is already occupied by another admitted patient.");

    let disease_id;
    const diseaseName = formData.disease_search.trim();
    if (!diseaseName) return alert("Please provide a disease name.");

    const { data: existingDisease, error: searchError } = await supabase
      .from("diseases")
      .select("disease_id")
      .eq("disease_name", diseaseName)
      .single();

    if (searchError && searchError.code !== 'PGRST116') return alert("Error searching for disease: " + searchError.message);

    if (existingDisease) {
      disease_id = existingDisease.disease_id;
    } else {
      const { data: newDisease, error: insertError } = await supabase
        .from("diseases")
        .insert([{ disease_name: diseaseName }])
        .select("disease_id")
        .single();

      if (insertError) return alert("Error adding new disease: " + insertError.message);
      disease_id = newDisease.disease_id;
    }

    const { error: patientError } = await supabase.from("patients").insert([
      {
        patient_name: formData.patient_name,
        age: parseInt(formData.age),
        gender: formData.gender,
        room_no: formData.room_number,
        sleep_duration: formData.sleep_duration,
        wake_time: formData.wake_time,
        chronotype: formData.chronotype,
        disease: disease_id,
        disease_description: formData.disease_description,
        patient_status: "Admitted",
      },
    ]);

    if (patientError) return alert("Error adding patient: " + patientError.message);

    alert("Patient added successfully!");
    setFormData({
      patient_name: "",
      age: "",
      gender: "",
      room_number: "",
      sleep_duration: "",
      wake_time: "",
      chronotype: "",
      disease_id: "",
      disease_description: "",
      disease_search: "",
    });
    setShowRoomSuggestions(false);
  };

  return (
    <div className="flex justify-center items-start py-8 px-4 min-h-[60vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-md shadow-md w-full max-w-lg space-y-1.5"
      >
        <h2 className="text-left text-2xl font-bold">Patient's Information</h2>
        <p className="text-sm text-gray-500 text-left mt-1">
          Provide the necessary patient details, disease info, and sleep data.
        </p>

        <div className="space-y-1.5">
          <h3 className="font-medium mt-4 text-sm text-black">Patient Information</h3>
          <div className="grid grid-cols-2 gap-3">
            <input type="text" name="patient_name" placeholder="Name" value={formData.patient_name} onChange={handleChange} className="p-1.5 text-sm border rounded-md border-gray-300" />
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} min="1" className="p-1.5 text-sm border rounded-md border-gray-300" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select name="gender" value={formData.gender} onChange={handleChange} className={`p-1.5 rounded-md text-sm border border-gray-300 ${formData.gender ? "text-black" : "text-gray-500"}`}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <div className="relative">
              <input type="text" name="room_number" placeholder="Room Number" value={formData.room_number} onChange={handleChange} autoComplete="off" className="p-1.5 text-sm border rounded-md border-gray-300 w-full" />
              {showRoomSuggestions && formData.room_number && (
                <ul className="absolute z-10 bg-white border border-gray-300 mt-1 rounded-md w-full max-h-36 overflow-y-auto text-sm">
                  {roomOptions
                    .filter((room) =>
                      room.toLowerCase().includes(formData.room_number.toLowerCase()) &&
                      !occupiedRooms.includes(room)
                    )
                    .map((room, index) => (
                      <li
                        key={index}
                        onClick={() => handleRoomSelect(room)}
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

        <div className="space-y-1.5">
          <h3 className="font-medium mt-6 text-sm text-black">Sleep Information</h3>
          <div className="grid grid-cols-3 gap-3">
            <input type="text" name="sleep_duration" placeholder="Sleep Duration hh:mm" value={formData.sleep_duration} onChange={handleChange} className="p-1.5 text-sm border rounded-md border-gray-300" />
            <input type="text" name="wake_time" placeholder="Wake-up Time hh:mm" value={formData.wake_time} onChange={handleChange} className="p-1.5 text-sm border rounded-md border-gray-300" />
            <select name="chronotype" value={formData.chronotype} onChange={handleChange} className={`p-1.5 text-sm border rounded-md border-gray-300 ${formData.chronotype ? "text-black" : "text-gray-500"}`}>
              <option value="">Chronotype</option>
              <option value="Definitely a morning type">Definitely a morning type</option>
              <option value="Rather more a morning type than an evening type">Rather more a morning type than an evening type</option>
              <option value="Rather more an evening type than a morning type">Rather more an evening type than a morning type</option>
              <option value="Definitely an evening type">Definitely an evening type</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <h3 className="font-medium mt-6 text-sm text-black">Disease Information</h3>
          <div className="relative">
            <input
              type="text"
              name="disease_search"
              placeholder="Start typing Disease name..."
              value={formData.disease_search}
              onChange={(e) => setFormData({ ...formData, disease_id: "", disease_search: e.target.value })}
              autoComplete="off"
              className="p-1.5 text-sm border rounded-md border-gray-300 w-full"
            />
            {formData.disease_search && !formData.disease_id && (
              <ul className="absolute z-10 bg-white border border-gray-300 mt-1 rounded-md w-full max-h-36 overflow-y-auto text-sm">
                {diseaseOptions
                  .filter((d) => d.disease_name.toLowerCase().includes(formData.disease_search.toLowerCase()))
                  .map((d, index) => (
                    <li
                      key={index}
                      onClick={() => setFormData((prev) => ({ ...prev, disease_id: d.disease_id, disease_search: d.disease_name }))}
                      className="px-2 py-1 cursor-pointer hover:bg-gray-100"
                    >
                      {d.disease_name}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <textarea name="disease_description" placeholder="Disease Description" value={formData.disease_description} onChange={handleChange} className="w-full p-2 text-sm border rounded-md border-gray-300 resize-none" rows={2}></textarea>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="w-full mt-3 py-2 font-bold text-white rounded-md cursor-pointer transition-all bg-[#34A8DD] hover:bg-[#056c9c]">
            Add Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatientForm;
