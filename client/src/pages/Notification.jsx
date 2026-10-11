import React from "react";
import BottomNavbar from "../components/BottomNavbar";
import SideNavbar from "../components/SideNavbar";

export default function Notification() {
    return (
        <div>
            <SideNavbar />
            <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
                <h3 className="text-(--muted) text-xl sm:text-2xl font-bold">
                    This page is under maintenance
                </h3>
            </div>


            <BottomNavbar />
        </div>


    )
}