import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

export default function CreatePost() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        restaurant: "",
        foodName: "",
        caption: "",
        rating: 5,
    });

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setForm((prev) => ({
                ...prev,
                image: files[0],
            }));
            return;
        }
        setForm((prev) => ({
            ...prev,
            [name]: name === "rating" ? Number(value) : value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.restaurant.trim() || !form.foodName.trim() || !form.caption.trim() || !form.image) {
            alert("Please fill in all fields and add an image");
            return;
        }

        try {
            setLoading(true);
            const data = new FormData();
            data.append("restaurant", form.restaurant);
            data.append("foodName", form.foodName);
            data.append("caption", form.caption);
            data.append("rating", form.rating);
            data.append("image", form.image);

            // Send the form data to the backend
            const token = localStorage.getItem("token");

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/posts`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            alert("Post created successfully!");
            navigate("/feed");
        } catch (error) {
            console.error("CREATE POST ERROR:", error);
            alert(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-(--background) min-h-screen max-w-md mx-auto">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => navigate("/")}
                    className="text-sm text-(--muted)"
                >
                    <FaChevronLeft /> Back
                </button>
                <h1 className="text-2xl font-bold">
                    Create <span className="text-red-500">Post</span>
                </h1>
                <div className="w-8"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium mb-1">Food Image</label>

                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full p-2 border border-neutral-300 rounded-lg text-sm bg-white"
                    />

                </div>

                {/* Restaurant */}
                <div>
                    <label className="block text-sm font-medium mb-1">Restaurant</label>
                    <input
                        type="text"
                        name="restaurant"
                        placeholder="e.g. Pizza Haven"
                        value={form.restaurant}
                        onChange={handleChange}
                        className="w-full p-2.5 border border-neutral-300 rounded-lg text-sm bg-white outline-none focus:border-red-500"
                    />
                </div>

                {/* Food Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Food Name</label>
                    <input
                        type="text"
                        name="foodName"
                        placeholder="e.g. Pepperoni Pizza"
                        value={form.foodName}
                        onChange={handleChange}
                        className="w-full p-2.5 border border-neutral-300 rounded-lg text-sm bg-white outline-none focus:border-red-500"
                    />
                </div>

                {/* Rating */}
                <div>
                    <label className="block text-sm font-medium mb-1">Rating</label>
                    <select
                        name="rating"
                        value={form.rating}
                        onChange={handleChange}
                        className="w-full p-2.5 border border-neutral-300 rounded-lg text-sm bg-white outline-none focus:border-red-500"
                    >
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                                {"⭐".repeat(num)} {num}/5
                            </option>
                        ))}
                    </select>
                </div>

                {/* Caption */}
                <div>
                    <label className="block text-sm font-medium mb-1">Caption</label>
                    <textarea
                        name="caption"
                        placeholder="Tell us about this dish..."
                        value={form.caption}
                        onChange={handleChange}
                        rows={3}
                        maxLength={500}
                        className="w-full p-2.5 border border-neutral-300 rounded-lg text-sm bg-white outline-none resize-none focus:border-red-500"
                    />
                    <span className="text-xs text-neutral-400 float-right mt-1">{form.caption.length}/500</span>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-(--primary) text-white font-medium py-2.5 rounded-lg text-sm mt-4 hover:opacity-90 transition"
                >
                    {loading ? "Posting..." : "Share Dish"}
                </button>

            </form>
        </div>
    );
}