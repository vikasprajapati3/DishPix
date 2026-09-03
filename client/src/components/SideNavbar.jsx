import { useNavigate } from "react-router-dom";
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

    return (
        <nav className="hidden md:flex fixed top-0 left-0 bottom-0 w-60 bg-white border-r border-gray-200 p-5">
            <div className="flex flex-col gap-6 w-full">

                <button onClick={() => navigate("/")}>
                    <FontAwesomeIcon icon={faHouse} />
                    <span className="ml-3">Home</span>
                </button>

                <button onClick={() => navigate("/search")}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <span className="ml-3">Search</span>
                </button>

                <button onClick={() => navigate("/create")}>
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="ml-3">Create</span>
                </button>

                <button onClick={() => navigate("/notifications")}>
                    <FontAwesomeIcon icon={faHeart} />
                    <span className="ml-3">Notifications</span>
                </button>

                <button onClick={() => navigate("/profile")}>
                    <FontAwesomeIcon icon={faUser} />
                    <span className="ml-3">Profile</span>
                </button>

            </div>
        </nav>
    );
};

export default SideNavbar;
