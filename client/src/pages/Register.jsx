
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import foodBg from "../assets/food_bg1.png";
import {
    FaChevronLeft,
    FaEye
} from "react-icons/fa";

export default function Register() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (
            !username.trim() ||
            !email.trim() ||
            !password ||
            !confirmPassword
        ) {
            alert("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

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

            const data = response.data;

            login(data);

            navigate("/feed");

        } catch (error) {
            console.error("REGISTER ERROR:", error);

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

        >
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-30"
                style={{
                    backgroundImage: `url(${foodBg})`,
                }}
            />

            {/* Background overlay */}
            <div className="absolute inset-0 bg-(--white) opacity-30 z-0"></div>

            {/* Main container */}
            <div className="flex-1 flex flex-col items-center justify-center z-10 px-5 py-4">

                {/* Form card */}
                <div className="w-full max-w-md bg-(--card) border border-(--border) p-5 sm:p-6 rounded-3xl shadow-2xl">

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

                    {/* Logo and header */}
                    <div className="text-center mb-5">

                        <h1 className="text-3xl sm:text-4xl font-black tracking-wider uppercase mb-1">
                            <span className="text-(--text)">
                                Dish
                            </span>

                            <span className="text-(--primary)">
                                Pix
                            </span>
                        </h1>

                        <p className="text-(--muted) text-sm font-medium">
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

                            <label className="text-(--text) text-xs sm:text-sm font-bold tracking-wide uppercase px-1">
                                Username
                            </label>

                            <input
                                type="text"
                                placeholder="@username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                className="w-full bg-(--card) border border-(--border) text-(--text) rounded-xl px-4 py-2.5 text-sm placeholder:text-(--muted) focus:outline-none focus:border-(--primary) transition-colors"
                            />

                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">

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
                                className="w-full bg-(--card) border border-(--border) text-(--text) rounded-xl px-4 py-2.5 text-sm placeholder:text-(--muted) focus:outline-none focus:border-(--primary) transition-colors"
                            />

                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-(--text) text-xs sm:text-sm font-bold tracking-wide uppercase px-1">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-(--card) border border-(--border) text-(--text) rounded-xl px-4 py-2.5 pr-11 text-sm placeholder:text-(--muted) focus:outline-none focus:border-(--primary) transition-colors"
                                />

                                <button
                                    type="button"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-(--muted) hover:text-(--primary) transition-colors"
                                >
                                    <FaEye
                                        className={`text-sm transition-opacity ${showPassword ? "opacity-50" : "opacity-100"
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>


                        {/* Confirm Password */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-(--text) text-xs sm:text-sm font-bold tracking-wide uppercase px-1">
                                Confirm Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-(--card) border border-(--border) text-(--text) rounded-xl px-4 py-2.5 pr-11 text-sm placeholder:text-(--muted) focus:outline-none focus:border-(--primary) transition-colors"
                                />

                                <button
                                    type="button"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-(--muted) hover:text-(--primary) transition-colors"
                                >
                                    <FaEye
                                        className={`text-sm transition-opacity ${showPassword
                                            ? "opacity-50"
                                            : "opacity-100"
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-(--primary) hover:opacity-90 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-xl mt-1 transition-colors duration-200"
                        >
                            {loading
                                ? "Creating Account..."
                                : "Sign Up"}
                        </button>

                    </form>

                    {/* Footer */}
                    <p className="text-center text-(--muted) text-xs sm:text-sm mt-4">

                        Already have an account?{" "}

                        <span
                            onClick={() => navigate("/login")}
                            className="text-(--primary) hover:underline cursor-pointer font-semibold"
                        >
                            Log In
                        </span>

                    </p>

                </div>
            </div>
        </div>
    );
}

