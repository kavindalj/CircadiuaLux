import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const AddUserForm = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    role: "",
    nic: "",
    phone: "",
    gender: "", // added gender to state
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nic" && value.length > 12) return;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 10) return;
      setForm((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password" || name === "confirmPassword") {
      setPasswordMatch(
        name === "confirmPassword"
          ? value === form.password
          : form.confirmPassword === value
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { data: authUser, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (authError) {
        console.error("Auth Error:", authError.message);
        alert("Failed to create user: " + authError.message);
        return;
      }

      const userId = authUser?.user?.id;

      if (!userId) {
        alert("User creation failed: No user ID returned.");
        return;
      }

      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: userId,
          first_name: form.first_name,
          last_name: form.last_name,
          role: form.role,
          nic: form.nic,
          phone: form.phone,
          gender: form.gender, // added gender to insert
        },
      ]);

      if (profileError) {
        console.error("Profile Insert Error:", profileError.message);
        if (profileError.message.includes('foreign key constraint "profiles_id_fkey"')) {
          alert("Failed to add user. This email is already registered.");
        } else {
          alert("Failed to add user: " + profileError.message);
        }
        return;
      }

      alert("User added successfully!");
      setForm({
        first_name: "",
        last_name: "",
        role: "",
        nic: "",
        phone: "",
        gender: "", // reset gender too
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Unexpected error:", err.message);
      alert("Something went wrong: " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-start py-6 min-h-[40vh]">
      <div className="bg-white px-6 py-5 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-left text-2xl font-bold">Add User Information</h2>
        <p className="text-sm text-gray-500 text-left mb-3">
          Provide user details including name, role, and contact information.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block font-semibold text-sm mb-1" htmlFor="first_name">First Name</label>
              <input type="text" id="first_name" name="first_name" required value={form.first_name} onChange={handleChange} placeholder="Enter first name" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
            </div>
            <div>
              <label className="block font-semibold text-sm mb-1" htmlFor="last_name">Last Name</label>
              <input type="text" id="last_name" name="last_name" required value={form.last_name} onChange={handleChange} placeholder="Enter last name" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block font-semibold text-sm mb-1" htmlFor="role">Role</label>
              <select id="role" name="role" required value={form.role} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm cursor-pointer">
                <option value="" disabled>Select Role</option>
                <option value="admin">Admin</option>
                <option value="caretaker">Caretaker</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-sm mb-1" htmlFor="nic">NIC Number</label>
              <input type="text" id="nic" name="nic" required maxLength={12} value={form.nic} onChange={handleChange} placeholder="Enter NIC number" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
            </div>

            <div>
              <label className="block font-semibold text-sm mb-1" htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" required value={form.phone} onChange={handleChange} placeholder="Enter phone number" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
            </div>

            <div>
              <label htmlFor="gender" className="block font-semibold text-sm mb-1">Gender</label>
              <select id="gender" name="gender" required value={form.gender} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm cursor-pointer">
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="mb-2">
            <label className="block font-semibold text-sm mb-1" htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required value={form.email} onChange={handleChange} placeholder="Enter email address" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block font-semibold text-sm mb-1" htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required value={form.password} onChange={handleChange} placeholder="Enter password" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
            </div>
            <div>
              <label className="block font-semibold text-sm mb-1" htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" required value={form.confirmPassword} onChange={handleChange} placeholder="Re-type password" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
            </div>
          </div>

          <button
            className="cursor-pointer bg-gradient-to-r from-[#36AFDE] to-[#74DAF6] text-white hover:brightness-90 focus:outline-none font-bold focus:ring-4 focus:ring-blue-300 w-full mt-2 py-2 rounded-md transition-all"
            type="submit"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
