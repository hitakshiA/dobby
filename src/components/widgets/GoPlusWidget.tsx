import React, { useState } from 'react';

export const GoPlusWidget: React.FC = () => {
    const [contract, setContract] = useState('');
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const checkToken = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!contract) return;
        setLoading(true);
        setResult(null);
        try {
            const res = await fetch(`/api/goplus/scan?contract=${contract}&chainId=1`);
            const data = await res.json();
            setResult(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full bg-[#0d1216] border border-cyan-500/20 rounded-3xl p-5 flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center font-bold text-xl">
                        🛡️
                    </div>
                    <div>
                        <h3 className="text-white font-medium text-lg leading-tight">GoPlus</h3>
                        <p className="text-cyan-500/60 text-xs font-mono">Token Scanner</p>
                    </div>
                </div>
            </div>

            {!result ? (
                <form onSubmit={checkToken} className="flex-1 flex flex-col justify-center gap-2">
                    <input
                        type="text"
                        placeholder="0x..."
                        value={contract}
                        onChange={(e) => setContract(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 font-bold py-2 rounded-xl transition-colors text-sm"
                    >
                        {loading ? 'Scanning...' : 'Scan Token'}
                    </button>
                    <p className="text-[10px] text-white/30 text-center mt-1">Supports Ethereum Mainnet</p>
                </form>
            ) : (
                <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                        <span className="text-white/60 text-xs">Honeypot</span>
                        <span className={result.is_honeypot ? "text-red-400 font-bold text-xs" : "text-green-400 font-bold text-xs"}>
                            {result.is_honeypot ? "YES" : "NO"}
                        </span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                        <span className="text-white/60 text-xs">Buy Tax</span>
                        <span className="text-white font-mono text-xs">
                            {(result.buy_tax * 100).toFixed(1)}%
                        </span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                        <span className="text-white/60 text-xs">Sell Tax</span>
                        <span className="text-white font-mono text-xs">
                            {(result.sell_tax * 100).toFixed(1)}%
                        </span>
                    </div>
                    <button onClick={() => { setContract(''); setResult(null); }} className="w-full mt-2 text-xs text-white/40 hover:text-white">
                        ← Scan Another
                    </button>
                </div>
            )}
        </div>
    );
};
