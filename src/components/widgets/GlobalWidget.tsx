'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================
// GLOBAL METRICS WIDGET
// API: CoinPaprika (Free via Proxy)
// Sizes: 2x2 and 4x4 ONLY
// Features: Market Cap, Volume, BTC Dom
// ============================================

const THEME = {
    fontMono: '"The Good Monolith", monospace',
    neon: '#00ff41',
    text: '#fff',
    textDim: 'rgba(255,255,255,0.5)',
    blue: '#3b82f6',
    purple: '#a855f7',
    red: '#ef4444',
    green: '#10b981',
    orange: '#f97316'
};

const formatMoney = (n: number) => {
    if (n >= 1e12) return '$' + (n / 1e12).toFixed(2) + 'T';
    if (n >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B';
    return '$' + (n / 1e6).toFixed(0) + 'M';
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

export function GlobalWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Size detection
    const isLarge = width > 500 && height > 500; // 4x4 mode

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/global/metrics');
                if (!response.ok) throw new Error('API Error');
                const result = await response.json();
                setData(result);
            } catch (e) {
                console.error('Global error:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 300000); // 5 min refresh
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div style={{ ...baseStyle, alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ fontSize: '9px', color: THEME.textDim }}
                >
                    CALCULATING TOTALS...
                </motion.div>
            </div>
        );
    }

    if (!data) return (
        <div style={{ ...baseStyle, alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '9px', color: THEME.textDim }}>NO DATA</div>
        </div>
    );

    return (
        <div style={{ ...baseStyle }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                    <div style={{ fontSize: isLarge ? '16px' : '12px', fontWeight: 'bold', color: THEME.text }}>GLOBAL</div>
                    <div style={{ fontSize: isLarge ? '11px' : '9px', color: THEME.textDim }}>Market Metrics</div>
                </div>
                <div style={{
                    fontSize: '8px',
                    color: THEME.textDim,
                    border: `1px solid rgba(255,255,255,0.1)`,
                    padding: '2px 6px',
                    borderRadius: '8px'
                }}>USD</div>
            </div>

            {/* Metrics List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: isLarge ? '16px' : '8px', flex: 1, justifyContent: 'center' }}>

                {/* Market Cap */}
                <div>
                    <div style={{ fontSize: isLarge ? '32px' : '24px', fontWeight: 'bold', color: THEME.blue, lineHeight: 1 }}>
                        {formatMoney(data.marketCap)}
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <div style={{ fontSize: '9px', color: THEME.textDim }}>Total Market Cap</div>
                        <div style={{ fontSize: '9px', color: data.marketCapChange >= 0 ? THEME.green : THEME.red, fontWeight: 'bold' }}>
                            {data.marketCapChange > 0 ? '+' : ''}{data.marketCapChange}%
                        </div>
                    </div>
                </div>

                {/* Volume */}
                <div>
                    <div style={{ fontSize: isLarge ? '24px' : '18px', fontWeight: 'bold', color: THEME.text, lineHeight: 1 }}>
                        {formatMoney(data.volume24h)}
                    </div>
                    <div style={{ fontSize: '9px', color: THEME.textDim }}>Volume 24H</div>
                </div>

                {/* Dominance */}
                <div>
                    <div style={{ fontSize: isLarge ? '24px' : '18px', fontWeight: 'bold', color: THEME.orange, lineHeight: 1 }}>
                        {data.btcDominance}%
                    </div>
                    <div style={{ fontSize: '9px', color: THEME.textDim }}>BTC Dominance</div>
                </div>

            </div>
        </div>
    );
}
