import React, { useState, useEffect } from 'react';
import Card from './Card';
import { useOutletContext } from 'react-router-dom';
import Cookies from 'js-cookie'; // ✅ Import cookies
import { supabase } from "../supabaseClient";

function CaretakerCards() {
  const { profile } = useOutletContext();
  const [activePatientsCount, setActivePatientsCount] = useState(0);
  const [totalDevicesCount, setTotalDevicesCount] = useState(0);

  const email = Cookies.get("userEmail") || "Caretaker";
  const role = Cookies.get("userRole") || "caretaker";

  useEffect(() => {
    const fetchCounts = async () => {
      // Fetch active patients count
      const { data: patientsData, error: patientsError } = await supabase
        .from("patients")
        .select("id", { count: 'exact' })
        .eq("patient_status", "Admitted");

      if (patientsError) {
        console.error("Error fetching active patients count:", patientsError);
      } else {
        setActivePatientsCount(patientsData?.length || 0);
      }

      // Fetch total devices count
      const { data: devicesData, error: devicesError } = await supabase
        .from("devices")
        .select("device_id", { count: 'exact' });

      if (devicesError) {
        console.error("Error fetching devices count:", devicesError);
      } else {
        setTotalDevicesCount(devicesData?.length || 0);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="w-full px-6 pl-10">
      <h1 className="text-2xl font-semibold text-gray-700 mt-4 mb-6">
        Welcome, {profile?.first_name || email}!
      </h1>
      <div className="flex flex-wrap gap-10">
        <Card title="Active Patients" count={activePatientsCount.toString()} />
        <Card title="Connected Devices" count={totalDevicesCount.toString()} />
      </div>
    </div>
  );
}

export default CaretakerCards;
