import React, { useEffect, useState } from 'react';

export const HeliusWidget: React.FC = () => {
    const [stats, setStats] = useState({ tps: 0, slot: 0 });
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/helius/stats');
            const data = await res.json();
            setStats(data);
        } catch (e) {
            console.error('Helius Widget Error:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000); // 5s refresh (TPS changes fast)
        return () => clearInterval(interval);
    }, []);

    // TPS Gauge calculation (0 - 5000 scale)
    const tpsPercent = Math.min((stats.tps / 5000) * 100, 100);

    return (
        <div className="w-full h-full bg-[#000] border border-orange-500/20 rounded-3xl p-5 flex flex-col relative overflow-hidden">
            {/* Helius Logo / Header */}
            <div className="flex items-center justify-between mb-4 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500 text-black flex items-center justify-center font-bold">
                        ⚡
                    </div>
                    <div>
                        <h3 className="text-white font-medium text-lg leading-tight">Helius</h3>
                        <p className="text-orange-400 text-xs font-mono">Network Scope</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-end gap-2 z-10">
                <div className="text-4xl font-bold text-white tracking-tighter">
                    {stats.tps > 0 ? stats.tps.toLocaleString() : '---'}
                    <span className="text-sm text-orange-500/60 ml-2 font-mono align-middle">TPS</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-1000 ease-out"
                        style={{ width: `${tpsPercent}%` }}
                    />
                </div>

                <div className="flex justify-between text-[10px] text-white/30 font-mono mt-1">
                    <span>Slot: {stats.slot.toLocaleString()}</span>
                    <span>Load: {tpsPercent.toFixed(0)}%</span>
                </div>
            </div>

            {/* Background Orange Glow */}
            <div className="absolute top-1/2 right-0 w-32 h-32 bg-orange-500/10 blur-[50px] pointer-events-none rounded-full" />
        </div>
    );
};
