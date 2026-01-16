import React from 'react';
import { motion } from 'framer-motion';

export const PumpFunWidget: React.FC = () => {
    return (
        <a
            href="https://pump.fun/board"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full block group"
        >
            <div className="w-full h-full bg-[#1A4C40] hover:bg-[#1f594b] transition-colors border border-green-400/20 rounded-3xl p-5 flex flex-col relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#86efac 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

                <div className="flex items-center justify-between mb-auto z-10">
                    <div className="w-10 h-10 rounded-xl bg-green-400 text-black flex items-center justify-center font-bold text-xl">
                        💊
                    </div>
                    <div className="px-2 py-1 rounded-full bg-black/20 text-green-300 text-[10px] font-bold uppercase tracking-wider border border-green-400/20">
                        Launchpad
                    </div>
                </div>

                <div className="z-10 mt-auto">
                    <h3 className="text-3xl font-bold text-green-50 tracking-tight leading-none mb-1">pump.fun</h3>
                    <p className="text-green-200/60 text-sm leading-snug">
                        Prevent rug-pulls by ensuring all created tokens are safe.
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-green-300 text-sm font-bold group-hover:translate-x-1 transition-transform">
                        <span>Launch Terminal</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </div>
                </div>
            </div>
        </a>
    );
};
