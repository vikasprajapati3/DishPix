import React from 'react';
import { useNavigate } from 'react-router-dom';
import foodBg from '../assets/food_bg1.png';

export default function Register() {
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

                    {/* Logo and header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl font-black tracking-wider uppercase mb-2">
                            <span className="text-white">Dish</span>
                            <span className="text-rose-500">Pix</span>
                        </h1>
                        <p className="text-gray-300 text-sm sm:text-base font-medium">
                            Create your account
                        </p>
                    </div>

                    {/* Input fields stack */}
                    <div className="flex flex-col gap-5">

                        {/* Username field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-xs sm:text-sm font-bold tracking-wide uppercase px-1">
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder="@username"
                                className="w-full bg-gray-900 border border-gray-700 rounded-full px-5 py-3 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-rose-500 transition-all"
                            />
                        </div>

                        {/* Email field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-xs sm:text-sm font-bold tracking-wide uppercase px-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full bg-gray-900 border border-gray-700 rounded-full px-5 py-3 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-rose-500 transition-all"
                            />
                        </div>

                        {/* Password field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-xs sm:text-sm font-bold tracking-wide uppercase px-1">
                                Password
                            </label>
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
                            Create Account
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
