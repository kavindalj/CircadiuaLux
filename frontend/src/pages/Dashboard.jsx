import React from 'react'
import Nav from "../components/Nav";
import PatientDetailsForm from '@/components/PatientDetailsForm';

const Dashboard = () => {
  return (
    <>
      <div>
        <Nav />
      </div>
      <div>
        <PatientDetailsForm/>
      </div>
    </>
  )
}

export default Dashboard
