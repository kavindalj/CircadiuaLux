import React, { useState } from "react";

const AddUserForm = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    role: "",
    nic: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Submit logic here
    alert("User added!");
  };

  return (
    <div className="flex justify-center items-start py-6 min-h-[40vh]">
      <div className="bg-white px-6 py-5 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-left text-2xl font-bold">Add User Information</h2>
        <p className="text-sm text-gray-500 text-left mb-3">
          Provide user details including name, role, and contact information.
        </p>
        <form onSubmit={handleSubmit}>
          {/* First Name | Last Name */}
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block font-semibold text-sm mb-1" htmlFor="first_name">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                required
                value={form.first_name}
                onChange={handleChange}
                placeholder="Enter first name"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-sm mb-1" htmlFor="last_name">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                required
                value={form.last_name}
                onChange={handleChange}
                placeholder="Enter last name"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>

          {/* Role | NIC Number */}
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block font-semibold text-sm mb-1" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                name="role"
                required
                value={form.role}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm cursor-pointer"
              >
                <option value="" disabled className="text-gray-400">
                  Select Role
                </option>
                <option value="admin">Admin</option>
                <option value="caretaker">Caretaker</option>
              </select>

            </div>
            <div>
              <label className="block font-semibold text-sm mb-1" htmlFor="nic">
                NIC Number
              </label>
              <input
                type="text"
                id="nic"
                name="nic"
                required
                value={form.nic}
                onChange={handleChange}
                placeholder="Enter NIC number"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="block font-semibold text-sm mb-1" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="Enter phone number"
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          {/* Email */}
          <div className="mb-2">
            <label className="block font-semibold text-sm mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-2">

            <div>
              <label className="block font-semibold text-sm mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-sm mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-type password"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 mb-0.5 py-2 font-bold text-white rounded-md cursor-pointer transition-all bg-[#34A8DD] hover:bg-[#056c9c]"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
