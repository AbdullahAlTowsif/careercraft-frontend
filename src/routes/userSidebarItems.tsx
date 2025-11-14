import UpdateProfile from "@/pages/User/UpdateProfile";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Update Profile",
        url: "/dashboard/update-profile",
        component: UpdateProfile,
      },
    ],
  },
];