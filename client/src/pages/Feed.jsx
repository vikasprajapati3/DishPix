import React from "react";

export default function Feed() {

    return (
        <div className="p-4">

            <h1 className="text-2xl font-bold">
                Dish<span className="text-red-500">Pix</span>
            </h1>

            <div className="bg-white p-4 mt-4">

                <h2>victor</h2>

                <p>Pizza Haven - Downtown</p>

                <img
                    src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGl6emF8ZW58MHx8MHx8fDA%3D"
                    alt="Food"
                    className="w-full h-auto object-cover"
                />

                <div>
                    <button>❤️ 142</button>
                    <button> 💬 18</button>
                </div>

                <p>
                    Best Pizza I have had all year!
                </p>

            </div>

        </div>
    );
}