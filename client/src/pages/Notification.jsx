import React from "react";
import BottomNavbar from "../components/BottomNavbar";
import SideNavbar from "../components/SideNavbar";

export default function Notification() {
    return (
        <div>
            <SideNavbar />
            <div className="ml-70">
                <h3 className="text-(--muted) text-2xl font-bold">
                    This page is under maintenance
                </h3>
            </div>


            <BottomNavbar />
        </div>


    )
}