import React from "react"
import { Login, Dashboard, DashboardAdmin } from "./pages"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AdminCards from "./components/AdminCards";
import Form from "./components/Form";
import AddDeviceForm from "./components/AddDeviceForm";
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
    children: [
      {
        index: true,
        element: <AdminCards />,
      },
      {
        path: "manageCaretakers",
        element: <Form />,
      },
      {
        path: "manageDevices",
        element: <AddDeviceForm />,
      },
      {
        path: "settings",
        element: <PasswordChangeForm />, 
      }
    ],

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
