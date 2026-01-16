'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================
// THORCHAIN WIDGET
// API: Midgard (Free via Proxy)
// Sizes: 2x2 and 4x4 ONLY
// Features: Swap Volume, Rune Price
// ============================================

const THEME = {
    fontMono: '"The Good Monolith", monospace',
    neon: '#00ff41',
    text: '#fff',
    textDim: 'rgba(255,255,255,0.5)',
    cyan: '#06b6d4' // Thorchain Cyan
};

const formatMoney = (n: number) => {
    if (n >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return '$' + (n / 1e6).toFixed(2) + 'M';
    if (n >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K';
    return '$' + n.toFixed(0);
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

export function ThorchainWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Size detection
    const isLarge = width > 500 && height > 500; // 4x4 mode

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/midgard/volume');
                if (!response.ok) throw new Error('API Error');
                const result = await response.json();
                setData(result);
            } catch (e) {
                console.error('Thorchain error:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 60000); // 1 min refresh
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
                    SWAPPING...
                </motion.div>
            </div>
        );
    }

    if (!data) return (
        <div style={{ ...baseStyle, alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '9px', color: THEME.textDim }}>NO SIGNAL</div>
        </div>
    );

    return (
        <div style={{ ...baseStyle }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                    <div style={{ fontSize: isLarge ? '16px' : '12px', fontWeight: 'bold', color: THEME.cyan }}>THORCHAIN</div>
                    <div style={{ fontSize: isLarge ? '11px' : '9px', color: THEME.textDim }}>Swap Volume (24h)</div>
                </div>
                <div style={{
                    fontSize: '8px',
                    color: THEME.textDim,
                    border: `1px solid rgba(255,255,255,0.1)`,
                    padding: '2px 6px',
                    borderRadius: '8px'
                }}>DEX</div>
                {data.isMock && (
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

            {/* Metrics */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: isLarge ? '48px' : '32px', fontWeight: 'bold', lineHeight: 1 }}>
                    {formatMoney(data.volume24h)}
                </div>
                <div style={{ fontSize: '10px', color: THEME.textDim, marginTop: '4px' }}>
                    {data.swapCount.toLocaleString()} Swaps
                </div>
            </div>

            {/* Price Footer */}
            <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '10px', color: THEME.textDim }}>RUNE Price</div>
                    <div style={{ fontSize: '10px', fontWeight: 'bold', color: THEME.cyan }}>${data.runePrice.toFixed(2)}</div>
                </div>
            </div>
        </div>
    );
}
