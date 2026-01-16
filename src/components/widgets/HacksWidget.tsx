import React, { useEffect, useState } from 'react';

interface Hack {
    name: string;
    date: number;
    amount: number;
    chain: string;
}

export const HacksWidget: React.FC = () => {
    const [hacks, setHacks] = useState<Hack[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/defillama/hacks');
                const data = await res.json();
                setHacks(data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    const formatDate = (ts: number) => new Date(ts * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    const formatMoney = (n: number) => {
        if (n > 1e6) return `$${(n / 1e6).toFixed(1)}M`;
        return `$${(n / 1000).toFixed(0)}k`;
    };

    return (
        <div className="w-full h-full bg-[#1a0f0f] border border-red-500/20 rounded-3xl p-5 flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold text-xl">
                        🚨
                    </div>
                    <div>
                        <h3 className="text-white font-medium text-lg leading-tight">Exploits</h3>
                        <p className="text-red-500/60 text-xs font-mono">Recent Hacks</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
                {hacks.map((h, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                        <div>
                            <div className="text-white font-medium text-sm">{h.name}</div>
                            <div className="text-[10px] text-white/40 font-mono">{h.chain} • {formatDate(h.date)}</div>
                        </div>
                        <span className="text-red-400 font-bold font-mono">{formatMoney(h.amount)}</span>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 0px; }
            `}</style>
        </div>
    );
};
