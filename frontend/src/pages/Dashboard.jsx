import React from 'react';
import Nav from "../components/Nav";
import PatientDetailsForm from '@/components/PatientDetailsForm';
import AllPatientsForm from '@/components/AllPatientsForm';

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation */}
      <div>
        <Nav />
      </div>

      {/* Content area with sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-300 bg-gray-100 p-4">
          <h2 className="text-lg font-medium mb-4">Sidebar</h2>
          {/* Add sidebar content here if needed */}
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 overflow-auto">
          <AllPatientsForm/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
