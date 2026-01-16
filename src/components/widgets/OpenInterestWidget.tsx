'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================
// OPEN INTEREST WIDGET
// API: Deribit (Free via Proxy)
// Sizes: 2x2 and 4x4 ONLY
// Features: Global Options OI (BTC + ETH)
// ============================================

const THEME = {
    fontMono: '"The Good Monolith", monospace',
    neon: '#00ff41',
    text: '#fff',
    textDim: 'rgba(255,255,255,0.5)',
    blue: '#3b82f6',
    purple: '#a855f7',
    orange: '#f97316'
};

const formatBillions = (val: number) => {
    return '$' + (val / 1e9).toFixed(2) + 'B';
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

export function OpenInterestWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Size detection
    const isLarge = width > 500 && height > 500; // 4x4 mode

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/deribit/oi');
                if (!response.ok) throw new Error('API Error');
                const result = await response.json();
                setData(result);
            } catch (e) {
                console.error('OI error:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 60000); // 1 min refresh
        return () => clearInterval(interval);
    }, []);

    // Loader
    if (loading) {
        return (
            <div style={{ ...baseStyle, alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ fontSize: '9px', color: THEME.textDim }}
                >
                    CALCULATING OI...
                </motion.div>
            </div>
        );
    }

    if (!data) return (
        <div style={{ ...baseStyle, alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '9px', color: THEME.textDim }}>NO DATA</div>
        </div>
    );

    const btcPct = (data.btc.usd / data.totalUsd) * 100;
    const ethPct = (data.eth.usd / data.totalUsd) * 100;

    return (
        <div style={{ ...baseStyle }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                    <div style={{ fontSize: isLarge ? '16px' : '12px', fontWeight: 'bold', color: THEME.text }}>OPTIONS OI</div>
                    <div style={{ fontSize: isLarge ? '11px' : '9px', color: THEME.textDim }}>Global Notional</div>
                </div>
                <div style={{
                    fontSize: '8px',
                    color: THEME.textDim,
                    border: `1px solid rgba(255,255,255,0.1)`,
                    padding: '2px 6px',
                    borderRadius: '8px'
                }}>DERIBIT</div>
            </div>

            {/* Main Total */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: isLarge ? '48px' : '32px', fontWeight: 'bold', lineHeight: 1 }}>
                    {formatBillions(data.totalUsd)}
                </div>
                <div style={{ fontSize: '10px', color: THEME.textDim, marginTop: '4px' }}>Total Open Interest</div>
            </div>

            {/* Visual Bar */}
            <div style={{ marginTop: 'auto' }}>
                <div style={{ display: 'flex', height: '6px', borderRadius: '3px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{ width: `${btcPct}%`, background: THEME.orange }} />
                    <div style={{ width: `${ethPct}%`, background: THEME.purple }} />
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ fontSize: '10px', color: THEME.orange, fontWeight: 'bold' }}>BTC</div>
                        <div style={{ fontSize: '9px', color: THEME.textDim }}>{formatBillions(data.btc.usd)}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '10px', color: THEME.purple, fontWeight: 'bold' }}>ETH</div>
                        <div style={{ fontSize: '9px', color: THEME.textDim }}>{formatBillions(data.eth.usd)}</div>
                    </div>
                </div>

            </div>
        </div>
    );
}
