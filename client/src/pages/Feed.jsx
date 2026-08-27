import React from "react";

export default function Feed() {

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
        <div className="p-4 bg-gray-100 min-h-screen">

            <h1 className="text-2xl font-bold">
                Dish<span className="text-red-500">Pix</span>
            </h1>

            {posts.map((post) => (
                <div
                    key={post.id}
                    className="bg-white p-4 mt-4 rounded-lg"
                >

                    <h2 className="font-bold">
                        {post.user}
                    </h2>

                    <p className="text-gray-600">
                        {post.restaurant}
                    </p>

                    <img
                        src={post.image}
                        alt={post.restaurant}
                        className="w-full mt-3 rounded-lg"
                    />

                    <div className="mt-3">
                        <button>❤️ {post.likes}</button>
                        <button className="ml-4">
                            💬 {post.comments}
                        </button>
                    </div>

                    <p className="mt-2">
                        {post.caption}
                    </p>

                </div>
            ))}

        </div>
    );
}
