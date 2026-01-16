import React, { useEffect, useState } from 'react';

interface Quote {
    outAmount: string;
    priceImpactPct: string;
    routePlan: any[];
}

export const JupiterWidget: React.FC = () => {
    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/jupiter/quote');
            const data = await res.json();
            if (data.outAmount) {
                setQuote(data);
            }
        } catch (e) {
            console.error('Jupiter Widget Error:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000); // 30s refresh
        return () => clearInterval(interval);
    }, []);

    const formatUSDC = (amount: string) => {
        const val = parseInt(amount) / 1000000; // USDC is 6 decimals
        return `$${val.toFixed(2)}`;
    };

    return (
        <div className="w-full h-full bg-gradient-to-br from-[#151515] to-[#0a0a0a] border border-[#232323] rounded-3xl p-5 flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#c7f284] text-black flex items-center justify-center font-bold text-lg">
                        J
                    </div>
                    <div>
                        <h3 className="text-white font-medium text-lg leading-tight">Jupiter</h3>
                        <p className="text-[#c7f284] text-xs font-mono">Aggregation</p>
                    </div>
                </div>
                {loading && <div className="w-2 h-2 rounded-full bg-[#c7f284] animate-pulse" />}
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-3">
                <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-[8px] font-bold text-white">SOL</div>
                        <span className="text-white font-medium">1.00</span>
                    </div>
                    <span className="text-white/40 text-xs">Input</span>
                </div>

                <div className="flex justify-center text-white/20">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>
                </div>

                <div className="flex items-center justify-between bg-[#c7f284]/10 p-3 rounded-xl border border-[#c7f284]/20">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[8px] font-bold text-white">USDC</div>
                        <span className="text-[#c7f284] font-bold text-lg">
                            {quote ? formatUSDC(quote.outAmount) : '---'}
                        </span>
                    </div>
                    <span className="text-[#c7f284]/60 text-xs">Best Price</span>
                </div>
            </div>

            <div className="mt-auto pt-3 flex justify-between text-[10px] text-white/30 font-mono">
                <span>Impact: {quote ? `${parseFloat(quote.priceImpactPct) * 100 < 0.01 ? '<0.01' : (parseFloat(quote.priceImpactPct) * 100).toFixed(2)}%` : '--'}</span>
                <span>Route: Best of {quote ? quote.routePlan.length : '-'}</span>
            </div>
        </div>
    );
};
