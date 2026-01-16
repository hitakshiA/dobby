import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Enforce 4x4
const WIDGET_SIZE = '4x4';

interface Proposal {
    id: string;
    title: string;
    body: string;
    end: number;
    state: string;
    space: {
        id: string;
        name: string;
        avatar: string;
    };
}

export const GovernanceWidget: React.FC = () => {
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/snapshot/proposals');
            const data = await res.json();
            if (data.proposals) {
                setProposals(data.proposals);
            }
        } catch (e) {
            console.error('Governance Widget Error:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 300000); // 5m refresh
        return () => clearInterval(interval);
    }, []);

    const getTimeLeft = (end: number) => {
        const now = Math.floor(Date.now() / 1000);
        const diff = end - now;
        if (diff < 0) return 'Ended';
        const days = Math.floor(diff / 86400);
        const hours = Math.floor((diff % 86400) / 3600);
        if (days > 0) return `${days}d ${hours}h left`;
        return `${hours}h left`;
    };

    // Helper to extract IPFS avatar url
    const getAvatar = (url: string) => {
        if (!url) return '';
        if (url.startsWith('ipfs://')) {
            return `https://ipfs.io/ipfs/${url.replace('ipfs://', '')}`;
        }
        return url;
    };

    return (
        <div className="w-full h-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col relative overflow-hidden group">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 5v10l-8 5-8-5V7l8-5z" /><path d="M12 22V12" /><path d="M20 7l-8 5-8-5" /><path d="M12 7v5" /></svg>
                    </div>
                    <div>
                        <h3 className="text-white font-medium text-lg leading-tight">Governance</h3>
                        <p className="text-white/40 text-xs font-mono">Snapshot • Active Proposals</p>
                    </div>
                </div>
                {loading && <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />}
            </div>

            <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
                {proposals.map(p => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                {p.space.avatar && (
                                    <img
                                        src={getAvatar(p.space.avatar)}
                                        alt={p.space.name}
                                        className="w-8 h-8 rounded-full bg-white/10"
                                        onError={(e) => e.currentTarget.style.display = 'none'}
                                    />
                                )}
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold text-white/60 uppercase tracking-wider">{p.space.name}</span>
                                        <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full font-mono">ACTIVE</span>
                                    </div>
                                    <h4 className="text-white text-sm font-medium leading-snug line-clamp-2">{p.title}</h4>
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <span className="text-xs text-white/40 font-mono block mb-1">Ends in</span>
                                <span className="text-xs text-white font-mono">{getTimeLeft(p.end)}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/30">
                <span>Displaying top 6 active</span>
                <span>Powered by Snapshot</span>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                }
            `}</style>
        </div>
    );
};
