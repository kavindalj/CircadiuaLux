import React from 'react';
import Card from './Card';
import { useOutletContext } from 'react-router-dom';
import Cookies from 'js-cookie'; // ✅ Import cookies

function CaretakerCards() {
  const { profile } = useOutletContext();

  const email = Cookies.get("userEmail") || "Caretaker";
  const role = Cookies.get("userRole") || "caretaker";

  return (
    <div className="w-full px-6 pl-10">
      <h1 className="text-2xl font-semibold text-gray-700 mt-4 mb-6">
        Welcome, {profile?.first_name || email}!
      </h1>
      <div className="flex flex-wrap gap-10">
        <Card title="Active Patients" count="10" />
        <Card title="Connected Devices" count="42" />
      </div>
    </div>
  );
}

export default CaretakerCards;
