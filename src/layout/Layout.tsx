import React from 'react';
import { Outlet } from 'react-router-dom';

export function Layout() {
    return (
        <div className="min-h-[100dvh] w-full bg-[#0b0c15] text-white overflow-hidden relative font-sans selection:bg-red-500/30">

            {/* Subtle Technical Grid */}
            <div className="fixed inset-0 bg-grid pointer-events-none z-0 opacity-100" />

            {/* Deep Ambient Glows - very low opacity */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-blue-900/10 rounded-full blur-[150px] mix-blend-screen" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-red-900/10 rounded-full blur-[150px] mix-blend-screen" />
            </div>

            {/* Clean Main Content - No Scanlines */}
            <main className="relative z-10 w-full max-w-md mx-auto h-full min-h-[100dvh] flex flex-col p-6 pb-safe-bottom pt-safe-top">
                <Outlet />
            </main>
        </div>
    );
}
