import React from "react"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import { Login, Dashboard, DashboardAdmin } from "./pages";
import AllPatientsForm from "./components/AllPatientsForm";
import AddDeviceForm from "./components/AddDeviceForm";
import PatientDetailsForm from "./components/PatientDetailsForm";
import PasswordChangeForm from "./components/PasswordChangeForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboardAdmin",
    element: <DashboardAdmin />,
  },
  
  {
    path: "/all-patients-form",
    element: <AllPatientsForm />,
  },
  {
    path: "/add-device-form",
    element: <AddDeviceForm />,
  },
  {
    path: "/patient-details-form",
    element: <PatientDetailsForm />,
  },
  {
    path: "/password-change-form",
    element: <PasswordChangeForm />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
