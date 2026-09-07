
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../components/BottomNavbar";
import PostCard from "../components/PostCard";
import SideNavbar from "../components/SideNavbar";

export default function Feed() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [posts, setPosts] = useState([
        {
            id: 1,
            user: "victor",
            restaurant: "Pizza Haven",
            location: "Downtown",
            image:
                "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800",
            likes: 142,
            hasLiked: false,
            comments: 18,
            caption: "Best Pizza I have had all year!",
            timeAgo: "2h ago",
        },
        {
            id: 2,
            user: "Abhishek",
            restaurant: "Burger House",
            location: "Westside",
            image:
                "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
            likes: 98,
            hasLiked: false,
            comments: 12,
            caption: "This burger was absolutely amazing!",
            timeAgo: "5h ago",
        },
    ]);

    // Like / Unlike post
    const handleLike = (postId) => {
        setPosts((currentPosts) =>
            currentPosts.map((post) => {
                if (post.id !== postId) {
                    return post;
                }

                return {
                    ...post,
                    hasLiked: !post.hasLiked,
                    likes: post.hasLiked
                        ? post.likes - 1
                        : post.likes + 1,
                };
            })
        );
    };



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
                                key={post.id}
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
                                    onLike={handleLike}
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