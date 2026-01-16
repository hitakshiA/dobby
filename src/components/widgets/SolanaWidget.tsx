'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================
// SOLANA NETWORK WIDGET
// API: Helius (Key Required)
// Sizes: 2x2 and 4x4 ONLY
// Features: Live TPS, History
// ============================================

const THEME = {
    fontMono: '"The Good Monolith", monospace',
    neon: '#00ff41',
    text: '#fff',
    textDim: 'rgba(255,255,255,0.5)',
    purple: '#a855f7', // Solana Purple
    green: '#14f195'  // Solana Green
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

export function SolanaWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Size detection
    const isLarge = width > 500 && height > 500; // 4x4 mode

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/helius/tps');
                if (!response.ok) throw new Error('API Error');
                const result = await response.json();
                setData(result);
            } catch (e) {
                console.error('Solana error:', e);
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
                    CONNECTING RPC...
                </motion.div>
            </div>
        );
    }

    if (!data) return (
        <div style={{ ...baseStyle, alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '9px', color: THEME.textDim }}>RPC OFFLINE</div>
        </div>
    );

    // Simple Bar Chart for History
    const maxTps = Math.max(...data.history.map((h: any) => h.tps));

    return (
        <div style={{ ...baseStyle }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                    <div style={{ fontSize: isLarge ? '16px' : '12px', fontWeight: 'bold', color: THEME.purple }}>SOLANA</div>
                    <div style={{ fontSize: isLarge ? '11px' : '9px', color: THEME.textDim }}>Network Speed</div>
                </div>
                <div style={{
                    fontSize: '8px',
                    color: THEME.textDim,
                    border: `1px solid rgba(255,255,255,0.1)`,
                    padding: '2px 6px',
                    borderRadius: '8px'
                }}>MAINNET</div>
            </div>

            {/* Main Metric */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ fontSize: isLarge ? '56px' : '48px', fontWeight: 'bold', lineHeight: 1, color: THEME.green }}>
                    {data.current.toLocaleString()}
                </div>
                <div style={{ fontSize: '10px', color: THEME.textDim, marginTop: '4px' }}>TPS</div>
            </div>

            {/* History Graph */}
            <div style={{ height: isLarge ? '60px' : '30px', display: 'flex', alignItems: 'flex-end', gap: '2px', opacity: 0.5 }}>
                {data.history.slice(-20).map((h: any, i: number) => (
                    <div
                        key={i}
                        style={{
                            flex: 1,
                            background: THEME.green,
                            height: `${(h.tps / maxTps) * 100}%`,
                            borderRadius: '1px'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
