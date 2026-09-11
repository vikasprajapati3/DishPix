import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import SideNavbar from "../components/SideNavbar";
import BottomNavbar from "../components/BottomNavbar";

export default function CreatePost() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        restaurant: "",
        foodName: "",
        caption: "",
        rating: 5,
        location: "",
        image: null,
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

        if (!form.restaurant.trim() || !form.foodName.trim() || !form.caption.trim() || !form.image || !form.location.trim()) {
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
            data.append("location", form.location);
            data.append("image", form.image);

            const token = localStorage.getItem("token");

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/posts/create-post`,
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
            <SideNavbar />

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm text-(--muted) flex items-center gap-1"
                >
                    <FaChevronLeft />
                    Back
                </button>
                <h1 className="text-2xl font-bold">
                    Create <span className="text-red-500">Post</span>
                </h1>
                <div className="w-8"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* 1. Image Upload  */}
                <div>
                    <label className="block text-sm font-medium mb-1">Food Image</label>
                    <div className="flex items-center justify-between p-2 border border-neutral-300 rounded-lg bg-white">
                        <span className="text-sm text-slate-600 px-2 truncate max-w-50">
                            {form.image ? `Selected: ${form.image.name}` : "No image selected"}
                        </span>
                        <label className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition">
                            Browse
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>

                {/* 2. Food Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Food Name</label>
                    <input
                        type="text"
                        name="foodName"
                        placeholder="e.g. Corn Pizza"
                        value={form.foodName}
                        onChange={handleChange}
                        className="w-full p-2.5 border border-neutral-300 rounded-lg text-sm bg-white outline-none focus:border-red-500"
                    />
                </div>

                {/* 3. Restaurant & Location */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium mb-1">Restaurant</label>
                        <input
                            type="text"
                            name="restaurant"
                            placeholder="e.g. Pizza Hut"
                            value={form.restaurant}
                            onChange={handleChange}
                            className="w-full p-2.5 border border-neutral-300 rounded-lg text-sm bg-white outline-none focus:border-red-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="e.g. Kalyan,west"
                            value={form.location}
                            onChange={handleChange}
                            className="w-full p-2.5 border border-neutral-300 rounded-lg text-sm bg-white outline-none focus:border-red-500"
                        />
                    </div>
                </div>

                {/* 4. Rating */}
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

                {/* 5. Caption */}
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
            <BottomNavbar />
        </div>
    );
}