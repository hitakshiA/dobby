'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================
// TRENDING SEARCH WIDGET
// API: CoinGecko (Free via Proxy)
// Sizes: 2x2 and 4x4 ONLY
// Features: Top Searched Coins
// ============================================

const THEME = {
    fontMono: '"The Good Monolith", monospace',
    neon: '#00ff41',
    text: '#fff',
    textDim: 'rgba(255,255,255,0.5)',
    orange: '#f97316',
    yellow: '#eab308'
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

export function TrendingWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Size detection
    const isLarge = width > 500 && height > 500; // 4x4 mode

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/coingecko/trending');
                if (!response.ok) throw new Error('API Error');
                const result = await response.json();
                setData(result);
            } catch (e) {
                console.error('Trending error:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 300000); // 5 min refresh
        return () => clearInterval(interval);
    }, []);

    const displayCount = isLarge ? 7 : 4;

    return (
        <div style={{ ...baseStyle }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                    <div style={{ fontSize: isLarge ? '16px' : '12px', fontWeight: 'bold', color: THEME.neon }}>TRENDING</div>
                    <div style={{ fontSize: isLarge ? '11px' : '9px', color: THEME.textDim }}>Top Searches</div>
                </div>
                <div style={{
                    fontSize: '8px',
                    color: THEME.textDim,
                    border: `1px solid rgba(255,255,255,0.1)`,
                    padding: '2px 6px',
                    borderRadius: '8px'
                }}>GECKO</div>
            </div>

            {loading ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ fontSize: '9px', color: THEME.textDim }}
                    >
                        SCANNING...
                    </motion.div>
                </div>
            ) : data.length === 0 ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '9px', color: THEME.textDim }}>NO DATA</div>
                </div>
            ) : (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {data.slice(0, displayCount).map((item, i) => (
                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '16px', textAlign: 'center', fontSize: '9px', color: THEME.textDim }}>{i + 1}</div>
                            <img
                                src={item.thumb}
                                alt={item.symbol}
                                style={{ width: '16px', height: '16px', borderRadius: '50%' }}
                            />
                            <div style={{ fontSize: '10px', fontWeight: 'bold' }}>{item.symbol}</div>
                            <div style={{ marginLeft: 'auto', fontSize: '9px', color: THEME.textDim }}>
                                #{item.rank}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
