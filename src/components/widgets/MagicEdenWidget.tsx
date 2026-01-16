import React, { useEffect, useState } from 'react';

interface Collection {
    symbol: string;
    floorPrice: number;
}

export const MagicEdenWidget: React.FC = () => {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/magiceden/collections');
            const data = await res.json();
            setCollections(data);
        } catch (e) {
            console.error('ME Widget Error:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 600000); // 10m refresh
        return () => clearInterval(interval);
    }, []);

    const formatName = (s: string) => s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    return (
        <div className="w-full h-full bg-[#120c18] border border-pink-500/20 rounded-3xl p-5 flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-600/20 text-pink-500 flex items-center justify-center font-bold text-xl">
                        M
                    </div>
                    <div>
                        <h3 className="text-white font-medium text-lg leading-tight">Magic Eden</h3>
                        <p className="text-pink-500/60 text-xs font-mono">NFT Floor</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 space-y-2">
                {collections.map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                        <span className="text-white text-sm font-medium">{formatName(c.symbol)}</span>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-purple-500 flex items-center justify-center text-[6px] text-white">S</div>
                            <span className="text-white font-bold">{c.floorPrice.toFixed(1)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
