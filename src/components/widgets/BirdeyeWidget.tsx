import React, { useEffect, useState } from 'react';

interface Token {
    symbol: string;
    rank: number;
    price: number;
    liquidity: number;
}

export const BirdeyeWidget: React.FC = () => {
    const [tokens, setTokens] = useState<Token[]>([]);

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const res = await fetch('/api/birdeye/trending');
                const data = await res.json();
                if (Array.isArray(data)) setTokens(data);
            } catch (e) { console.error(e); }
        };
        fetchTokens();
    }, []);

    return (
        <div className="w-full h-full bg-[#090b14] border border-blue-500/20 rounded-3xl p-5 flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-500 flex items-center justify-center font-bold text-xl">
                        👁️
                    </div>
                    <div>
                        <h3 className="text-white font-medium text-lg leading-tight">Birdeye</h3>
                        <p className="text-blue-500/60 text-xs font-mono">Degen Radar</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 space-y-2">
                {tokens.slice(0, 3).map((t, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-3">
                            <span className="text-blue-500 font-mono text-xs">#{t.rank}</span>
                            <span className="text-white font-bold text-sm">{t.symbol}</span>
                        </div>
                        <span className="text-white/60 font-mono text-xs">${t.price < 0.01 ? t.price.toExponential(2) : t.price.toFixed(2)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
