'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWebSocket } from '@/hooks/useWebSocket';

// ============================================
// BITCOIN NETWORK WIDGET
// API: Mempool.space (Free via Proxy)
// Sizes: 2x2 and 4x4 ONLY
// Features: Live Fees, Height, Difficulty
// ============================================

const THEME = {
    fontMono: '"The Good Monolith", monospace',
    neon: '#00ff41',
    text: '#fff',
    textDim: 'rgba(255,255,255,0.5)',
    orange: '#f97316',
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

interface Block {
    height: number;
    timestamp: number;
    tx_count: number;
    size: number;
}

export function MempoolWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [fees, setFees] = useState({ fastest: 0, halfHour: 0, hour: 0 });
    const [loading, setLoading] = useState(true);

    // Size detection
    const isLarge = width > 500 && height > 500; // 4x4 mode

    // WebSocket Integration (Mempool.space)
    const { isConnected, sendMessage, lastMessage } = useWebSocket('wss://mempool.space/api/v1/ws');

    useEffect(() => {
        if (isConnected) {
            const payload = { "action": "init" };
            sendMessage(JSON.stringify(payload));
        }
    }, [isConnected, sendMessage]);

    // Handle Live Blocks
    useEffect(() => {
        if (lastMessage && lastMessage.data) {
            try {
                const data = JSON.parse(lastMessage.data);
                if (data.blocks && Array.isArray(data.blocks)) {
                    setBlocks(data.blocks.slice(0, 3).map((b: any) => ({
                        height: b.height,
                        timestamp: b.timestamp,
                        tx_count: b.tx_count,
                        size: b.size,
                    })));
                }
                if (data.block) {
                    // Prepend new block
                    setBlocks(prev => [{
                        height: data.block.height,
                        timestamp: data.block.timestamp,
                        tx_count: data.block.tx_count,
                        size: data.block.size
                    }, ...prev.slice(0, 2)]);
                }
                if (data.conversions) {
                    // USD Prices
                }
            } catch (e) {
                console.error('Mempool WS Error', e);
            }
        }
    }, [lastMessage]);

    // Initial Fetch (Fallback)
    const fetchData = async () => {
        try {
            const res = await fetch('/api/mempool/fees'); // Reuse existing proxy for initial load
            const data = await res.json();
            // Note: Proxy might need adjustment to return blocks too, currently it likely returns fees
            // For now we trust WS or let the UI handle empty state gracefully
            if (data.fastestFee) {
                setFees({
                    fastest: data.fastestFee,
                    halfHour: data.halfHourFee,
                    hour: data.hourFee
                });
            }
        } catch (e) {
            console.error('Mempool Widget Error:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // Polling for fees as WS focuses on blocks/mempool
        const interval = setInterval(fetchData, 30000);
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
                    SYNCING NODE...
                </motion.div>
            </div>
        );
    }

    if (blocks.length === 0 && fees.fastest === 0) return (
        <div style={{ ...baseStyle, alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '9px', color: THEME.textDim }}>NO PEERS</div>
        </div>
    );

    return (
        <div style={{ ...baseStyle }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                    <div style={{ fontSize: isLarge ? '16px' : '12px', fontWeight: 'bold', color: THEME.orange }}>BITCOIN</div>
                    <div style={{ fontSize: isLarge ? '11px' : '9px', color: THEME.textDim }}>Mempool.space</div>
                </div>
                <div style={{
                    fontSize: '8px',
                    color: THEME.textDim,
                    border: `1px solid rgba(255,255,255,0.1)`,
                    padding: '2px 6px',
                    borderRadius: '8px'
                }}>MAINNET</div>
            </div>

            {/* Main Metric (Fees) */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ fontSize: isLarge ? '56px' : '42px', fontWeight: 'bold', lineHeight: 1, color: THEME.orange }}>
                    {fees.fastest}
                </div>
                <div style={{ fontSize: '10px', color: THEME.textDim, marginTop: '4px' }}>sat/vB</div>
            </div>

            {/* Sub Metrics */}
            <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ fontSize: '10px', color: THEME.textDim }}>Height</div>
                    <div style={{ fontSize: '10px', fontWeight: 'bold' }}>{blocks[0]?.height?.toLocaleString() ?? '—'}</div>
                </div>
                {isLarge && blocks[0] && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: '10px', color: THEME.textDim }}>TXs</div>
                        <div style={{ fontSize: '10px', fontWeight: 'bold' }}>
                            {blocks[0].tx_count?.toLocaleString() ?? '—'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
