import { userSidebarItems } from "@/routes/userSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
    switch (userRole) {
        // case "ADMIN":
        //     return [...adminSidebarItems]
        case "USER":
            return [...userSidebarItems]
        default:
            return [];
    }
}
