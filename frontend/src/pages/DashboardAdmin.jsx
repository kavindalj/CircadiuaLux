import React from 'react'
import Nav from "../components/Nav";
import AdminSidebar from '@/components/AdminSidebar';
import { Outlet } from 'react-router-dom';

const DashboardAdmin = () => {
  return (
    <div className="h-screen overflow-hidden">
      {/* Top Navigation - Always on top */}
      <div className="fixed top-0 left-0 right-0 z-50 shadow-md bg-white">
        <Nav />
      </div>

      {/* Content below the nav */}
      <div className="flex h-full pt-16">
        {/* Sidebar */}
        <div style={{ width: '200px' }}>
          <AdminSidebar />
        </div>

        <main className='flex-1 p-6 overflow-auto flex justify-center '>
          <Outlet />
        </main>
      </div>
    </div>
  )
};

export default DashboardAdmin;
