import { createBrowserRouter } from "react-router";
import App from "@/App";
import Homepage from "@/pages/Landing/Homepage";

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
]);