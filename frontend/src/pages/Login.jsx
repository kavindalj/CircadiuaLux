import React, { useState } from "react";
import { RiUserLine, RiAdminLine } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const Login = () => {
  const [role, setRole] = useState("caretaker");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      alert("Login failed: " + error.message);
      return;
    }

    // Fetch user role from profiles table
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profile?.role !== role) {
      alert(`You are not registered as a ${role}`);
      return;
    }

    // Store cookies
    Cookies.set("userEmail", form.email, { expires: 7 }); // 7-day cookie
    Cookies.set("userRole", profile?.role, { expires: 7 }); // 7-day cookie
    Cookies.set("userSession", data.session?.access_token); // session cookie (no expiry)

    // Redirect based on role
    if (profile?.role === "admin") {
      navigate("/dashboardAdmin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
        <div className="flex border-b-2 border-gray-300 mb-4">
          <button
            className={`flex-1 py-2 font-bold cursor-pointer ${role === "admin"
              ? "text-black border-b-2 border-[#34A8DD]"
              : "text-gray-500"
              }`}
            onClick={() => setRole("admin")}
          >
            <RiAdminLine className="inline-block mr-2" /> Admin Login
          </button>
          <button
            className={`flex-1 py-2 font-bold cursor-pointer ${role === "caretaker"
              ? "text-black border-b-2 border-[#34A8DD]"
              : "text-gray-500"
              }`}
            onClick={() => setRole("caretaker")}
          >
            <RiUserLine className="inline-block mr-2" /> Caretaker Login
          </button>
        </div>

        <p className="text-left text-xl font-bold mb-1">Login</p>
        <p className="text-gray-600 text-xs mb-4 text-left">
          Enter your email and password below to login to your account
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-3 text-left">
            <label className="block font-semibold text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div className="mb-3 text-left relative">
            <label className="block font-semibold text-sm mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              onChange={handleChange}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm"
            />
            <span
              className="absolute right-3 top-[42px] transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>

          <div className="text-right text-xs cursor-pointer text-[#34A8DF] mb-3 text-[#34A8DD]">
            Forgot your password?
          </div>

          <button
            type="submit"
            className="w-full py-2 shadow-md font-bold text-white rounded-md cursor-pointer bg-gradient-to-r from-[#36AFDE] to-[#74DAF6] hover:brightness-90 focus:ring-blue-300 transition-all"
          >
            {role === "admin" ? "Login as an Admin" : "Login as a Caretaker"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
