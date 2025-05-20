import React from "react"
import { Login, Dashboard, DashboardAdmin } from "./pages"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AdminCards from "./components/AdminCards";
import PasswordChangeForm from "./components/PasswordChangeForm";
import AllUsersTable from "./components/AllUsersTable";
import AllDevicesTable from "./components/AllDevicesTable";
import AddDeviceForm from "./components/AddDeviceForm";
import AddUserForm from "./components/AddUserForm";
import PatientDeviceDetails from "./components/PatientDeviceDetails";
import AllPatientsTable from "./components/AllPatientsTable";
import CaretakerCards from "./components/CaretakerCards";
import AddPatientForm from "./components/AddPatientForm";
import Modal from "./components/Modal";
import UserProfile from "./components/UserProfile";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          index: true,
          element: <CaretakerCards />,
        },
        {
          path: "patientDetails",
          element: <AllPatientsTable/>,
        },
        {
          path: "addPatient",
          element: <AddPatientForm/>,
        },
        {
          path: "seeMorePatient",
          element: <PatientDeviceDetails />,
        },
        {
          path: "settings",
          element: <UserProfile />,
        },
        {
        path: "change-password",   // ✅ Add this line
        element: <PasswordChangeForm />,
        },
      ]
    },
    {
      path: "/dashboardAdmin",
      element: <DashboardAdmin />,
      children: [
        {
          index: true,
          element: <AdminCards />,
        },
        {
          path: "manageUsers",
          element: <AllUsersTable />,
        },
        {
          path: "addUser",
          element: <AddUserForm />,
        },
        {
          path: "manageDevices",
          element: <AllDevicesTable />,
        },
        {
          path: "seeMoreDevice",
          element: <PatientDeviceDetails />,
        },
        {
          path: "addDevice",
          element: <AddDeviceForm />,
        },
        {
          path: "settings",
          element: <UserProfile />, 
        },
         {
      path: "change-password", // ✅ This is correct
      element: <PasswordChangeForm />,
    },
      ],
    },
    {
      path: "/Modal",
      element: <Modal />,
    },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
