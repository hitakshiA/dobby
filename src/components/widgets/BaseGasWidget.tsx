'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================
// BASE GAS WIDGET
// API: Base RPC (Free via Proxy)
// Sizes: 2x2 and 4x4 ONLY
// Features: Live L2 Gas
// ============================================

const THEME = {
    fontMono: '"The Good Monolith", monospace',
    neon: '#00ff41',
    text: '#fff',
    textDim: 'rgba(255,255,255,0.5)',
    blue: '#2563eb' // Base Blue
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

export function BaseGasWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Size detection
    const isLarge = width > 500 && height > 500; // 4x4 mode

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/basescan/gas');
                if (!response.ok) throw new Error('API Error');
                const result = await response.json();
                setData(result);
            } catch (e) {
                console.error('Base Gas error:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 10000); // 10s refresh
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
                    ESTIMATING...
                </motion.div>
            </div>
        );
    }

    if (!data) return (
        <div style={{ ...baseStyle, alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '9px', color: THEME.textDim }}>NO NETWORK</div>
        </div>
    );

    return (
        <div style={{ ...baseStyle }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                    <div style={{ fontSize: isLarge ? '16px' : '12px', fontWeight: 'bold', color: THEME.blue }}>BASE</div>
                    <div style={{ fontSize: isLarge ? '11px' : '9px', color: THEME.textDim }}>L2 Gas</div>
                </div>
                <div style={{
                    fontSize: '8px',
                    color: THEME.textDim,
                    border: `1px solid rgba(255,255,255,0.1)`,
                    padding: '2px 6px',
                    borderRadius: '8px'
                }}>MAINNET</div>
            </div>

            {/* Metrics */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ fontSize: isLarge ? '56px' : '48px', fontWeight: 'bold', lineHeight: 1 }}>
                    {data.gwei.toFixed(4)}
                </div>
                <div style={{ fontSize: '10px', color: THEME.textDim, marginTop: '4px' }}>GWEI</div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: THEME.textDim }}>Transfer Cost</div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: THEME.blue }}>
                    &lt; $0.01
                </div>
            </div>
        </div>
    );
}
