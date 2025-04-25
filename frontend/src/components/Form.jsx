import React from "react";

const Form = () => {
    
  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
        <p className="text-left text-xl font-bold mb-1">Add Caretaker</p>
        <form>
          <div className="mb-3 text-left">
            <label className="block font-semibold text-sm mb-1">Name</label>
            <input 
                type="text" 
                name="name" 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" 
            />
           </div>
           <div className="mb-3 text-left">
            <label className="block font-semibold text-sm mb-1">NIC Number</label>
            <input 
                type="text" 
                name="nic" 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" 
            />
           </div>
           <div className="mb-3 text-left">
            <label className="block font-semibold text-sm mb-1">Username</label>
            <input 
                type="text" 
                name="username" 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" 
            />
           </div>
           <div className="mb-3 text-left">
            <label className="block font-semibold text-sm mb-1">Email</label>
            <input 
                type="email" 
                name="username" 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" 
            />
           </div>
          <button 
            type="submit"
            className="w-full mt-5 py-2 font-bold text-white rounded-md cursor-pointer transition-all bg-[#34A8DD] hover:bg-[#056c9c]"
          >
            Add Caretaker
          </button>
        </form>

      </div>
    </div>
  );
};

export default Form