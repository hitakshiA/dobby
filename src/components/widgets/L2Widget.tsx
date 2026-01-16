'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================
// L2 TVL WIDGET
// API: DeFiLlama (Free via Proxy)
// Sizes: 2x2 and 4x4 ONLY
// Features: Rankings, TVL
// ============================================

const THEME = {
    fontMono: '"The Good Monolith", monospace',
    neon: '#00ff41',
    text: '#fff',
    textDim: 'rgba(255,255,255,0.5)',
    blue: '#3b82f6',
    yellow: '#eab308'
};

const formatMoney = (n: number) => {
    if (n >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return '$' + (n / 1e6).toFixed(2) + 'M';
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

export function L2Widget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Size detection
    const isLarge = width > 500 && height > 500; // 4x4 mode

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/defillama/l2');
                if (!response.ok) throw new Error('API Error');
                const result = await response.json();
                setData(result);
            } catch (e) {
                console.error('L2 error:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 3600000); // 1h refresh
        return () => clearInterval(interval);
    }, []);

    const displayCount = isLarge ? 8 : 4;

    const maxTvl = data.length > 0 ? data[0].tvl : 1;

    return (
        <div style={{ ...baseStyle }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                    <div style={{ fontSize: isLarge ? '16px' : '12px', fontWeight: 'bold', color: THEME.yellow }}>L2 BEAT</div>
                    <div style={{ fontSize: isLarge ? '11px' : '9px', color: THEME.textDim }}>TVL Rankings</div>
                </div>
                <div style={{
                    fontSize: '8px',
                    color: THEME.textDim,
                    border: `1px solid rgba(255,255,255,0.1)`,
                    padding: '2px 6px',
                    borderRadius: '8px'
                }}>ETH</div>
            </div>

            {loading ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ fontSize: '9px', color: THEME.textDim }}
                    >
                        INDEXING CHAINS...
                    </motion.div>
                </div>
            ) : data.length === 0 ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '9px', color: THEME.textDim }}>NO DATA</div>
                </div>
            ) : (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {data.slice(0, displayCount).map((item, i) => (
                        <div key={item.name} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px' }}>
                                <span>{i + 1}. {item.name}</span>
                                <span>{formatMoney(item.tvl)}</span>
                            </div>
                            {/* Bar */}
                            <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(item.tvl / maxTvl) * 100}%` }}
                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                    style={{ height: '100%', background: THEME.blue }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
