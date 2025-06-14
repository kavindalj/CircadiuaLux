import React from 'react'
import Card from './Card'
import { useOutletContext } from 'react-router-dom';
import Cookies from "js-cookie";


function AdminCards() {
  const { profile } = useOutletContext();
  const email = Cookies.get("userEmail") || "Admin";
const role = Cookies.get("userRole") || "admin";

  return (
    <div className="w-full px-6 pl-10">
      <h1 className="text-2xl font-semibold text-gray-700 mt-4 mb-6">
        Welcome, {profile?.first_name || email}!
      </h1>
      <div className="flex flex-wrap gap-10">
        <Card title="Active Caretakers" count="18"/>
        <Card title="Connected Devices" count="42"/>
        <Card title="Pending Issues" count="03"/>
      </div>
    </div>
    
  )
}

export default AdminCards;