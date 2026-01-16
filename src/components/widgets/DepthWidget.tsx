'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWebSocket } from '@/hooks/useWebSocket';

// ============================================
// ORDER BOOK DEPTH WIDGET
// API: Binance (Free via Proxy)
// Sizes: 2x2 and 4x4 ONLY
// Features: Live Bid/Ask Depth Visualizer
// ============================================

const THEME = {
    fontMono: '"The Good Monolith", monospace',
    neon: '#00ff41',
    text: '#fff',
    textDim: 'rgba(255,255,255,0.5)',
    red: '#ef4444',
    green: '#10b981',
    yellow: '#eab308'
};

interface Order {
    price: number;
    quantity: number;
}

const SYMBOLS = [
    { id: 'BTCUSDT', label: 'BTC' },
    { id: 'ETHUSDT', label: 'ETH' },
    { id: 'SOLUSDT', label: 'SOL' },
];

const formatPrice = (p: string) => Math.floor(parseFloat(p)).toLocaleString();
const formatVol = (v: string) => parseFloat(v).toFixed(3);

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

const TabButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
        onClick={onClick}
        style={{
            padding: '2px 6px',
            fontSize: '9px',
            fontFamily: THEME.fontMono,
            background: active ? THEME.text : 'transparent',
            color: active ? '#000' : THEME.textDim,
            border: `1px solid ${active ? THEME.text : 'rgba(255,255,255,0.2)'}`,
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontWeight: active ? 'bold' : 'normal'
        }}
    >
        {children}
    </button>
);

export function DepthWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [bids, setBids] = useState<Order[]>([]);
    const [asks, setAsks] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [symbol, setSymbol] = useState('BTCUSDT');

    // Size detection
    const isLarge = width > 500 && height > 500;

    // WebSocket Integration
    const { isConnected, sendMessage, lastMessage } = useWebSocket('wss://stream.binance.com:9443/ws');

    // Subscribe to WebSocket on symbol change or connection
    useEffect(() => {
        if (isConnected && symbol) {
            const topic = `${symbol.toLowerCase()}@depth20`;
            const payload = {
                method: "SUBSCRIBE",
                params: [topic],
                id: 1
            };
            sendMessage(JSON.stringify(payload));

            // Unsubscribe from previous symbol if it changes
            return () => {
                const unsubscribePayload = {
                    method: "UNSUBSCRIBE",
                    params: [topic],
                    id: 1
                };
                sendMessage(JSON.stringify(unsubscribePayload));
            };
        }
    }, [isConnected, sendMessage, symbol]);

    // Handle WebSocket Messages
    useEffect(() => {
        if (lastMessage && lastMessage.data) {
            try {
                const data = JSON.parse(lastMessage.data);
                if (data.bids && data.asks) {
                    const newBids = data.bids.slice(0, isLarge ? 10 : 5).map((b: string[]) => ({ price: parseFloat(b[0]), quantity: parseFloat(b[1]) }));
                    const newAsks = data.asks.slice(0, isLarge ? 10 : 5).map((a: string[]) => ({ price: parseFloat(a[0]), quantity: parseFloat(a[1]) }));
                    setBids(newBids);
                    setAsks(newAsks);
                    setLoading(false);
                }
            } catch (e) {
                console.error('WS Parse Error', e);
            }
        }
    }, [lastMessage, isLarge]);

    // Initial Fetch (Fallback)
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/binance/depth?symbol=${symbol}&limit=20`);
            if (!res.ok) throw new Error('API Error');
            const data = await res.json();
            if (data.bids && data.asks) {
                setBids(data.bids.slice(0, isLarge ? 10 : 5).map((b: string[]) => ({ price: parseFloat(b[0]), quantity: parseFloat(b[1]) })));
                setAsks(data.asks.slice(0, isLarge ? 10 : 5).map((a: string[]) => ({ price: parseFloat(a[0]), quantity: parseFloat(a[1]) })));
            }
        } catch (e) {
            console.error('Depth Widget Error:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch initial data on mount or symbol change
        fetchData();
        // Polling fallback only if WS fails or connection drops
        const interval = setInterval(() => {
            if (!isConnected) fetchData();
        }, 5000);
        return () => clearInterval(interval);
    }, [symbol, isConnected]); // Re-run if symbol or connection status changes

    const displayCount = isLarge ? 10 : 5;

    // Calculate max volume for bars relative to the view
    const allOrders = [...bids.slice(0, displayCount), ...asks.slice(0, displayCount)];
    const maxVol = allOrders.length > 0 ? Math.max(...allOrders.map(o => o.quantity)) : 1;

    return (
        <div style={{ ...baseStyle }}>
            {/* Header */}
            <div style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div>
                        <div style={{ fontSize: isLarge ? '16px' : '12px', fontWeight: 'bold', color: THEME.text }}>DEPTH</div>
                        <div style={{ fontSize: isLarge ? '11px' : '9px', color: THEME.textDim }}>Order Book</div>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {SYMBOLS.map(s => (
                            <TabButton key={s.id} active={symbol === s.id} onClick={() => setSymbol(s.id)}>
                                {s.label}
                            </TabButton>
                        ))}
                    </div>
                </div>
            </div>

            {loading && bids.length === 0 ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ fontSize: '9px', color: THEME.textDim }}
                    >
                        SCANNING BOOK...
                    </motion.div>
                </div>
            ) : bids.length === 0 ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '9px', color: THEME.textDim }}>NO DATA</div>
                </div>
            ) : (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', position: 'relative' }}>
                    {/* ASKS (Red, Top) - Reversed order to show lowest ask at bottom */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        {asks.slice(0, displayCount).reverse().map((ask, i) => {
                            const widthPct = (ask.quantity / maxVol) * 100;
                            return (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', position: 'relative', padding: '1px 0' }}>
                                    {/* Volume Bar */}
                                    <div style={{
                                        position: 'absolute',
                                        right: 0,
                                        top: 0,
                                        bottom: 0,
                                        width: `${widthPct}%`,
                                        background: `${THEME.red}30`, // 30% opacity
                                        zIndex: 0
                                    }} />
                                    <span style={{ color: THEME.red, zIndex: 1, fontWeight: 'bold' }}>{formatPrice(ask.price.toString())}</span>
                                    <span style={{ color: THEME.textDim, zIndex: 1 }}>{formatVol(ask.quantity.toString())}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Spread Indicator */}
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '2px 0' }} />

                    {/* BIDS (Green, Bottom) */}
                    <div style={{ flex: 1 }}>
                        {bids.slice(0, displayCount).map((bid, i) => {
                            const widthPct = (bid.quantity / maxVol) * 100;
                            return (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', position: 'relative', padding: '1px 0' }}>
                                    {/* Volume Bar */}
                                    <div style={{
                                        position: 'absolute',
                                        right: 0,
                                        top: 0,
                                        bottom: 0,
                                        width: `${widthPct}%`,
                                        background: `${THEME.green}30`,
                                        zIndex: 0
                                    }} />
                                    <span style={{ color: THEME.green, zIndex: 1, fontWeight: 'bold' }}>{formatPrice(bid.price.toString())}</span>
                                    <span style={{ color: THEME.textDim, zIndex: 1 }}>{formatVol(bid.quantity.toString())}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
