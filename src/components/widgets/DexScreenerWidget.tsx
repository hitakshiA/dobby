'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================
// DEXSCREENER WIDGET - v4 WITH TABS
// Interactive: Chain selector, Sort options
// ============================================

interface TrendingPair {
    baseToken: { symbol: string; name: string };
    quoteToken: { symbol: string };
    displayToken?: { symbol: string };
    priceUsd: string;
    priceChange: { h24?: number; h1?: number; m5?: number };
    volume: { h24?: number };
    liquidity: { usd: number };
    dexId: string;
    chainId: string;
    url?: string;
}

const THEME = {
    fontMono: '"The Good Monolith", monospace',
    neon: '#00ff41',
    text: '#fff',
    textDim: 'rgba(255,255,255,0.5)',
    red: '#ef4444'
};

const CHAINS = [
    { id: 'solana', label: 'SOL', token: 'So11111111111111111111111111111111111111112' },
    { id: 'ethereum', label: 'ETH', token: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' },
    { id: 'base', label: 'BASE', token: '0x4200000000000000000000000000000000000006' },
];

const SORT_OPTIONS = [
    { id: 'volume', label: 'VOL' },
    { id: 'change', label: '24H%' },
    { id: 'liquidity', label: 'LIQ' },
];

const getSize = (w: number, h: number): 'small' | 'medium' | 'large' => {
    const area = w * h;
    if (area >= 50000) return 'large';
    if (area >= 25000) return 'medium';
    return 'small';
};

const formatNum = (n: number): string => {
    if (!n) return '-';
    if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
    return n.toFixed(0);
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
            padding: '4px 8px',
            fontSize: '9px',
            fontFamily: THEME.fontMono,
            background: active ? THEME.neon : 'transparent',
            color: active ? '#000' : THEME.textDim,
            border: `1px solid ${active ? THEME.neon : 'rgba(255,255,255,0.2)'}`,
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontWeight: active ? 'bold' : 'normal'
        }}
    >
        {children}
    </button>
);

