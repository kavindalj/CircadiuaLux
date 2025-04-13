import React from 'react'

function PasswordChangeForm() {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
        <p className="text-left text-xl font-bold mb-3">Change Password</p>
        <form>
          <div className="mb-3 text-left">
            <label className="block font-semibold text-sm mb-1">Current Password</label>
            <input 
                type="password" 
                name="pass1" 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" 
            />
           </div>
           <div className="mb-3 text-left">
            <label className="block font-semibold text-sm mb-1">New Password</label>
            <input 
                type="password" 
                name="pass2" 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" 
            />
           </div>
           <div className="mb-3 text-left">
            <label className="block font-semibold text-sm mb-1">Confirm New Password</label>
            <input 
                type="password" 
                name="pass3" 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" 
            />
           </div>
           
           <div className='text-left'>
            <button 
                type="submit"
                className="w-[121px] mt-2 py-1 font-bold text-white text-sm rounded-md cursor-pointer transition-all bg-[#34A8DD] hover:bg-[#056c9c]"
            >
                Save Password
            </button>
            </div> 
        </form>

      </div>
    </div>
  )
}

export default PasswordChangeForm