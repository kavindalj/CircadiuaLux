import React, { useState, useEffect } from 'react'
import Card from './Card'
import { useOutletContext } from 'react-router-dom';
import Cookies from "js-cookie";
import { supabase } from "../supabaseClient";

function AdminCards() {
  const { profile } = useOutletContext();
  const [onlinePatientsCount, setOnlinePatientsCount] = useState(0);
  const [activeCaretakersCount, setActiveCaretakersCount] = useState(0);
  const [totalDevicesCount, setTotalDevicesCount] = useState(0);
  const [pendingIssuesCount, setPendingIssuesCount] = useState(0);

  const email = Cookies.get("userEmail") || "Admin";
  const role = Cookies.get("userRole") || "admin";

  useEffect(() => {
    const fetchCounts = async () => {
      // Fetch online patients count
      const { data: patientsData, error: patientsError } = await supabase
        .from("patients")
        .select("id", { count: 'exact' })
        .eq("patient_status", "Admitted");

      if (patientsError) {
        console.error("Error fetching online patients count:", patientsError);
      } else {
        setOnlinePatientsCount(patientsData?.length || 0);
      }

      // Fetch active caretakers count
      const { data: caretakersData, error: caretakersError } = await supabase
        .from("user_profiles")
        .select("id", { count: 'exact' })
        .eq("role", "caretaker");

      if (caretakersError) {
        console.error("Error fetching caretakers count:", caretakersError);
      } else {
        setActiveCaretakersCount(caretakersData?.length || 0);
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

      // Fetch total issues count
      const { data: issuesData, error: issuesError } = await supabase
        .from("issues")
        .select("id", { count: 'exact' });

      if (issuesError) {
        console.error("Error fetching issues count:", issuesError);
      } else {
        setPendingIssuesCount(issuesData?.length || 0);
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
        <Card title="Active Caretakers" count={activeCaretakersCount.toString()} />
        <Card title="Connected Devices" count={totalDevicesCount.toString()} />
        <Card title="Pending Issues" count={pendingIssuesCount.toString()} />
      </div>
    </div>
  )
}

export default AdminCards;