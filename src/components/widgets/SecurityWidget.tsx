import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Enforce 4x4
const WIDGET_SIZE = '4x4';

interface Risk {
    name: string;
    value: string;
    level: 'good' | 'warn' | 'danger';
    description: string;
}

interface Report {
    score: number;
    riskScore: number;
    risks: Risk[];
    verification?: {
        verified: boolean;
    };
}

export const SecurityWidget: React.FC = () => {
    const [report, setReport] = useState<Report | null>(null);
    const [loading, setLoading] = useState(true);
    const [token] = useState('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'); // Bonk

    const fetchData = async () => {
        try {
            const res = await fetch(`/api/rugcheck/report?token=${token}`);
            const data = await res.json();
            setReport(data);
        } catch (e) {
            console.error('Security Widget Error:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 600000); // 10m refresh
        return () => clearInterval(interval);
    }, []);

    const getRiskColor = (level: string) => {
        switch (level) {
            case 'good': return 'text-green-400 bg-green-500/10 border-green-500/20';
            case 'warn': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
            case 'danger': return 'text-red-400 bg-red-500/10 border-red-500/20';
            default: return 'text-white/60 bg-white/5 border-white/10';
        }
    };

    const getScoreColor = (score: number) => {
        if (score < 1000) return 'text-green-400';
        if (score < 5000) return 'text-yellow-400';
        return 'text-red-500';
    };

    const getScoreLabel = (score: number) => {
        if (score < 1000) return 'GOOD';
        if (score < 5000) return 'WARN';
        return 'DANGER';
    };

    return (
        <div className="w-full h-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col relative overflow-hidden group">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    </div>
                    <div>
                        <h3 className="text-white font-medium text-lg leading-tight">Security Audit</h3>
                        <p className="text-white/40 text-xs font-mono">RugCheck • Bonk (Demo)</p>
                    </div>
                </div>
                {loading && <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
            </div>

            {report ? (
                <div className="flex-1 flex flex-col gap-6">
                    {/* Score Gauge */}
                    <div className="flex items-center justify-between bg-white/5 rounded-2xl p-4 border border-white/5">
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                                <circle
                                    cx="48" cy="48" r="40"
                                    stroke="currentColor" strokeWidth="8" fill="transparent"
                                    strokeDasharray={251.2}
                                    strokeDashoffset={251.2 * (1 - Math.min(report.riskScore / 10000, 1))} // Normalize somewhat arbitrarily
                                    className={getScoreColor(report.riskScore)}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className={`text-xl font-bold ${getScoreColor(report.riskScore)}`}>{report.riskScore}</span>
                                <span className="text-[10px] text-white/40 uppercase">Risk</span>
                            </div>
                        </div>
                        <div className="flex-1 pl-6">
                            <div className="text-3xl font-bold text-white mb-1">{getScoreLabel(report.riskScore)}</div>
                            <div className="text-sm text-white/50">
                                {report.verification?.verified ? 'Automated Analysis Verified' : 'Unverified Token'}
                            </div>
                        </div>
                    </div>

                    {/* Risk List */}
                    <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
                        <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Audit Findings</h4>
                        {report.risks.map((risk, i) => (
                            <div
                                key={i}
                                className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${getRiskColor(risk.level)}`}
                            >
                                <span className="font-medium text-sm">{risk.name}</span>
                                <span className="text-xs opacity-80 font-mono">{risk.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center text-white/30">
                    Initializing Scanner...
                </div>
            )}

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
