import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function Modal({patientId, currentStatus, onClose, onStatusUpdated}) {
  const [newStatus, setNewStatus] = useState(currentStatus);

  const handleUpdate = async () => {

    const formattedStatus = newStatus.charAt(0).toUpperCase() + newStatus.slice(1).toLowerCase();

    const {error} = await supabase
        .from('patients')
        .update({patient_status: formattedStatus})
        .eq('id',patientId)

    if (error) {
        alert ("Failed to update status");
    } else {
        onStatusUpdated(newStatus);
        onClose();
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-lg p-6 w-[300px]">
        <h2 className="text-lg font-bold mb-4">Update Patient Status</h2>

        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        >
          <option value="Admitted">Admitted</option>
          <option value="Discharged">Discharged</option>
        </select>
        <div className="flex justify-end gap-3">
          <button className="px-4 py-1 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
          <button className="px-4 py-1 bg-[#34A8DD] text-white rounded hover:bg-[#1c85b6]" onClick={handleUpdate}>Save</button>
        </div>

      </div>
    </div>
  );
}

export default Modal;
