import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faMagnifyingGlass,
    faPlus,
    faHeart,
    faUser
} from "@fortawesome/free-solid-svg-icons";

const BottomNavbar = () => {
    return (
        <div className="fixed bottom-0 w-full flex justify-around p-4">
            <FontAwesomeIcon icon={faHouse} />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <FontAwesomeIcon icon={faPlus} />
            <FontAwesomeIcon icon={faHeart} />
            <FontAwesomeIcon icon={faUser} />
        </div>
    );
}
export default BottomNavbar;