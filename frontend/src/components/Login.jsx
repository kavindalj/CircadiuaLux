import React, { useState } from "react";
import { RiUserLine, RiAdminLine } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


const Login = () => {
    const [role, setRole] = useState("admin");
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
        
        <div className="flex border-b-2 border-gray-300 mb-4">
          <button
            className={`flex-1 py-2 font-bold cursor-pointer  ${role === "admin" ? "text-black border-b-2 border-[#34A8DD]" : "text-gray-500"}`} 
            onClick={() => setRole("admin")}>
            <RiAdminLine className="inline-block mr-2" /> Admin Login
          </button>
          <button
            className={`flex-1 py-2 font-bold cursor-pointer ${role === "caretaker" ? "text-black border-b-2 border-[#1CAC78]" : "text-gray-500"}`}
            onClick={() => setRole("caretaker")}>
            <RiUserLine className="inline-block mr-2" /> Caretaker Login
          </button>
        </div>

        <p className="text-left text-xl font-bold mb-1">Login</p>
        <p className="text-gray-600 text-xs mb-4 text-left">
          Enter your Username and Password below to login to your account
        </p>

        <form>
          <div className="mb-3 text-left">
            <label className="block font-semibold text-sm mb-1">Username</label>
            <input 
                type="text" 
                name="username" 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" 
            />
          </div>
          <div className="mb-3 text-left relative">
            <label className="block font-semibold text-sm mb-1">Password</label>
            <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm"
            />
            <span className="absolute right-3 top-[42px] transform -translate-y-1/2 cursor-pointer text-gray-500" onClick={togglePasswordVisibility}>
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>

          <div className={`text-right text-xs cursor-pointer mb-3 ${role === "admin" ? "text-[#34A8DD]" : "text-[#1CAC78]"}`}>
                Forgot your password?
          </div>

          <button 
            type="submit"
            className={`w-full py-2 font-bold text-white rounded-md cursor-pointer transition-all ${role === "admin" ? "bg-[#34A8DD] hover:bg-[#056c9c]" : "bg-[#1CAC78] hover:bg-[#099662]"}`}
          >
            {role === "admin" ? "Admin Login" : "Caretaker Login"}
          </button>
        </form>

        <p className="text-sm mt-4">
          Don't have an account? <span className="font-bold cursor-pointer">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login