import React from 'react'

function AddDeviceForm() {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
        <p className="text-left text-xl font-bold mb-3">Add Device</p>
        <form>
          <div className="mb-3 text-left">
            <label className="block font-semibold text-sm mb-1">Device ID</label>
            <input 
                type="text" 
                name="name" 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" 
            />
           </div>
           <div className="mb-3 text-left">
            <label className="block font-semibold text-sm mb-1">Building No</label>
            <input 
                type="text" 
                name="bno" 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" 
            />
           </div>
           <div className="mb-3 text-left">
            <label className="block font-semibold text-sm mb-1">Floor No</label>
            <input 
                type="text" 
                name="fno" 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" 
            />
           </div>
           <div className="mb-3 text-left">
            <label className="block font-semibold text-sm mb-1">Room No</label>
            <input 
                type="text" 
                name="rno" 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" 
            />
           </div>
          <button 
            type="submit"
            className="w-full mt-5 py-2 font-bold text-white rounded-md cursor-pointer transition-all bg-[#34A8DD] hover:bg-[#056c9c]"
          >
            Add Device
          </button>
        </form>

      </div>
    </div>
  )
}

export default AddDeviceForm