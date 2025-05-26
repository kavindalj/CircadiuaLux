import React, { useState, useEffect } from 'react';
import Card from './Card';
import { useOutletContext } from 'react-router-dom';
import Cookies from 'js-cookie'; // ✅ Import cookies
import { supabase } from "../supabaseClient";

function CaretakerCards() {
  const { profile } = useOutletContext();
  const [activePatientsCount, setActivePatientsCount] = useState(0);

  const email = Cookies.get("userEmail") || "Caretaker";
  const role = Cookies.get("userRole") || "caretaker";

  useEffect(() => {
    const fetchActivePatientsCount = async () => {
      const { data, error } = await supabase
        .from("patients")
        .select("id", { count: 'exact' })
        .eq("patient_status", "Admitted");

      if (error) {
        console.error("Error fetching active patients count:", error);
        return;
      }

      setActivePatientsCount(data?.length || 0);
    };

    fetchActivePatientsCount();
  }, []);

  return (
    <div className="w-full px-6 pl-10">
      <h1 className="text-2xl font-semibold text-gray-700 mt-4 mb-6">
        Welcome, {profile?.first_name || email}!
      </h1>
      <div className="flex flex-wrap gap-10">
        <Card title="Active Patients" count={activePatientsCount.toString()} />
        <Card title="Connected Devices" count="42" />
      </div>
    </div>
  );
}

export default CaretakerCards;
