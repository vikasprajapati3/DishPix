import React from 'react';
import { useNavigate } from 'react-router-dom';
import foodBg from '../assets/food_bg1.png';
import BottomNav from '../components/BottomNavbar';

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div
            className="w-full h-dvh flex flex-col font-sans select-none relative bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${foodBg})` }}
        >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-neutral-700/70 to-neutral-700/90 z-0"></div>

            {/* Content container */}
            <div className="flex-1 flex flex-col items-center text-center z-10 px-5 py-12">

                {/* Subtitle */}
                <span className="text-amber-400 text-sm sm:text-base tracking-widest uppercase font-bold mb-2 drop-shadow-sm">
                    Welcome to
                </span>

                {/* App name */}
                <h1 className="text-5xl sm:text-7xl font-black tracking-wider uppercase mb-3 drop-shadow-md select-none">
                    <span className="text-white">Dish</span>
                    <span className="text-rose-500">Pix</span>
                </h1>

                {/* Headline */}
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white max-w-sm sm:max-w-xl leading-tight mb-5 tracking-tight px-2">
                    Every plate has a story. <span className="text-amber-300 block sm:inline mt-1 sm:mt-0">Snap it.</span>
                </h2>

                {/* Description */}
                <p className="text-neutral-200 text-base sm:text-lg max-w-sm sm:max-w-md leading-relaxed mb-10 px-4 opacity-95">
                    DishPix is where you log the meals worth remembering — one photo, one rating, one honest review at a time. Browse what everyone else is eating tonight.
                </p>

                {/* Navigation links */}
                <div className="w-full max-w-[300px] sm:max-w-xs flex flex-col gap-4 px-2">
                    <button
                        onClick={() => navigate('/register')}
                        className="w-full bg-rose-500 text-white font-bold text-base sm:text-lg tracking-wider uppercase py-4 px-8 rounded-full shadow-lg shadow-rose-500/30 hover:bg-rose-600 hover:shadow-rose-600/40 active:scale-[0.97] transition-all duration-200 ease-out cursor-pointer"
                    >
                        Get Started
                    </button>

                    <button
                        onClick={() => navigate('/feed')}
                        className="w-full bg-white/10 backdrop-blur-md text-white font-bold text-base sm:text-lg tracking-wider uppercase py-4 px-8 rounded-full shadow-sm border border-white/25 hover:bg-white/20 hover:border-white/40 active:scale-[0.97] transition-all duration-200 ease-out cursor-pointer"
                    >
                        Explore Foods
                    </button>
                </div>

            </div>
            <BottomNav />
        </div>
    );
}
