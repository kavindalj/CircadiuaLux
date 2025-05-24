import React from 'react';
import Nav from "../components/Nav";
import CaretakerSidebar from '@/components/CaretakerSidebar';
import { Outlet } from 'react-router-dom';
import useFetchProfile from '../hooks/useFetchProfile';
import Cookies from 'js-cookie'; // ✅ Import cookies

const CaretakerDashboard = () => {
  const profile = useFetchProfile();

  // ✅ Fallback from cookies if profile not ready
  const cookieProfile = {
    email: Cookies.get("userEmail"),
    role: Cookies.get("userRole"),
  };

  return (
    <div className="h-screen overflow-hidden">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 shadow-md bg-white">
        <Nav />
      </div>

      {/* Content */}
      <div className="flex h-full pt-16">
        <div style={{ width: '200px' }}>
          <CaretakerSidebar />
        </div>
        <main className='flex-1 p-6 overflow-auto flex justify-center'>
          <Outlet context={{ profile: profile || cookieProfile }} /> {/* ✅ Provide fallback */}
        </main>
      </div>
    </div>
  );
};

export default CaretakerDashboard;
