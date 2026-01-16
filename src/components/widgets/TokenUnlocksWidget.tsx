import React, { useEffect, useState } from 'react';

interface Unlock {
    token: string;
    value: number;
    date: string;
}

export const TokenUnlocksWidget: React.FC = () => {
    const [unlocks, setUnlocks] = useState<Unlock[]>([]);

    useEffect(() => {
        fetch('/api/tokenunlocks/upcoming')
            .then(res => res.json())
            .then(setUnlocks)
            .catch(console.error);
    }, []);

    const formatMoney = (n: number) => `$${(n / 1e6).toFixed(1)}M`;

    return (
        <div className="w-full h-full bg-[#141414] border border-white/10 rounded-3xl p-5 flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold text-xl">
                        🔓
                    </div>
                    <div>
                        <h3 className="text-white font-medium text-lg leading-tight">Unlocks</h3>
                        <p className="text-white/40 text-xs font-mono">Cliff Vesting</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 space-y-2">
                {unlocks.map((u, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">{u.token}</div>
                            <div>
                                <div className="text-white text-xs font-bold">{u.date}</div>
                            </div>
                        </div>
                        <span className="text-white/80 font-mono text-sm">{formatMoney(u.value)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
