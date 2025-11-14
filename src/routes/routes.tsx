import { createBrowserRouter, Navigate } from "react-router";
import App from "@/App";
import Homepage from "@/pages/Landing/Homepage";
import Register from "@/pages/Auth/Register";
import Login from "@/pages/Auth/Login";
import AllJobs from "@/pages/JobsOpportunities/AllJobs";
import JobDetails from "@/pages/JobsOpportunities/JobDetails";
import AllResources from "@/pages/learningResources/AllResource";
import { withAuth } from "@/utils/withAuth";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import type { TRole } from "@/types";
import { generateSidebarRoutes } from "@/utils/generateSidebarRoutes";
import { userSidebarItems } from "./userSidebarItems";

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
    Component: withAuth(DashboardLayout, "USER" as TRole),
    path: "/dashboard",
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/update-profile" />,
      },
      ...generateSidebarRoutes(userSidebarItems),
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
  {
    Component: AllJobs,
    path: "/jobs"
  },
  {
    Component: JobDetails,
    path: "/jobs/:jobId"
  },
  {
    Component: AllResources,
    path: "/resources"
  }
]);