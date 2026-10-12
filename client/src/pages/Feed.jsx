
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import BottomNavbar from "../components/BottomNavbar";
import PostCard from "../components/PostCard";
import SideNavbar from "../components/SideNavbar";

export default function Feed() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [likingPosts, setLikingPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError("");

                const { data } = await api.get("/api/posts");
                setPosts(data.posts || []);
            } catch (error) {
                console.error("FETCH POSTS ERROR:", error);
                setError(
                    error.response?.data?.message ||
                    "Failed to load posts. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleLike = async (postId) => {
        if (likingPosts.includes(postId)) return;

        const post = posts.find((item) => item._id === postId);
        if (!post) return;

        setLikingPosts((current) => [...current, postId]);

        try {
            if (post.isLikedByMe) {
                await api.delete(`/api/posts/${postId}/like`);
            } else {
                await api.post(`/api/posts/${postId}/like`);
            }

            setPosts((currentPosts) =>
                currentPosts.map((item) =>
                    item._id === postId
                        ? {
                            ...item,
                            isLikedByMe: !post.isLikedByMe,
                            likesCount: Math.max(
                                0,
                                (item.likesCount || 0) +
                                (post.isLikedByMe ? -1 : 1)
                            ),
                        }
                        : item
                )
            );
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Unable to update like. Please try again."
            );
        } finally {
            setLikingPosts((current) =>
                current.filter((id) => id !== postId)
            );
        }
    };

    return (
        <div className="w-full min-h-screen bg-white font-sans pb-16 overflow-x-hidden">
            <SideNavbar />

            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
                <div className="max-w-xl mx-auto h-14 px-4 flex items-center justify-between">
                    <h1
                        onClick={() => navigate("/")}
                        className="text-2xl font-black tracking-tight cursor-pointer"
                    >
                        <span className="text-neutral-900">Dish</span>
                        <span className="text-red-500">Pix</span>
                    </h1>

                    <button
                        onClick={() => navigate("/create-post")}
                        className="bg-(--primary) hover:opacity-90 text-white font-bold px-4 py-2 rounded-full text-sm transition shadow-sm"
                    >
                        + Create Post
                    </button>
                </div>
            </header>

            {/* Feed */}
            <main className="max-w-xl mx-auto">
                {loading ? (
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <p className="text-(--muted)">Loading posts...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                        <p className="text-red-500 text-sm">{error}</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                        <h2 className="text-lg font-bold text-neutral-800">
                            No posts yet
                        </h2>
                        <p className="text-sm text-(--muted) mt-1">
                            Be the first person to share a dish!
                        </p>
                        <button
                            onClick={() => navigate("/create-post")}
                            className="mt-4 bg-(--primary) text-white px-5 py-2 rounded-full font-semibold"
                        >
                            Create Post
                        </button>
                    </div>
                ) : (
                    <div className="w-full">
                        {posts.map((post, index) => (
                            <div
                                key={post._id}
                                className={
                                    index !== posts.length - 1
                                        ? "border-b border-neutral-200"
                                        : ""
                                }
                            >
                                <PostCard
                                    post={post}
                                    onLike={handleLike} />
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <BottomNavbar />
        </div>
    );
}
