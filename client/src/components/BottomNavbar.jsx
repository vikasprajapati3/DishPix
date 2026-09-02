import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faMagnifyingGlass,
    faPlus,
    faHeart,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

const BottomNavbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-6 py-16 md:hidden">
            <div className="flex items-center justify-between">

                <button
                    onClick={() => navigate("/")}
                    className="text-rose-500 text-xl"
                >
                    <FontAwesomeIcon icon={faHouse} />
                </button>

                <button
                    onClick={() => navigate("/search")}
                    className="text-rose-500 text-xl"
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>

                <button
                    onClick={() => navigate("/create")}
                    className="bg-rose-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl"
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>

                <button
                    onClick={() => navigate("/notifications")}
                    className="text-rose-500 text-xl"
                >
                    <FontAwesomeIcon icon={faHeart} />
                </button>

                <button
                    onClick={() => navigate("/profile")}
                    className="text-rose-500 text-xl"
                >
                    <FontAwesomeIcon icon={faUser} />
                </button>

            </div>
        </nav>
    );
};

export default BottomNavbar;
