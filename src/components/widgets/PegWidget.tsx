'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================
// STABLECOIN PEG WIDGET
// API: DeFiLlama (Free via Proxy)
// Sizes: 2x2 and 4x4 ONLY
// Features: Live Peg Monitoring
// ============================================

const THEME = {
    fontMono: '"The Good Monolith", monospace',
    neon: '#00ff41',
    text: '#fff',
    textDim: 'rgba(255,255,255,0.5)',
    green: '#10b981',
    red: '#ef4444',
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

export function PegWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Size detection
    const isLarge = width > 500 && height > 500; // 4x4 mode

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/defillama/peg');
                if (!response.ok) throw new Error('API Error');
                const result = await response.json();
                setData(result);
            } catch (e) {
                console.error('Peg error:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 300000); // 5 min refresh
        return () => clearInterval(interval);
    }, []);

    const displayCount = isLarge ? 8 : 4;

    const getStatusColor = (price: number) => {
        const diff = Math.abs(price - 1.0);
        if (diff < 0.002) return THEME.green; // < 0.2% dev
        if (diff < 0.01) return THEME.yellow; // < 1% dev
        return THEME.red; // > 1% dev
    };

    return (
        <div style={{ ...baseStyle }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                    <div style={{ fontSize: isLarge ? '16px' : '12px', fontWeight: 'bold', color: THEME.text }}>STABLECOINS</div>
                    <div style={{ fontSize: isLarge ? '11px' : '9px', color: THEME.textDim }}>Peg Monitor</div>
                </div>
                <div style={{
                    fontSize: '8px',
                    color: THEME.textDim,
                    border: `1px solid rgba(255,255,255,0.1)`,
                    padding: '2px 6px',
                    borderRadius: '8px'
                }}>USD</div>
            </div>

            {loading ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ fontSize: '9px', color: THEME.textDim }}
                    >
                        CHECKING PEGS...
                    </motion.div>
                </div>
            ) : data.length === 0 ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '9px', color: THEME.textDim }}>NO DATA</div>
                </div>
            ) : (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {data.slice(0, displayCount).map((item, i) => (
                        <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px' }}>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                <span style={{ fontWeight: 'bold' }}>{item.symbol}</span>
                            </div>
                            <div style={{ color: getStatusColor(item.price), fontFamily: THEME.fontMono }}>
                                ${item.price.toFixed(4)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
