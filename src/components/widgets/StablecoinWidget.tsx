import React, { useEffect, useState } from 'react';

interface Stable {
    symbol: string;
    name: string;
    mcap: number;
    price: number;
}

export const StablecoinWidget: React.FC = () => {
    const [stables, setStables] = useState<Stable[]>([]);

    useEffect(() => {
        fetch('/api/defillama/stablecoins')
            .then(res => res.json())
            .then(setStables)
            .catch(console.error);
    }, []);

    const formatMoney = (n: number) => `$${(n / 1e9).toFixed(1)}B`;

    return (
        <div className="w-full h-full bg-[#0a1412] border border-teal-500/20 rounded-3xl p-5 flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-600/20 text-teal-400 flex items-center justify-center font-bold text-xl">
                        💵
                    </div>
                    <div>
                        <h3 className="text-white font-medium text-lg leading-tight">Stablecoins</h3>
                        <p className="text-teal-500/60 text-xs font-mono">Market Cap</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 space-y-2">
                {stables.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-2">
                            <span className="text-teal-400 font-bold text-sm">{s.symbol}</span>
                            <span className="text-white/40 text-[10px]">{s.price?.toFixed(3)}</span>
                        </div>
                        <span className="text-white font-mono text-sm">{formatMoney(s.mcap)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
