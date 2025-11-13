import { createBrowserRouter } from "react-router";
import App from "@/App";
import Homepage from "@/pages/Landing/Homepage";
import Register from "@/pages/Auth/Register";
import Login from "@/pages/Auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        Component: Homepage,
        index: true
      }
    ]
  },
  {
    Component: Register,
    path: "/register"
  },
  {
    Component: Login,
    path: "/login"
  },
]);