import type { ComponentType } from "react";

export type TRole = "USER" | "ADMIN"

export interface ISidebarItem {
    title: string;
    items: {
        title: string;
        url: string;
        component: ComponentType
    }[];
}
