import React, { useEffect, useState } from 'react';

interface Dominance {
    btc: number;
    eth: number;
    sol: number;
    usdt: number;
    others: number;
}

export const DominanceWidget: React.FC = () => {
    const [stats, setStats] = useState<Dominance | null>(null);

    useEffect(() => {
        fetch('/api/coingecko/dominance')
            .then(res => res.json())
            .then(setStats)
            .catch(console.error);
    }, []);

    const Bar = ({ label, value, color }: { label: string, value: number, color: string }) => (
        <div className="mb-2">
            <div className="flex justify-between text-xs mb-1">
                <span className="text-white font-bold">{label}</span>
                <span className="text-white/60 font-mono">{value.toFixed(1)}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
            </div>
        </div>
    );

    return (
        <div className="w-full h-full bg-[#161618] border border-white/10 rounded-3xl p-5 flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xl">
                        📊
                    </div>
                    <div>
                        <h3 className="text-white font-medium text-lg leading-tight">Dominance</h3>
                        <p className="text-indigo-400/60 text-xs font-mono">Market Share</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center">
                {stats ? (
                    <>
                        <Bar label="Bitcoin" value={stats.btc} color="bg-orange-500" />
                        <Bar label="Ethereum" value={stats.eth} color="bg-blue-500" />
                        <Bar label="Solana" value={stats.sol} color="bg-green-500" />
                        <Bar label="Stablecoins" value={stats.usdt} color="bg-teal-500" />
                    </>
                ) : (
                    <div className="text-white/20 text-center text-xs">Loading...</div>
                )}
            </div>
        </div>
    );
};
