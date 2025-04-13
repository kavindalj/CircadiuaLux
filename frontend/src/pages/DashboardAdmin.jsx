import React from 'react'
import Nav from "../components/Nav";
import Form from "../components/Form"
import PasswordChangeForm from "../components/PasswordChangeForm"
import AddDeviceForm from "../components/AddDeviceForm"

const DashboardAdmin = () => {
  return (
    <>
      <div className='flex flex-col h-screen'>
        <Nav />
        <div className='flex flex-1 overflow-hidden'>
          <p>Sidebar</p>
          <main className='flex-1 p-6 overflow-auto flex justify-center items-center'>
            <AddDeviceForm />
          </main>
        </div>
      </div>
    </>
  )
};
export default DashboardAdmin;
