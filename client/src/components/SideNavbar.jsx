import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../context/AuthContext";
import {
    faHouse,
    faMagnifyingGlass,
    faPlus,
    faHeart,
    faUser,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

const SideNavbar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    const items = [
        { label: "Home", icon: faHouse, path: "/" },
        { label: "Search", icon: faMagnifyingGlass, path: "/feed" },
        { label: "Create", icon: faPlus, path: "/create-post" },
        { label: "Notifications", icon: faHeart, path: "/notifications" },
    ];

    const username = user?.username || 'Guest';
    const initial = username.charAt(0).toUpperCase();

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

            {/* Profile and Logout at the Bottom */}
            <div className="mt-auto pt-5 border-t border-neutral-200">

                <button
                    onClick={() => navigate("/profile")}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition text-left"
                >
                    {user?.profileImage ? (
                        <img
                            src={user.profileImage}
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover shrink-0"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-(--primary)/10 text-(--primary) flex items-center justify-center font-bold shrink-0">
                            {initial}
                        </div>
                    )}

                    <div className="min-w-0 flex-1">

                        <p className="text-sm font-semibold text-neutral-900 truncate">
                            {username}
                        </p>
                    </div>
                </button>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 mt-2 rounded-xl text-red-600 hover:bg-red-50 transition"
                >
                    <FontAwesomeIcon
                        icon={faRightFromBracket}
                        className="w-5 text-lg"
                    />

                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </nav>
    );
};

export default SideNavbar;