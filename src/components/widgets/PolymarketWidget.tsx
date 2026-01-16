'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================
// POLYMARKET PREDICTION MARKETS WIDGET
// API: Polymarket Gamma API (Free)
// Sizes: 2x2 and 4x4 ONLY
// Features: Sortable columns, competitive odds
// ============================================

interface PredictionEvent {
    id: string;
    title: string;
    slug: string;
    volume: number;
    liquidity: number;
    endDate: string;
    createdAt: string;
    markets?: {
        question: string;
        outcomePrices: string;
        volume: string;
    }[];
}

const THEME = {
    fontMono: '"The Good Monolith", monospace',
    neon: '#00ff41',
    text: '#fff',
    textDim: 'rgba(255,255,255,0.5)',
    purple: '#a855f7',
    blue: '#3b82f6',
    red: '#ef4444'
};

const SORT_OPTIONS = [
    { id: 'volume', label: 'VOL' },
    { id: 'newest', label: 'NEW' },
    { id: 'liquidity', label: 'LIQ' },
];

const formatVolume = (v: number): string => {
    if (v >= 1e6) return '$' + (v / 1e6).toFixed(1) + 'M';
    if (v >= 1e3) return '$' + (v / 1e3).toFixed(0) + 'K';
    return '$' + v.toFixed(0);
};

const getOdds = (pricesStr: string): { yes: number; no: number } => {
    try {
        const prices = JSON.parse(pricesStr);
        return { yes: parseFloat(prices[0]) * 100, no: parseFloat(prices[1]) * 100 };
    } catch {
        return { yes: 50, no: 50 };
    }
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
            background: active ? THEME.purple : 'transparent',
            color: active ? '#fff' : THEME.textDim,
            border: `1px solid ${active ? THEME.purple : 'rgba(255,255,255,0.2)'}`,
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontWeight: active ? 'bold' : 'normal'
        }}
    >
        {children}
    </button>
);

export function PolymarketWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [events, setEvents] = useState<PredictionEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('volume');

    // Size detection
    const isLarge = width > 500 && height > 500; // 4x4 mode

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch more to allow client-side sorting/filtering
                const response = await fetch('/api/polymarket');
                if (!response.ok) throw new Error('API Error');
                const data = await response.json();

                let processed = [...data];

                // Sort based on selection
                if (sortBy === 'volume') {
                    processed.sort((a, b) => b.volume - a.volume);
                } else if (sortBy === 'liquidity') {
                    processed.sort((a, b) => b.liquidity - a.liquidity);
                } else if (sortBy === 'newest') {
                    processed.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                }

                setEvents(processed); // Show all loaded events
            } catch (e) {
                console.error('Polymarket error:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [sortBy]); // Re-fetch/sort when sortBy changes

    const openPolymarket = (slug: string) => {
        window.open(`https://polymarket.com/event/${slug}`, '_blank');
    };

    return (
        <div style={{ ...baseStyle }}>
            {/* Scrollbar styling */}
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
            {/* Header */}
            <div style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div>
                        <div style={{ fontSize: isLarge ? '16px' : '12px', fontWeight: 'bold', color: THEME.purple }}>POLYMARKET</div>
                        <div style={{ fontSize: isLarge ? '11px' : '9px', color: THEME.textDim }}>Prediction Markets</div>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {SORT_OPTIONS.map(s => (
                            <TabButton key={s.id} active={sortBy === s.id} onClick={() => setSortBy(s.id)}>
                                {s.label}
                            </TabButton>
                        ))}
                    </div>
                </div>
            </div>

            {/* Events List */}
            {loading ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ fontSize: '9px', color: THEME.textDim }}
                    >
                        LOADING MARKETS...
                    </motion.div>
                </div>
            ) : events.length === 0 ? (
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
                        gap: '4px',
                        paddingRight: '2px' // Prevent scrollbar overlap
                    }}
                >
                    {events.map((event, i) => {
                        const odds = event.markets?.[0] ? getOdds(event.markets[0].outcomePrices) : { yes: 50, no: 50 };

                        return (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.03 }} // Faster stagger
                                onClick={() => openPolymarket(event.slug)}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(168,85,247,0.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                style={{
                                    padding: '6px 8px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    transition: 'background 0.15s',
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '4px',
                                    flexShrink: 0 // Prevent shrinking
                                }}
                            >
                                {/* Title Row */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                                    <div style={{
                                        fontSize: isLarge ? '12px' : '10px',
                                        fontWeight: 'bold',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        flex: 1
                                    }}>
                                        {event.title}
                                    </div>
                                    <div style={{ fontSize: '9px', color: THEME.textDim, whiteSpace: 'nowrap' }}>
                                        {formatVolume(event.volume)}
                                    </div>
                                </div>

                                {/* Odds Bar */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                        <div style={{
                                            width: `${odds.yes}%`,
                                            height: '100%',
                                            background: `linear-gradient(90deg, ${THEME.neon}, ${THEME.blue})`,
                                            borderRadius: '2px'
                                        }} />
                                    </div>
                                    <div style={{ display: 'flex', gap: '4px', minWidth: '40px', justifyContent: 'flex-end' }}>
                                        <span style={{ fontSize: '9px', color: THEME.neon, fontWeight: 'bold' }}>{odds.yes.toFixed(0)}%</span>
                                        <span style={{ fontSize: '8px', color: THEME.textDim }}>YES</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
