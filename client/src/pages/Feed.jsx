
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../components/BottomNavbar";
import PostCard from "../components/PostCard";
import SideNavbar from "../components/SideNavbar";

export default function Feed() {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await fetch(
                ` ${import.meta.env.VITE_API_URL}/api/posts`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch posts"
                );
            }

            setPosts(data.posts);

        } catch (error) {
            console.error("FETCH POSTS ERROR:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div>
                Loading posts...
            </div>
        );
    }

    // // Like / Unlike post
    // const handleLike = (postId) => {
    //     setPosts((currentPosts) =>
    //         currentPosts.map((post) => {
    //             if (post.id !== postId) {
    //                 return post;
    //             }

    //             return {
    //                 ...post,
    //                 hasLiked: !post.hasLiked,
    //                 likes: post.hasLiked
    //                     ? post.likes - 1
    //                     : post.likes + 1,
    //             };
    //         })
    //     );
    // };



    return (
        <div className="w-full min-h-screen bg-white font-sans pb-16 overflow-x-hidden">

            <SideNavbar />

            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
                <div className="max-w-xl mx-auto h-14 px-4 flex items-center justify-between">

                    {/* Logo */}
                    <h1
                        onClick={() => navigate("/")}
                        className="text-2xl font-black tracking-tight cursor-pointer select-none"
                    >
                        <span className="text-neutral-900">Dish</span>
                        <span className="text-red-500">Pix</span>
                    </h1>



                    {/* Create Post */}
                    <button
                        onClick={() => navigate("/create-post")}
                        className="bg-(--primary) hover:opacity-90 text-white font-bold px-4 py-2 rounded-full text-sm transition shadow-sm"
                        aria-label="Create post"
                    >
                        + Create Post
                    </button>

                </div>
            </header>

            {/*  Feed */}
            <main className="max-w-xl mx-auto">

                {loading ? (
                    <div className="flex items-center justify-center min-h-[70vh]">
                        <p className="text-(--muted)">
                            Loading posts...
                        </p>
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
                                className={`
                                    w-full
                                    ${index !== posts.length - 1
                                        ? "border-b border-neutral-200"
                                        : ""
                                    }
                                `}
                            >
                                <PostCard
                                    post={post}
                                //  onLike={handleLike}
                                />
                            </div>
                        ))}

                    </div>
                )}
            </main>

            <BottomNavbar />
        </div>
    );
}