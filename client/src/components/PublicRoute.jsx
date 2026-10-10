
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    // Already logged in? Go to the feed.
    if (user) {
        return <Navigate to="/feed" replace />;
    }

    // Otherwise, show Login or Register.
    return <Outlet />;
}
