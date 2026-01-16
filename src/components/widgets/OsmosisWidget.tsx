import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Size constrained 2x2 or 4x4 capable
interface Metric {
    liquidity_usd: number;
    volume_24h: number;
    gamma_24h?: number;
}

export const OsmosisWidget: React.FC = () => {
    const [data, setData] = useState<Metric | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/osmosis/metrics');
            const json = await res.json();
            setData(json);
        } catch (e) {
            console.error('Osmosis Widget Error:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 300000); // 5m refresh
        return () => clearInterval(interval);
    }, []);

    const formatMoney = (n: number) => {
        if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
        if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
        return `$${n.toLocaleString()}`;
    };

    return (
        <div className="w-full h-full bg-[#120024]/80 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-5 flex flex-col relative overflow-hidden group">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between mb-4 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400">
                        {/* Osmosis Flask Icon */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31" /><path d="M14 2v7.31" /><path d="M8.5 2h7" /><path d="M14 9.3a6.5 6.5 0 1 1-4 0" /><path d="M5.52 16h12.96" /></svg>
                    </div>
                    <div>
                        <h3 className="text-white font-medium text-lg leading-tight">Osmosis</h3>
                        <p className="text-white/40 text-xs font-mono">Cosmos Liquidity</p>
                    </div>
                </div>
                {loading && <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />}
            </div>

            <div className="flex-1 flex flex-col justify-end gap-3 z-10">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-xs text-white/40 uppercase mb-1">Total Liquidity</div>
                    <div className="text-2xl font-bold text-white tracking-tight">
                        {data ? formatMoney(data.liquidity_usd) : '---'}
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="flex-1 p-3 rounded-2xl bg-white/5 border border-white/5">
                        <div className="text-[10px] text-white/40 uppercase mb-1">24h Vol</div>
                        <div className="text-base font-medium text-green-300">
                            {data ? formatMoney(data.volume_24h) : '---'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
