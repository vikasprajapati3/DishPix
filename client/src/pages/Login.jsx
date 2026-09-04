import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import foodBg from "../assets/food_bg1.png";
import { FaChevronLeft, FaEye } from "react-icons/fa";


export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    email,
                    password,
                }
            );

            const data = response.data;

            login(data);

            navigate("/feed");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-dvh flex flex-col font-sans select-none relative bg-cover bg-center bg-no-repeat overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-30"
                style={{
                    backgroundImage: `url(${foodBg})`,
                }}
            />
            {/* Dark background overlay */}
            <div className="absolute inset-0 bg-(--white) opacity-30 z-0"></div>

            {/* Main container */}
            <div className="flex-1 flex flex-col items-center justify-center z-10 px-5 py-12">
                {/* Back button */}
                <div className="w-full max-w-md mb-3">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-(--muted) hover:text-(--primary) transition-colors duration-200 text-sm font-semibold"
                    >
                        <FaChevronLeft className="text-xs" />
                        Back
                    </button>
                </div>
                {/* Form card */}
                <div className="w-full max-w-md bg-(--card) border border-(--border) p-6 sm:p-8 rounded-3xl shadow-2xl">



                    {/* Logo and header */}
                    <div className="text-center mb-8">

                        <h1 className="text-3xl sm:text-4xl font-black tracking-wider uppercase mb-2">

                            <span className="text-(--text)">
                                Dish
                            </span>

                            <span className="text-(--primary)">
                                Pix
                            </span>

                        </h1>

                        <p className="text-(--muted) text-sm sm:text-base font-medium">
                            Welcome back! Sign in to continue
                        </p>

                    </div>

                    {/* Login form */}
                    <form
                        onSubmit={handleLogin}
                        className="flex flex-col gap-5"
                    >

                        {/* Email */}
                        <div className="flex flex-col gap-2">

                            <label className="text-(--text) text-xs sm:text-sm font-bold tracking-wide uppercase px-1">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="w-full bg-(--card) border border-(--border) rounded-full px-5 py-3 text-(--text) text-sm sm:text-base placeholder:text-(--muted) focus:outline-none focus:border-(--primary) transition-all"
                            />

                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-2">

                            <label className="text-(--text) text-xs sm:text-sm font-bold tracking-wide uppercase px-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full bg-(--card) border border-(--border) rounded-full px-5 py-3 text-(--text) text-sm sm:text-base placeholder:text-(--muted) focus:outline-none focus:border-(--primary) transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-(--muted) hover:text-(--primary) transition-colors"
                                >
                                    <FaEye />
                                </button>
                            </div>


                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-(--primary) text-white font-bold text-base sm:text-lg tracking-wider uppercase py-4 rounded-full shadow-lg hover:opacity-90 transition-all cursor-pointer mt-2"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>

                    </form>

                    {/* Footer */}
                    <p className="text-center text-(--muted) text-xs sm:text-sm mt-6">

                        Don't have an account?{" "}

                        <span
                            onClick={() => navigate("/register")}
                            className="text-(--primary) hover:underline cursor-pointer font-semibold"
                        >
                            Sign Up
                        </span>

                    </p>

                </div>
            </div>
        </div>
    );
}