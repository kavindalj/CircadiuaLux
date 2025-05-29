import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { profile } = useOutletContext();
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate(); // useNavigate for SPA routing

  // Format user ID
  const formatUserId = (id) => {
    if (!id && id !== 0) return "";
    return `USR${String(id).padStart(3, "0")}`;
  };

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleChangePassword = () => {
    if (profile?.role === "admin") {
      navigate("/dashboardAdmin/change-password");
    } else if (profile?.role === "caretaker") {
      navigate("/dashboard/change-password");
    }
  };

  return (
    <div className="w-full px-10 py-1">
      {/* Greeting & Time */}
      <div className="max-w-2xl mx-auto mt-6 mb-6 text-left">
        <h1 className="text-4xl font-semibold text-gray-700">
          Welcome, {profile?.first_name}!
        </h1>
        <p className="text-gray-400 mt-1 text-m">
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          &nbsp;
          {formatDate(currentTime)}
        </p>
      </div>

      {/* Profile Card */}
      <div className="max-w-2xl mx-auto bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 items-start mb-6">
          <div className="flex items-center gap-4">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Dummy Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <p className="text-lg font-semibold text-gray-700">
                {profile?.full_name}
              </p>
              <p className="text-sm text-gray-500">{profile?.role}</p>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="mt-[27px] shadow-md hover:brightness-90 mr-[37px] bg-gradient-to-r from-[#36AFDE] to-[#74DAF6] font-bold text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#056c9c]">
              Edit Profile Picture
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 text-left">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Name
              </label>
              <input
                placeholder={profile?.full_name}
                className="w-full max-w-[300px] h-[36px] bg-gray-100 rounded outline-none pl-1"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Gender
              </label>
              <input
                placeholder={profile?.gender}
                className="w-full max-w-[300px] h-[36px] bg-gray-100 rounded outline-none pl-1"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                placeholder={profile?.email}
                className="w-full max-w-[300px] h-[36px] bg-gray-100 rounded outline-none pl-1"
                readOnly
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                User ID
              </label>
              <input
                placeholder={formatUserId(profile?.show_id)}
                className="w-full max-w-[300px] h-[36px] bg-gray-100 rounded outline-none pl-1"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Phone
              </label>
              <input
                placeholder={profile?.phone}
                className="w-full max-w-[300px] h-[36px] bg-gray-100 rounded outline-none pl-1"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                NIC Number
              </label>
              <input
                placeholder={profile?.nic}
                className="w-full max-w-[300px] h-[36px] bg-gray-100 rounded outline-none pl-1"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="max-w-2xl mx-auto text-left mt-6">
        <button
          className="mt-2 shadow-md bg-gradient-to-r from-[#36AFDE] to-[#74DAF6] font-bold text-white px-4 py-2 rounded-md cursor-pointer hover:brightness-90 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={handleChangePassword}
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
