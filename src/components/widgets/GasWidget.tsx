'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================
// GAS TRACKER WIDGET
// API: Etherscan / Owl.to (Free via Proxy)
// Sizes: 2x2 and 4x4 ONLY
// Features: Live ETH Gas (Gwei)
// ============================================

const THEME = {
    fontMono: '"The Good Monolith", monospace',
    neon: '#00ff41',
    text: '#fff',
    textDim: 'rgba(255,255,255,0.5)',
    red: '#ef4444',
    yellow: '#eab308',
    green: '#10b981',
    blue: '#3b82f6'
};

const getColor = (gwei: number) => {
    if (gwei < 15) return THEME.green;
    if (gwei < 30) return THEME.yellow;
    return THEME.red;
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

export function GasWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Size detection
    const isLarge = width > 500 && height > 500; // 4x4 mode

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/etherscan/gas');
                if (!response.ok) throw new Error('API Error');
                const result = await response.json();
                setData(result);
            } catch (e) {
                console.error('Gas error:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 15000); // 15s refresh
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
                    CHECKING GAS...
                </motion.div>
            </div>
        );
    }

    if (!data) return (
        <div style={{ ...baseStyle, alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '9px', color: THEME.red }}>NO SIGNAL</div>
        </div>
    );

    const safe = parseInt(data.safe);
    const propose = parseInt(data.propose);
    const fast = parseInt(data.fast);

    // Main metric is "Propose" (Avg)
    const mainColor = getColor(propose);

    return (
        <div style={{ ...baseStyle }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: isLarge ? '20px' : '10px' }}>
                <div>
                    <div style={{ fontSize: isLarge ? '16px' : '12px', fontWeight: 'bold', color: THEME.blue }}>GAS GWEI</div>
                    <div style={{ fontSize: isLarge ? '11px' : '9px', color: THEME.textDim }}>Ethereum Mainnet</div>
                </div>
                <div style={{
                    fontSize: '8px',
                    color: THEME.textDim,
                    border: `1px solid rgba(255,255,255,0.1)`,
                    padding: '2px 6px',
                    borderRadius: '8px'
                }}>{data.source}</div>
            </div>

            {/* Main Gauge */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                    key={propose}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{
                        fontSize: isLarge ? '72px' : '48px',
                        fontWeight: 'bold',
                        color: mainColor,
                        lineHeight: 1,
                        textShadow: `0 0 20px ${mainColor}40`
                    }}
                >
                    {propose}
                </motion.div>
                <div style={{ fontSize: isLarge ? '14px' : '10px', color: THEME.textDim, marginTop: '4px' }}>Standard</div>
            </div>

            {/* Sub Metrics */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: isLarge ? '18px' : '14px', fontWeight: 'bold', color: getColor(safe) }}>{safe}</div>
                    <div style={{ fontSize: '8px', color: THEME.textDim }}>Low</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: isLarge ? '18px' : '14px', fontWeight: 'bold', color: getColor(fast) }}>{fast}</div>
                    <div style={{ fontSize: '8px', color: THEME.textDim }}>Fast</div>
                </div>
            </div>
        </div>
    );
}
