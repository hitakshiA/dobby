'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================
// TOP YIELDS LISTOR (DeFiLlama)
// API: DeFiLlama (Free via Proxy)
// Sizes: 2x2 and 4x4 ONLY
// Features: Top APY for Stable, ETH, SOL
// ============================================

interface Pool {
    project: string;
    symbol: string;
    chain: string;
    apy: number;
    tvl: number;
    url: string;
}

const THEME = {
    fontMono: '"The Good Monolith", monospace',
    neon: '#00ff41',
    text: '#fff',
    textDim: 'rgba(255,255,255,0.5)',
    purple: '#a855f7',
    blue: '#3b82f6',
    red: '#ef4444',
    green: '#10b981',
    yellow: '#eab308'
};

const TAB_OPTIONS = [
    { id: 'stable', label: 'STABLE' },
    { id: 'eth', label: 'ETH' },
    { id: 'sol', label: 'SOL' },
];

const formatMoney = (n: number) => {
    if (n >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B';
    if (n >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M';
    return '$' + (n / 1000).toFixed(0) + 'K';
};

const baseStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: THEME.fontMono,
    color: THEME.text,
    padding: '12px',
    boxSizing: 'border-box',
    overflow: 'hidden'
};

const TabButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
        onClick={onClick}
        style={{
            padding: '2px 6px',
            fontSize: '9px',
            fontFamily: THEME.fontMono,
            background: active ? THEME.green : 'transparent',
            color: active ? '#000' : THEME.textDim,
            border: `1px solid ${active ? THEME.green : 'rgba(255,255,255,0.2)'}`,
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontWeight: active ? 'bold' : 'normal'
        }}
    >
        {children}
    </button>
);

export function YieldsWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [data, setData] = useState<Record<string, Pool[]> | null>(null);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('stable');

    // Size detection
    const isLarge = width > 500 && height > 500; // 4x4 mode

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/defillama/yields');
                if (!response.ok) throw new Error('API Error');
                const result = await response.json();
                setData(result);
            } catch (e) {
                console.error('Yields error:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 300000); // 5 min refresh
        return () => clearInterval(interval);
    }, []);

    const pools = data ? data[tab] || [] : [];
    const displayCount = isLarge ? 8 : 4;

    const openPool = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <div style={{ ...baseStyle }}>
            {/* Scrollbar styling */}
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* Header */}
            <div style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div>
                        <div style={{ fontSize: isLarge ? '16px' : '12px', fontWeight: 'bold', color: THEME.green }}>TOP YIELDS</div>
                        <div style={{ fontSize: isLarge ? '11px' : '9px', color: THEME.textDim }}>DefiLlama</div>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {TAB_OPTIONS.map(t => (
                            <TabButton key={t.id} active={tab === t.id} onClick={() => setTab(t.id)}>
                                {t.label}
                            </TabButton>
                        ))}
                    </div>
                </div>
            </div>

            {/* List */}
            {loading ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ fontSize: '9px', color: THEME.textDim }}
                    >
                        FETCHING APY...
                    </motion.div>
                </div>
            ) : pools.length === 0 ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '9px', color: THEME.red }}>NO DATA</div>
                </div>
            ) : (
                <div
                    className="no-scrollbar"
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                    }}
                >
                    {pools.map((pool, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.03 }}
                            onClick={() => openPool(pool.url)}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(16,185,129,0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            style={{
                                padding: '6px 8px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'background 0.15s',
                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexShrink: 0
                            }}
                        >
                            <div style={{ flex: 1, overflow: 'hidden' }}>
                                <div style={{
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {pool.project}
                                </div>
                                <div style={{ display: 'flex', gap: '6px', marginTop: '2px' }}>
                                    <span style={{ fontSize: '9px', color: THEME.textDim }}>{pool.chain}</span>
                                    <span style={{ fontSize: '9px', color: THEME.textDim }}>{pool.symbol}</span>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '12px', color: THEME.green, fontFamily: THEME.fontMono, fontWeight: 'bold' }}>
                                    {pool.apy.toFixed(2)}%
                                </div>
                                <div style={{ fontSize: '8px', color: THEME.textDim }}>
                                    TVL: {formatMoney(pool.tvl)}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
