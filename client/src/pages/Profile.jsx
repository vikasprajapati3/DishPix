
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNavbar from "../components/SideNavbar";
import BottomNavbar from "../components/BottomNavbar";

export default function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setUser(data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-neutral-500">Loading profile...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-neutral-500">Unable to load profile.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans pb-20">

            {/* Desktop Sidebar */}
            <SideNavbar />

            {/* Main Content */}
            <div className="md:ml-60">

                <main className="max-w-4xl mx-auto px-5 sm:px-8 py-8">

                    {/* Profile Header */}
                    <section className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">

                        {/* Avatar */}
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-(--primary)/10 border-2 border-(--primary) flex items-center justify-center shrink-0">
                            <span className="text-4xl sm:text-5xl font-black text-(--primary) uppercase">
                                {user.username.charAt(0)}
                            </span>
                        </div>

                        {/* Profile Details */}
                        <div className="flex-1 w-full">

                            {/* Username + Edit */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                                <div>
                                    <h1 className="text-2xl font-black text-neutral-900">
                                        @{user.username}
                                    </h1>

                                    <p className="text-sm text-neutral-500">
                                        {user.email}
                                    </p>
                                </div>

                                <button
                                    onClick={() => navigate("/edit-profile")}
                                    className="sm:ml-2 w-fit bg-neutral-100 hover:bg-neutral-200 px-5 py-2 rounded-full text-sm font-semibold text-neutral-800 transition"
                                >
                                    Edit Profile
                                </button>

                            </div>

                        </div>
                    </section>

                </main>

            </div>

            {/* Mobile Bottom Navigation */}
            <BottomNavbar />

        </div>
    );
}
