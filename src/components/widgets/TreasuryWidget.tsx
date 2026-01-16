import React, { useEffect, useState } from 'react';

interface Treasury {
    name: string;
    value: number;
    asset: string;
}

export const TreasuryWidget: React.FC = () => {
    const [data, setData] = useState<Treasury[]>([]);

    useEffect(() => {
        fetch('/api/defillama/treasuries')
            .then(res => res.json())
            .then(setData)
            .catch(console.error);
    }, []);

    const formatMoney = (n: number) => {
        if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
        return `$${(n / 1e6).toFixed(0)}M`;
    };

    return (
        <div className="w-full h-full bg-[#0f110f] border border-emerald-500/20 rounded-3xl p-5 flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-xl">
                        🏛️
                    </div>
                    <div>
                        <h3 className="text-white font-medium text-lg leading-tight">Treasuries</h3>
                        <p className="text-emerald-500/60 text-xs font-mono">DAO Holdings</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 space-y-2">
                {data.map((t, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-white text-sm font-medium truncate max-w-[100px]">{t.name}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-white/40">{t.asset}</span>
                            <span className="text-emerald-400 font-bold font-mono text-sm">{formatMoney(t.value)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
