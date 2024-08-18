import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Profile from "./components/Profile";
import Layout from "./components/Layout";
import AddUser from "./components/AddUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/profile/:username", element: <Profile /> },
      {path: "/adduser",element:<AddUser/>}
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <StrictMode>
      <Layout />
    </StrictMode>
  </RouterProvider>
);
