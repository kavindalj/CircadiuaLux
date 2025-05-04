import React from 'react';
import Nav from "../components/Nav";
import AddPatientForm from '@/components/AddPatientForm';
import CaretakerSidebar from '@/components/CaretakerSidebar';
import AllDevicesForm from '../components/AllDevicesForm';

const CaretakerDashboard = () => {
  return (
    <div className="h-screen overflow-hidden">
      {/* Top Navigation - Always on top */}
      <div className="fixed top-0 left-0 right-0 z-50 shadow-md bg-white">
        <Nav />
      </div>

      {/* Content below the nav */}
      <div className="flex h-full pt-16"> {/* Adjust pt-16 to match Nav height */}
        {/* Sidebar */}
        <div style={{ width: '200px' }}>
          <CaretakerSidebar />
        </div>
        {/* Main Content */}
        <main className='flex-1 p-6 overflow-auto flex justify-center items-center'>
          <AddPatientForm/>
        </main>
      </div>
    </div>
  );
};
export default CaretakerDashboard;
