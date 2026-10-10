
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NotFound() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
            <h1 className="text-6xl font-black text-(--primary)">
                404
            </h1>

            <h2 className="text-2xl font-bold text-(--text)">
                Page Not Found
            </h2>

            <p className="text-(--muted)">
                Sorry, the page you're looking for doesn't exist.
            </p>

            <Link
                to={user ? "/feed" : "/"}
                className="bg-(--primary) text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
                {user ? "Go to Feed" : "Go Home"}
            </Link>
        </div>
    );
}
