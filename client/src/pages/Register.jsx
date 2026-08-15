import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import foodBg from "../assets/food_bg1.png";
import { FaChevronLeft } from "react-icons/fa";

export default function Register() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/register`,
                {
                    username,
                    email,
                    password,
                }
            );

            // Backend response
            const data = response.data;

            // Save user + JWT
            login(data);

            // Go to feed
            navigate("/feed");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }


    };

    return (
        <div
            className="w-full h-screen flex flex-col font-sans select-none relative bg-cover bg-center bg-no-repeat overflow-hidden"
            style={{
                backgroundImage: `url(${foodBg})`,
            }}
        >

            {/* Dark background overlay */}
            <div className="absolute inset-0 bg-black opacity-80 z-0"></div>

            {/* Main container */}
            <div className="flex-1 flex flex-col items-center justify-center z-10 px-5 py-4">

                {/* Form card */}
                <div className="w-full max-w-md bg-gray-950 border border-gray-800 p-5 sm:p-6 rounded-3xl shadow-2xl">

                    {/* Back button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-6 left-6 text-gray-400 hover:text-rose-500 transition-colors duration-200 flex items-center gap-1 text-sm font-semibold"
                    >
                        <FaChevronLeft className="text-xs" />
                        Back
                    </button>

                    {/* Logo and header */}
                    <div className="text-center mb-5">

                        <h1 className="text-3xl sm:text-4xl font-black tracking-wider uppercase mb-1">
                            <span className="text-white">
                                Dish
                            </span>

                            <span className="text-rose-500">
                                Pix
                            </span>
                        </h1>

                        <p className="text-gray-300 text-sm font-medium">
                            Create your account
                        </p>

                    </div>

                    {/* Register Form */}
                    <form
                        onSubmit={handleRegister}
                        className="flex flex-col gap-3.5"
                    >

                        {/* Username */}
                        <div className="flex flex-col gap-1.5">

                            <label className="text-gray-300 text-xs sm:text-sm font-bold tracking-wide uppercase px-1">
                                Username
                            </label>

                            <input
                                type="text"
                                placeholder="@username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-rose-500 transition-colors"
                            />

                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">

                            <label className="text-gray-300 text-xs sm:text-sm font-bold tracking-wide uppercase px-1">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-rose-500 transition-colors"
                            />

                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">

                            <label className="text-gray-300 text-xs sm:text-sm font-bold tracking-wide uppercase px-1">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-rose-500 transition-colors"
                            />

                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col gap-1.5">

                            <label className="text-gray-300 text-xs sm:text-sm font-bold tracking-wide uppercase px-1">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-rose-500 transition-colors"
                            />

                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-xl mt-1 transition-colors duration-200"
                        >
                            {loading ? "Creating Account..." : "Sign Up"}
                        </button>

                    </form>

                    {/* Footer */}
                    <p className="text-center text-gray-400 text-xs sm:text-sm mt-4">

                        Already have an account?{" "}

                        <span
                            onClick={() => navigate("/login")}
                            className="text-rose-500 hover:underline cursor-pointer font-semibold"
                        >
                            Log In
                        </span>

                    </p>

                </div>
            </div>
        </div>
    );
}