export function DexScreenerWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [pairs, setPairs] = useState<TrendingPair[]>([]);
    const [loading, setLoading] = useState(true);
    const [chain, setChain] = useState('solana');
    const [sortBy, setSortBy] = useState('volume');
    const size = getSize(width, height);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const chainConfig = CHAINS.find(c => c.id === chain);
                const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${chainConfig?.token}`);
                if (!response.ok) throw new Error('API Error');
                const data = await response.json();

                let processed = (data.pairs || [])
                    .filter((p: any) => p.priceUsd && p.volume?.h24 > 1000)
                    .map((p: any) => ({
                        ...p,
                        displayToken: p.baseToken.symbol === 'SOL' || p.baseToken.symbol === 'WETH' || p.baseToken.symbol === 'WBNB'
                            ? p.quoteToken : p.baseToken
                    }));

                // Sort based on selection
                if (sortBy === 'volume') {
                    processed.sort((a: any, b: any) => (b.volume?.h24 || 0) - (a.volume?.h24 || 0));
                } else if (sortBy === 'change') {
                    processed.sort((a: any, b: any) => Math.abs(b.priceChange?.h24 || 0) - Math.abs(a.priceChange?.h24 || 0));
                } else if (sortBy === 'liquidity') {
                    processed.sort((a: any, b: any) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0));
                }

                setPairs(processed.slice(0, 15));
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, [chain, sortBy]);

    // Calculate rows
    const rowHeight = size === 'small' ? 26 : 34;
    const headerHeight = size === 'small' ? 24 : size === 'medium' ? 50 : 70;
    const availableHeight = height - headerHeight - 24;
    const maxRows = Math.max(2, Math.floor(availableHeight / rowHeight));
    const displayPairs = pairs.slice(0, maxRows);

    // ==================== SMALL ====================
    if (size === 'small') {
        return (
            <div style={{ ...baseStyle, gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '9px', color: THEME.neon }}>DEX</span>
                    <div style={{ display: 'flex', gap: '2px' }}>
                        {CHAINS.slice(0, 2).map(c => (
                            <TabButton key={c.id} active={chain === c.id} onClick={() => setChain(c.id)}>
                                {c.label}
                            </TabButton>
                        ))}
                    </div>
                </div>
                {loading ? (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '9px', color: THEME.textDim }}>...</span>
                    </div>
                ) : (
                    displayPairs.map((p, i) => (
                        <div
                            key={i}
                            onClick={() => p.url && window.open(p.url, '_blank')}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '11px',
                                cursor: p.url ? 'pointer' : 'default',
                                padding: '2px 0',
                                borderRadius: '4px',
                                transition: 'background 0.15s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            <span style={{ fontWeight: 'bold', maxWidth: '50px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {p.displayToken?.symbol || p.baseToken.symbol}
                            </span>
                            <span style={{ color: (p.priceChange?.h24 || 0) >= 0 ? THEME.neon : THEME.red, fontSize: '10px' }}>
                                {(p.priceChange?.h24 || 0) >= 0 ? '+' : ''}{(p.priceChange?.h24 || 0).toFixed(0)}%
                            </span>
                        </div>
                    ))
                )}
            </div>
        );
    }

    // ==================== MEDIUM ====================
    if (size === 'medium') {
        return (
            <div style={{ ...baseStyle }}>
                <div style={{ marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold' }}>DEX TRENDING</span>
                        <div style={{ display: 'flex', gap: '3px' }}>
                            {CHAINS.map(c => (
                                <TabButton key={c.id} active={chain === c.id} onClick={() => setChain(c.id)}>
                                    {c.label}
                                </TabButton>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '3px' }}>
                        {SORT_OPTIONS.map(s => (
                            <TabButton key={s.id} active={sortBy === s.id} onClick={() => setSortBy(s.id)}>
                                {s.label}
                            </TabButton>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '10px', color: THEME.textDim }}>Loading...</span>
                    </div>
                ) : (
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                        {displayPairs.map((p, i) => (
                            <div
                                key={i}
                                onClick={() => p.url && window.open(p.url, '_blank')}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '5px 4px',
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    cursor: p.url ? 'pointer' : 'default',
                                    borderRadius: '4px',
                                    transition: 'background 0.15s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,255,65,0.08)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div style={{
                                        width: '3px', height: '20px', borderRadius: '2px',
                                        background: (p.priceChange?.h24 || 0) >= 0 ? THEME.neon : THEME.red
                                    }} />
                                    <div>
                                        <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{p.displayToken?.symbol || p.baseToken.symbol}</div>
                                        <div style={{ fontSize: '8px', color: THEME.textDim }}>{p.dexId}</div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: (p.priceChange?.h24 || 0) >= 0 ? THEME.neon : THEME.red }}>
                                        {(p.priceChange?.h24 || 0) >= 0 ? '+' : ''}{(p.priceChange?.h24 || 0).toFixed(1)}%
                                    </div>
                                    <div style={{ fontSize: '9px', color: THEME.textDim }}>${formatNum(p.volume?.h24 || 0)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // ==================== LARGE ====================
    return (
        <div style={{ ...baseStyle }}>
            {/* Header with Controls */}
            <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                        <div style={{ fontSize: '13px', fontWeight: 'bold' }}>DEXSCREENER</div>
                        <div style={{ fontSize: '9px', color: THEME.textDim }}>Live Trending Pairs</div>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {CHAINS.map(c => (
                            <TabButton key={c.id} active={chain === c.id} onClick={() => setChain(c.id)}>
                                {c.label}
                            </TabButton>
                        ))}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <span style={{ fontSize: '8px', color: THEME.textDim, marginRight: '4px' }}>SORT:</span>
                    {SORT_OPTIONS.map(s => (
                        <TabButton key={s.id} active={sortBy === s.id} onClick={() => setSortBy(s.id)}>
                            {s.label}
                        </TabButton>
                    ))}
                </div>
            </div>

            {/* Table Header */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1.2fr 1fr 1fr',
                gap: '8px',
                fontSize: '8px',
                color: THEME.textDim,
                paddingBottom: '6px',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <span>TOKEN</span>
                <span style={{ textAlign: 'right' }}>PRICE</span>
                <span style={{ textAlign: 'right' }}>24H</span>
                <span style={{ textAlign: 'right' }}>VOLUME</span>
            </div>

            {/* Rows */}
            {loading ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{ fontSize: '10px', color: THEME.textDim }}
                    >Loading {CHAINS.find(c => c.id === chain)?.label}...</motion.span>
                </div>
            ) : (
                <div style={{ flex: 1, overflow: 'hidden' }}>
                    {displayPairs.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.02 }}
                            onClick={() => p.url && window.open(p.url, '_blank')}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,255,65,0.08)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '2fr 1.2fr 1fr 1fr',
                                gap: '8px',
                                padding: '6px 4px',
                                borderBottom: '1px solid rgba(255,255,255,0.03)',
                                alignItems: 'center',
                                cursor: p.url ? 'pointer' : 'default',
                                borderRadius: '4px',
                                transition: 'background 0.15s'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <div style={{
                                    width: '3px', height: '20px', borderRadius: '2px',
                                    background: (p.priceChange?.h24 || 0) >= 0 ? THEME.neon : THEME.red
                                }} />
                                <div>
                                    <div style={{ fontSize: '11px', fontWeight: 'bold' }}>{p.displayToken?.symbol || p.baseToken.symbol}</div>
                                    <div style={{ fontSize: '7px', color: THEME.textDim }}>{p.dexId}</div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right', fontSize: '10px' }}>
                                ${parseFloat(p.priceUsd) < 0.01
                                    ? parseFloat(p.priceUsd).toExponential(1)
                                    : parseFloat(p.priceUsd).toFixed(4)
                                }
                            </div>
                            <div style={{
                                textAlign: 'right',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                color: (p.priceChange?.h24 || 0) >= 0 ? THEME.neon : THEME.red
                            }}>
                                {(p.priceChange?.h24 || 0) >= 0 ? '+' : ''}{(p.priceChange?.h24 || 0).toFixed(1)}%
                            </div>
                            <div style={{ textAlign: 'right', fontSize: '9px', color: THEME.textDim }}>
                                ${formatNum(p.volume?.h24 || 0)}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}

export const DexScreenerIcon = (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
        <circle cx="19" cy="9" r="2" />
    </svg>
);

export default DexScreenerWidget;
