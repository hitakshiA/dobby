'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================
// GECKOTERMINAL NEW TOKEN SCANNER
// API: GeckoTerminal (Free via Proxy)
// Sizes: 2x2 and 4x4 ONLY
// Features: LIVE new pool feed, Multi-chain
// ============================================

interface Pool {
    id: string;
    attributes: {
        name: string;
        base_token_price_usd: string;
        pool_created_at: string;
        fdv_usd: string;
        volume_usd: { h24: string };
        reserve_in_usd: string;
    };
}

const THEME = {
    fontMono: '"The Good Monolith", monospace',
    neon: '#00ff41',
    text: '#fff',
    textDim: 'rgba(255,255,255,0.5)',
    purple: '#a855f7',
    blue: '#3b82f6',
    red: '#ef4444',
    yellow: '#eab308'
};

const CHAINS = [
    { id: 'solana', label: 'SOL' },
    { id: 'eth', label: 'ETH' },
    { id: 'base', label: 'BASE' },
];

const formatTimeAgo = (dateStr: string) => {
    const diff = (new Date().getTime() - new Date(dateStr).getTime()) / 1000 / 60; // minutes
    if (diff < 60) return `${Math.floor(diff)}m ago`;
    const hours = diff / 60;
    if (hours < 24) return `${Math.floor(hours)}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
};

const formatPrice = (p: string) => {
    const num = parseFloat(p);
    if (!num) return '$0.00';
    if (num < 0.0001) return '$' + num.toExponential(2);
    if (num < 1) return '$' + num.toFixed(4);
    return '$' + num.toFixed(2);
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
            background: active ? THEME.yellow : 'transparent',
            color: active ? '#000' : THEME.textDim,
            border: `1px solid ${active ? THEME.yellow : 'rgba(255,255,255,0.2)'}`,
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontWeight: active ? 'bold' : 'normal'
        }}
    >
        {children}
    </button>
);

export function NewTokensWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [pools, setPools] = useState<Pool[]>([]);
    const [loading, setLoading] = useState(true);
    const [chain, setChain] = useState('solana');

    // Size detection
    const isLarge = width > 500 && height > 500; // 4x4 mode

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch from proxy
                const response = await fetch(`/api/geckoterminal?network=${chain}`);
                if (!response.ok) throw new Error('API Error');
                const data = await response.json();

                // GeckoTerminal returns data.data
                if (data && data.data) {
                    setPools(data.data);
                }
            } catch (e) {
                console.error('GeckoTerminal error:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 60000); // 1 min refresh
        return () => clearInterval(interval);
    }, [chain]);

    const openPool = (address: string) => {
        // Pool address is usually at the end of the id "network_slug_address" or just address
        // GeckoTerminal ID format: "network_address"
        const addressPart = address.split('_')[1] || address;
        window.open(`https://www.geckoterminal.com/${chain}/pools/${addressPart}`, '_blank');
    };

    // Determine items to show
    const displayCount = isLarge ? 8 : 4;

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
                        <div style={{ fontSize: isLarge ? '16px' : '12px', fontWeight: 'bold', color: THEME.yellow }}>NEW POOLS</div>
                        <div style={{ fontSize: isLarge ? '11px' : '9px', color: THEME.textDim }}>Scanner</div>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {CHAINS.map(c => (
                            <TabButton key={c.id} active={chain === c.id} onClick={() => setChain(c.id)}>
                                {c.label}
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
                        SCANNING CHAIN...
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
                            key={pool.id}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.03 }}
                            onClick={() => openPool(pool.id)}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(234,179,8,0.1)'}
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
                                    {pool.attributes.name}
                                </div>
                                <div style={{ display: 'flex', gap: '6px', marginTop: '2px' }}>
                                    <span style={{ fontSize: '9px', color: THEME.textDim }}>
                                        {formatTimeAgo(pool.attributes.pool_created_at)}
                                    </span>
                                    {isLarge && (
                                        <span style={{ fontSize: '9px', color: THEME.textDim }}>
                                            Vol: ${parseFloat(pool.attributes.volume_usd?.h24 || '0').toLocaleString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '11px', color: THEME.neon, fontFamily: THEME.fontMono }}>
                                    {formatPrice(pool.attributes.base_token_price_usd)}
                                </div>
                                <div style={{ fontSize: '8px', color: THEME.textDim }}>
                                    FDV: ${(parseFloat(pool.attributes.fdv_usd) / 1000).toFixed(1)}K
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
