import { createBrowserRouter } from "react-router";
import App from "@/App";
import Homepage from "@/pages/Landing/Homepage";
import Register from "@/pages/Auth/Register";
import Login from "@/pages/Auth/Login";
import AllJobs from "@/pages/JobsOpportunities/AllJobs";
import JobDetails from "@/pages/JobsOpportunities/JobDetails";
import AllResources from "@/pages/learningResources/AllResource";

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