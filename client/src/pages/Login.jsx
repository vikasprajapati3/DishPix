import React from 'react';
import { useNavigate } from 'react-router-dom';
import foodBg from '../assets/food_bg1.png';
import { FaChevronLeft } from 'react-icons/fa';

export default function Login() {
    const navigate = useNavigate();

    return (
        <div
            className="w-full min-h-screen flex flex-col font-sans select-none relative bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${foodBg})`
            }}
        >
            {/* Dark background overlay */}
            <div className="absolute inset-0 bg-black opacity-80 z-0"></div>

            {/* Main container */}
            <div className="flex-1 flex flex-col items-center justify-center z-10 px-5 py-12">

                {/* Form card */}
                <div className="w-full max-w-md bg-gray-950 border border-gray-800 p-6 sm:p-8 rounded-3xl shadow-2xl">

                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-6 left-6 text-gray-400 hover:text-rose-500 transition-colors duration-200 flex items-center gap-1 text-sm font-semibold"
                    >
                        <FaChevronLeft className="text-xs" />
                        Back
                    </button>

                    {/* Logo and header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl font-black tracking-wider uppercase mb-2">
                            <span className="text-white">Dish</span>
                            <span className="text-rose-500">Pix</span>
                        </h1>
                        <p className="text-gray-300 text-sm sm:text-base font-medium">
                            Welcome back! Sign in to continue
                        </p>
                    </div>

                    {/* Input fields stack */}
                    <div className="flex flex-col gap-5">

                        {/* Email field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-xs sm:text-sm font-bold tracking-wide uppercase px-1">
                                Email
                            </label>
                            <input
                                type="text"
                                placeholder="@email"
                                className="w-full bg-gray-900 border border-gray-700 rounded-full px-5 py-3 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-rose-500 transition-all"
                            />
                        </div>

                        {/* Password field */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-gray-300 text-xs sm:text-sm font-bold tracking-wide uppercase">
                                    Password
                                </label>
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-gray-900 border border-gray-700 rounded-full px-5 py-3 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-rose-500 transition-all"
                            />
                        </div>

                        {/* Submit button */}
                        <button
                            onClick={() => navigate('/feed')}
                            className="w-full bg-rose-500 text-white font-bold text-base sm:text-lg tracking-wider uppercase py-4 rounded-full shadow-lg hover:bg-rose-600 transition-all cursor-pointer mt-2 text-center"
                        >
                            Sign In
                        </button>

                    </div>
                    {/* Footer link */}
                    <p className="text-center text-gray-400 text-xs sm:text-sm mt-6">
                        Don't have an account?{' '}
                        <span
                            onClick={() => navigate('/register')}
                            className="text-rose-500 hover:underline cursor-pointer font-semibold"
                        >
                            Sign Up
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
}
