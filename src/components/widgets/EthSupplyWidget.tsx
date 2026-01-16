'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================
// ETHEREUM SUPPLY WIDGET
// API: Etherscan (Key Required)
// Sizes: 2x2 and 4x4 ONLY
// Features: Total Supply, Price, Market Cap
// ============================================

const THEME = {
    fontMono: '"The Good Monolith", monospace',
    neon: '#00ff41',
    text: '#fff',
    textDim: 'rgba(255,255,255,0.5)',
    blue: '#3b82f6',
    purple: '#a855f7'
};

const formatMoney = (n: number) => {
    if (n >= 1e12) return '$' + (n / 1e12).toFixed(2) + 'T';
    if (n >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B';
    return '$' + (n / 1e6).toFixed(0) + 'M';
};

const formatSupply = (n: number) => {
    return (n / 1e6).toFixed(2) + 'M';
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

export function EthSupplyWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Size detection
    const isLarge = width > 500 && height > 500; // 4x4 mode

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/etherscan/supply');
                if (!response.ok) throw new Error('API Error');
                const result = await response.json();
                setData(result);
            } catch (e) {
                console.error('ETH Supply error:', e);
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
                    CHECKING SUPPLY...
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
                    <div style={{ fontSize: isLarge ? '16px' : '12px', fontWeight: 'bold', color: THEME.blue }}>ETHER</div>
                    <div style={{ fontSize: isLarge ? '11px' : '9px', color: THEME.textDim }}>Total Supply</div>
                </div>
                <div style={{
                    fontSize: '8px',
                    color: THEME.textDim,
                    border: `1px solid rgba(255,255,255,0.1)`,
                    padding: '2px 6px',
                    borderRadius: '8px'
                }}>ETH</div>
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
                    {formatSupply(data.supply)}
                </div>
                <div style={{ fontSize: '10px', color: THEME.textDim, marginTop: '4px' }}>Circulating ETH</div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ fontSize: '10px', color: THEME.textDim }}>Price</div>
                        <div style={{ fontSize: '10px', fontWeight: 'bold', color: THEME.blue }}>${data.price.toLocaleString()}</div>
                    </div>
                    {(isLarge || width > 150) && (
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '10px', color: THEME.textDim }}>Market Cap</div>
                            <div style={{ fontSize: '10px', fontWeight: 'bold' }}>{formatMoney(data.marketCap)}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
