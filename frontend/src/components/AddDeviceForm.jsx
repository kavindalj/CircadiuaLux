import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const AddDeviceForm = () => {
  const [formData, setFormData] = useState({
    device_id: "",
    building_no: "",
    floor_no: "",
    room_no: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const { device_id, building_no, floor_no, room_no } = formData;

  if (!device_id.trim() || !building_no.trim() || !floor_no.trim() || !room_no.trim()) {
    alert("Please fill all fields!");
    return;
  }

  // Allow 1 or 2 digit numbers for building_no and floor_no
  const isOneOrTwoDigitNumber = (value) => /^\d{1,2}$/.test(value);

  if (!isOneOrTwoDigitNumber(building_no)) {
    alert("Add a valid building number");
    return;
  }

  if (!isOneOrTwoDigitNumber(floor_no)) {
    alert("Add a valid floor number");
    return;
  }

  // Check for duplicate room number
  const { data: existingRoom, error: fetchError } = await supabase
    .from("devices")
    .select("room_no")
    .eq("room_no", room_no.trim());

  if (fetchError) {
    alert("Error checking existing room: " + fetchError.message);
    return;
  }

  if (existingRoom.length > 0) {
    alert("Room number already exists. Please use a different room number.");
    return;
  }

  // Proceed to insert
  const { error } = await supabase.from("devices").insert([
    {
      device_id: device_id.trim(),
      building_no: building_no.trim(),
      floor_no: floor_no.trim(),
      room_no: room_no.trim(),
      active_status: "Online",
    },
  ]);

  if (error) {
    alert("Error adding device: " + error.message);
  } else {
    alert("Device added successfully!");
    setFormData({
      device_id: "",
      building_no: "",
      floor_no: "",
      room_no: "",
    });
  }
};

  return (
    <div className="flex justify-center items-start py-8 px-4 min-h-[60vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-left text-2xl font-bold">Add Device</h2>
        <p className="text-sm text-gray-500 text-left mb-4">
          Provide device details including building, floor, and room number.
        </p>

        <div>
          <label className="block mb-1 font-semibold text-sm">Device ID</label>
          <input
            type="text"
            name="device_id"
            value={formData.device_id}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-sm">Building Number</label>
          <input
            type="text"
            name="building_no"
            value={formData.building_no}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-sm">Floor Number</label>
          <input
            type="text"
            name="floor_no"
            value={formData.floor_no}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-sm">Room Number</label>
          <input
            type="text"
            name="room_no"
            value={formData.room_no}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 py-2 font-bold text-white rounded-md cursor-pointer transition-all bg-[#34A8DD] hover:bg-[#056c9c]"
        >
          Add Device
        </button>
      </form>
    </div>
  );
};

export default AddDeviceForm;
