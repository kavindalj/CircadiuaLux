import React from "react"
import { Login, Dashboard, DashboardAdmin } from "./pages"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Settings from "./components/Settings";
import AdminCards from "./components/AdminCards";
import Form from "./components/Form";
import AddDeviceForm from "./components/AddDeviceForm";

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
        path: "dashboardCards",
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
        element: <Settings />, 
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
