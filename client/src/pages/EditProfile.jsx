
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import SideNavbar from "../components/SideNavbar";
import BottomNavbar from "../components/BottomNavbar";

export default function EditProfile() {
    const { user, login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState(user?.username || "");
    const [fullName, setFullName] = useState(user?.fullName || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!username.trim()) {
            return setError("Username is required.");
        }

        if (bio.length > 1000) {
            return setError("Bio cannot exceed 1000 characters.");
        }

        if (image) {
            if (!image.type.startsWith("image/")) {
                return setError("Please select a valid image.");
            }

            if (image.size > 5 * 1024 * 1024) {
                return setError("Image size must be under 5 MB.");
            }
        }

        setSaving(true);

        try {
            const token = localStorage.getItem("token");

            const { data } = await api.patch("/api/users/me",
                {
                    username: username.trim(),
                    fullName: fullName.trim(),
                    bio: bio.trim()
                }
            );

            let updatedUser = { ...user, ...data.user, token };

            if (image) {
                const formData = new FormData();
                formData.append("profileImage", image);

                const response = await api.patch("/api/users/me/profile-image", formData);

                updatedUser = { ...updatedUser, ...response.data.user };
            }

            login(updatedUser);
            navigate("/profile");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <SideNavbar />

            <main className="px-4 py-8 pb-24 md:ml-30 md:px-8">
                <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Edit Profile
                    </h1>
                    <p className="mt-1 mb-6 text-sm text-gray-500">
                        Update your profile information.
                    </p>

                    {error && (
                        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Profile Photo
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0] || null)}
                                className="w-full rounded-lg border border-gray-300 p-3 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2"
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Image format required. Maximum size: 5 MB.
                            </p>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Username
                            </label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                maxLength={30}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                placeholder="Enter username"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Full Name
                            </label>
                            <input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                maxLength={100}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Bio
                            </label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows={4}
                                maxLength={1000}
                                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                placeholder="Tell people about yourself"
                            />
                            <p className="mt-1 text-right text-xs text-gray-500">
                                {bio.length}/1000
                            </p>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => navigate("/profile")}
                                className="flex-1 rounded-full border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="flex-1 rounded-full bg-(--primary) px-5 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <BottomNavbar />
        </div>
    );
}
