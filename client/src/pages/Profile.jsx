import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNavbar from "../components/SideNavbar";
import BottomNavbar from "../components/BottomNavbar";
import api from "../api/api";

export default function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [postsLoading, setPostsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get("/api/users/me");
                setUser(data);
            } catch (err) {
                setError("Unable to load profile.");
            } finally {
                setLoading(false);
            }

            try {
                const { data } = await api.get("/api/posts/my-posts");
                setPosts(data.posts || []);
            } catch (err) {
                console.error("Failed to load posts:", err);
            } finally {
                setPostsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
                    <p className="text-sm font-medium text-slate-500">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center shadow-xs">
                    <p className="text-sm font-semibold text-rose-700">
                        {error || "Unable to load profile."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 pb-28 font-sans antialiased">
            <SideNavbar />

            <main className="px-4 py-10 md:ml-60 sm:px-8">
                <div className="mx-auto max-w-4xl space-y-8">
                    {/* Profile Header */}
                    <section className="bg-white px-6 py-8 sm:px-10 sm:py-10 border-b border-slate-200/80">
                        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10">
                            <div className="relative shrink-0">
                                <img
                                    src={user.profileImage}
                                    alt={`${user.username}'s profile`}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src =
                                            "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg";
                                    }}
                                    className="h-24 w-24 rounded-full border border-slate-200 object-cover sm:h-36 sm:w-36"
                                />
                            </div>

                            <div className="w-full flex-1 text-center sm:text-left">
                                <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-between">
                                    <div className="space-y-1">
                                        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
                                            @{user.username}
                                        </h1>
                                        <p className="text-sm text-slate-500 font-medium">
                                            {user.fullName || ""}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => navigate("/edit-profile")}
                                        className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-98"
                                    >
                                        Edit profile
                                    </button>
                                </div>

                                {/* Instagram-style Stats Structure */}
                                <div className="mt-6 flex justify-center gap-6 sm:gap-10 text-sm sm:justify-start">
                                    <div>
                                        <span className="font-semibold text-slate-900">
                                            {posts.length}
                                        </span>{" "}
                                        <span className="text-slate-600">posts</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-slate-900">
                                            {user.followersCount || 0}
                                        </span>{" "}
                                        <span className="text-slate-600">followers</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-slate-900">
                                            {user.followingCount || 0}
                                        </span>{" "}
                                        <span className="text-slate-600">following</span>
                                    </div>
                                </div>

                                {user.bio && (
                                    <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-normal text-slate-800">
                                        {user.bio}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Posts Section */}
                    <section className="space-y-6 px-2 sm:px-0">
                        <div className="flex items-center justify-center border-t border-slate-200/80 pt-4">
                            <h2 className="text-s font-bold  tracking-widest text-black-500">
                                Posts
                            </h2>
                        </div>

                        {postsLoading ? (
                            <div className="py-16 flex flex-col items-center justify-center gap-3 bg-white rounded-3xl border border-slate-200/80 shadow-sm">
                                <div className="h-6 w-6 animate-spin rounded-full border-3 border-indigo-600 border-t-transparent" />
                                <p className="text-sm font-medium text-slate-500">Loading posts...</p>
                            </div>
                        ) : posts.length === 0 ? (
                            <div className="py-20 text-center bg-white rounded-3xl border border-slate-200/80 shadow-sm px-6">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
                                    <span className="text-3xl">🍽️</span>
                                </div>

                                <h3 className="text-xl font-bold tracking-tight text-slate-900">
                                    Share your first dish
                                </h3>

                                <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
                                    Your food posts will appear here once you start sharing.
                                </p>

                                <button
                                    onClick={() => navigate("/create-post")}
                                    className="mt-6 rounded-2xl bg-(--primary) px-6 py-3 text-sm font-semibold text-white shadow-md shadow-rose-500/20 transition hover:bg-rose-700 active:scale-98"
                                >
                                    Create Post
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                                {posts.map((post) => (
                                    <article
                                        key={post._id}
                                        className="group relative aspect-square overflow-hidden bg-slate-100"
                                    >
                                        <img
                                            src={
                                                typeof post.image === "string"
                                                    ? post.image
                                                    : post.image?.url
                                            }
                                            alt={post.foodName || post.caption || "Food post"}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 flex items-center justify-center gap-4 bg-slate-950/40 text-sm font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                            <span className="flex items-center gap-1.5">
                                                ♥ {post.likesCount || 0}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                💬 {post.commentsCount || 0}
                                            </span>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>

            <BottomNavbar />
        </div>
    );
}