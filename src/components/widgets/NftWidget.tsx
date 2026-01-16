'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================
// NFT TRENDING WIDGET
// API: CoinGecko (Free via Proxy)
// Sizes: 2x2 and 4x4 ONLY
// Features: Top Collections, Floor Price
// ============================================

const THEME = {
    fontMono: '"The Good Monolith", monospace',
    neon: '#00ff41',
    text: '#fff',
    textDim: 'rgba(255,255,255,0.5)',
    pink: '#ec4899',
    purple: '#a855f7',
    green: '#10b981',
    red: '#ef4444'
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

export function NftWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Size detection
    const isLarge = width > 500 && height > 500; // 4x4 mode

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/coingecko/nfts');
                if (!response.ok) throw new Error('API Error');
                const result = await response.json();
                setData(result);
            } catch (e) {
                console.error('NFT error:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 300000); // 5 min refresh
        return () => clearInterval(interval);
    }, []);

    const displayCount = isLarge ? 6 : 3;

    return (
        <div style={{ ...baseStyle }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                    <div style={{ fontSize: isLarge ? '16px' : '12px', fontWeight: 'bold', color: THEME.pink }}>NFT MARKET</div>
                    <div style={{ fontSize: isLarge ? '11px' : '9px', color: THEME.textDim }}>Trending</div>
                </div>
                <div style={{
                    fontSize: '8px',
                    color: THEME.textDim,
                    border: `1px solid rgba(255,255,255,0.1)`,
                    padding: '2px 6px',
                    borderRadius: '8px'
                }}>ETH</div>
                {data.length > 0 && data[0].id === 'bored-ape-yacht-club' && (
                    <div style={{
                        fontSize: '8px',
                        color: THEME.textDim,
                        border: `1px solid ${THEME.textDim}`,
                        padding: '2px 4px',
                        borderRadius: '4px',
                        marginLeft: '6px'
                    }}>MOCK</div>
                )}
            </div>

            {loading ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ fontSize: '9px', color: THEME.textDim }}
                    >
                        LOADING JPGS...
                    </motion.div>
                </div>
            ) : data.length === 0 ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '9px', color: THEME.textDim }}>NO DATA</div>
                </div>
            ) : (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {data.slice(0, displayCount).map((item, i) => (
                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {/* Image */}
                            <img
                                src={item.image}
                                alt={item.symbol}
                                style={{
                                    width: isLarge ? '32px' : '24px',
                                    height: isLarge ? '32px' : '24px',
                                    borderRadius: '4px',
                                    objectFit: 'cover'
                                }}
                            />
                            {/* Info */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: '11px', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {item.name}
                                </div>
                                <div style={{ display: 'flex', gap: '6px', fontSize: '9px', color: THEME.textDim }}>
                                    <span>{item.floor_price.toFixed(2)} E</span>
                                    <span style={{ color: item.floor_change >= 0 ? THEME.green : THEME.red }}>
                                        {item.floor_change > 0 ? '+' : ''}{item.floor_change.toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
