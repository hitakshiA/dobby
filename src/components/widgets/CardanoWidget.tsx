'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================
// CARDANO EPOCH WIDGET
// API: Blockfrost (Key Required)
// Sizes: 2x2 and 4x4 ONLY
// Features: Epoch Progress, Tx Count
// ============================================

const THEME = {
    fontMono: '"The Good Monolith", monospace',
    neon: '#00ff41',
    text: '#fff',
    textDim: 'rgba(255,255,255,0.5)',
    blue: '#3b82f6',
    indigo: '#6366f1'
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

export function CardanoWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Size detection
    const isLarge = width > 500 && height > 500; // 4x4 mode

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/blockfrost/epoch');
                if (!response.ok) throw new Error('API Error');
                const result = await response.json();
                setData(result);
            } catch (e) {
                console.error('Cardano error:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 600000); // 10 min refresh
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
                    SYNCING ADA...
                </motion.div>
            </div>
        );
    }

    if (!data) return (
        <div style={{ ...baseStyle, alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '9px', color: THEME.textDim }}>NO DATA</div>
        </div>
    );

    // Calculate progress
    const now = Math.floor(Date.now() / 1000);
    const total = data.end_time - data.start_time;
    const elapsed = now - data.start_time;
    let progress = (elapsed / total) * 100;
    if (progress > 100) progress = 100;
    if (progress < 0) progress = 0;

    return (
        <div style={{ ...baseStyle }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                    <div style={{ fontSize: isLarge ? '16px' : '12px', fontWeight: 'bold', color: THEME.blue }}>CARDANO</div>
                    <div style={{ fontSize: isLarge ? '11px' : '9px', color: THEME.textDim }}>Epoch {data.epoch}</div>
                </div>
                <div style={{
                    fontSize: '8px',
                    color: THEME.textDim,
                    border: `1px solid rgba(255,255,255,0.1)`,
                    padding: '2px 6px',
                    borderRadius: '8px'
                }}>ADA</div>
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
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                {/* Circular Progress Placeholder (CSS Conic Gradient) */}
                <div style={{
                    width: isLarge ? '120px' : '80px',
                    height: isLarge ? '120px' : '80px',
                    borderRadius: '50%',
                    background: `conic-gradient(${THEME.blue} ${progress}%, rgba(255,255,255,0.1) 0)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}>
                    <div style={{
                        width: '85%',
                        height: '85%',
                        borderRadius: '50%',
                        background: '#000', // Inner mask
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}>
                        <div style={{ fontSize: isLarge ? '24px' : '16px', fontWeight: 'bold' }}>{progress.toFixed(1)}%</div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div style={{ marginTop: 'auto', paddingTop: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: THEME.textDim }}>Transactions this Epoch</div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: THEME.indigo }}>{data.tx_count.toLocaleString()}</div>
            </div>
        </div>
    );
}
