import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BottomNavbar from "../components/BottomNavbar";
import PostCard from "../components/PostCard";

export default function Feed() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const posts = [
        {
            id: 1,
            user: "victor",
            restaurant: "Pizza Haven - Downtown",
            image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600",
            likes: 142,
            comments: 18,
            caption: "Best Pizza I have had all year!"
        },
        {
            id: 2,
            user: "Abhishek",
            restaurant: "Burger House",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
            likes: 98,
            comments: 12,
            caption: "This burger was absolutely amazing!"
        }
    ];

    return (
        <div className="p-4 bg-(--background) min-h-screen">

            <div className="flex justify-between items-center mb-4">

                <h1 className="text-2xl font-bold">
                    Dish<span className="text-red-500">Pix</span>
                </h1>

                <button
                    onClick={() => navigate("/create-post")}
                    className="bg-(--primary) text-white px-4 py-2 rounded-lg"
                >
                    + Create Post
                </button>

            </div>

            {/* Posts */}
            {loading ? (
                <div className="flex items-center justify-center min-h-[70vh]">
                    <p className="text-(--muted)">
                        Loading posts...
                    </p>
                </div>
            ) : (
                posts.map((posts) => (
                    <PostCard
                        key={posts.id}
                        post={posts}
                    />
                ))
            )}

            <BottomNavbar />
        </div>
    );
}