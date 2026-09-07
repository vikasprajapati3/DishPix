import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faMagnifyingGlass,
    faPlus,
    faHeart,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

const SideNavbar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const items = [
        { label: "Home", icon: faHouse, path: "/" },
        { label: "Search", icon: faMagnifyingGlass, path: "/feed" },
        { label: "Create", icon: faPlus, path: "/create-post" },
        { label: "Notifications", icon: faHeart, path: "/notifications" },
        { label: "Profile", icon: faUser, path: "/profile" },
    ];

    return (
        <nav className="hidden md:flex fixed inset-y-0 left-0 w-60 bg-white border-r border-neutral-200 z-50 flex-col px-5 py-7">
            <button onClick={() => navigate("/")} className="text-left px-3 mb-10 select-none">
                <h1 className="text-2xl font-black tracking-wider">
                    <span className="text-neutral-900">Dish</span>
                    <span className="text-(--primary)">Pix</span>
                </h1>
            </button>

            <div className="flex flex-col gap-2">
                {items.map(({ label, icon, path }) => {
                    const active = pathname === path;
                    return (
                        <button
                            key={path}
                            onClick={() => navigate(path)}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition duration-200 ${active
                                ? "bg-(--primary)/10 text-(--primary) font-semibold"
                                : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                                }`}
                        >
                            <FontAwesomeIcon
                                icon={icon}
                                className={`w-5 text-lg ${active ? "text-(--primary)" : "text-neutral-600"}`}
                            />
                            <span className="text-sm">{label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default SideNavbar;