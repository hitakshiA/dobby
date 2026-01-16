import React, { useEffect, useState } from 'react';

interface Collection {
    name: string;
    floor: number;
    change: number;
}

export const BlueChipWidget: React.FC = () => {
    const [data, setData] = useState<Collection[]>([]);

    useEffect(() => {
        fetch('/api/nft/bluechips')
            .then(res => res.json())
            .then(setData)
            .catch(console.error);
    }, []);

    return (
        <div className="w-full h-full bg-[#0d0d14] border border-blue-400/20 rounded-3xl p-5 flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xl">
                        💎
                    </div>
                    <div>
                        <h3 className="text-white font-medium text-lg leading-tight">Blue Chips</h3>
                        <p className="text-blue-500/60 text-xs font-mono">ETH Floors</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 space-y-2">
                {data.map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-white text-sm font-medium">{c.name}</span>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center text-xs">
                                <span className={c.change >= 0 ? "text-green-400" : "text-red-400"}>
                                    {c.change > 0 ? '+' : ''}{c.change}%
                                </span>
                            </div>
                            <span className="text-white font-bold font-mono text-sm">Ξ{c.floor}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
