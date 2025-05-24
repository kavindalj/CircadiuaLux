import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function Modal({ patientId, currentStatus, onClose, onStatusUpdated }) {
    const [newStatus, setNewStatus] = useState(currentStatus);

    const handleUpdate = async () => {

        const formattedStatus = newStatus.charAt(0).toUpperCase() + newStatus.slice(1).toLowerCase();

        const { error } = await supabase
            .from('patients')
            .update({ patient_status: formattedStatus })
            .eq('id', patientId)

        if (error) {
            alert("Failed to update status");
        } else {
            onStatusUpdated(newStatus);
            onClose();
        }
    }

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-white/60 backdrop-blur"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xs text-center relative transform transition-all duration-300 ease-out scale-95 opacity-0 animate-in"
                onClick={e => e.stopPropagation()}
                style={{ animation: 'modalIn 0.3s ease-out forwards' }}
            >
                <h2 className="text-xl font-bold mb-2 text-gray-800">Update Status</h2>
                <p className="text-gray-500 mb-4 text-sm">
                    Change the status of this patient below.
                </p>
                <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#34A8DD] text-gray-700 bg-gray-50 text-sm"
                >
                    <option value="Admitted">Admitted</option>
                    <option value="Discharged">Discharged</option>
                </select>
                <div className="flex justify-center gap-3">
                    <button
                        className="bg-white cursor-pointer border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-1.5 w-24 rounded-lg transition text-sm"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-[#34A8DD] cursor-pointer hover:bg-[#2596be] text-white font-semibold py-1.5 w-24 rounded-lg shadow-md transition text-sm"
                        onClick={handleUpdate}
                    >
                        Save
                    </button>
                </div>
            </div>

            <style jsx>{`
        @keyframes modalIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
}

export default Modal;
