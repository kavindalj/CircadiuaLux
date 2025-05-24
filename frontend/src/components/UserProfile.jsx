import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const UserProfile = () => {
  const { profile } = useOutletContext();
  const [currentTime, setCurrentTime] = useState(new Date());
  //To format the show_id as USRXXXX
    const formatUserId = (id) => {
        if (!id && id !== 0) return '';
        return `USR${String(id).padStart(3, '0')}`;
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

  return (
    <div className="w-full px-10 py-4">
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
        {/* Avatar + Role + Button */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-start mb-6">
          {/* Left side: avatar and info */}
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

          {/* Right side: button aligned to right column */}
          <div className="flex justify-end">
            <button className="mt-[27px] mr-[37px] bg-[#34A8DD] font-bold text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#056c9c]">
              Edit Profile Picture
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 text-left">
          {/* Left Column */}
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

          {/* Right Column */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                User ID
              </label>
              <input
                placeholder = {formatUserId(profile?.show_id)}
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
          className="bg-[#34A8DD] font-bold text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#056c9c]"
          onClick={() => {
            if (profile?.role === "admin") {
              window.location.href = "/dashboardAdmin/change-password";
            } else if (profile?.role === "caretaker") {
              window.location.href = "/dashboard/change-password";
            }
          }}
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
