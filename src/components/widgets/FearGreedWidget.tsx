'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================
// FEAR & GREED INDEX WIDGET
// API: Alternative.me (Free, No Auth)
// ============================================

interface FearGreedData {
    value: number;
    classification: string;
    timestamp: string;
}

const THEME = {
    fontMono: '"The Good Monolith", monospace',
    neon: '#00ff41',
    text: '#fff',
    textDim: 'rgba(255,255,255,0.5)'
};

// Helper: Size Category
const getSize = (w: number, h: number): 'small' | 'medium' | 'large' => {
    const area = w * h;
    if (area >= 50000) return 'large';
    if (area >= 25000) return 'medium';
    return 'small';
};

// Color based on fear/greed value
const getColor = (value: number): string => {
    if (value <= 25) return '#ef4444'; // Extreme Fear - Red
    if (value <= 45) return '#f97316'; // Fear - Orange
    if (value <= 55) return '#eab308'; // Neutral - Yellow
    if (value <= 75) return '#84cc16'; // Greed - Light Green
    return '#22c55e'; // Extreme Greed - Green
};

const getEmoji = (value: number): string => {
    if (value <= 25) return '😱';
    if (value <= 45) return '😰';
    if (value <= 55) return '😐';
    if (value <= 75) return '😊';
    return '🤑';
};

// Base styles
const baseStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: THEME.fontMono,
    color: THEME.text,
    padding: '16px',
    boxSizing: 'border-box',
    overflow: 'hidden'
};

export function FearGreedWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [data, setData] = useState<FearGreedData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const size = getSize(width, height);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.alternative.me/fng/?limit=1');
                if (!response.ok) throw new Error('API Error');
                const json = await response.json();
                const fng = json.data[0];
                setData({
                    value: parseInt(fng.value),
                    classification: fng.value_classification,
                    timestamp: fng.timestamp
                });
                setError(null);
            } catch (e) {
                setError('Failed to load');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div style={{ ...baseStyle, alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '10px', color: THEME.textDim }}>LOADING...</div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div style={{ ...baseStyle, alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '10px', color: '#ef4444' }}>ERROR</div>
            </div>
        );
    }

    const color = getColor(data.value);
    const emoji = getEmoji(data.value);

    // SMALL: Just the gauge value
    if (size === 'small') {
        return (
            <div style={{ ...baseStyle, alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <div style={{ fontSize: '10px', color: THEME.textDim }}>F&G</div>
                <div style={{ fontSize: '36px', fontWeight: 'bold', color }}>{data.value}</div>
                <div style={{ fontSize: '10px', color, textTransform: 'uppercase' }}>{data.classification}</div>
            </div>
        );
    }

    // MEDIUM: Gauge with arc
    if (size === 'medium') {
        const rotation = (data.value / 100) * 180 - 90; // -90 to 90 degrees

        return (
            <div style={{ ...baseStyle, alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <div style={{ fontSize: '10px', color: THEME.textDim }}>FEAR & GREED INDEX</div>

                {/* Gauge */}
                <div style={{ position: 'relative', width: '120px', height: '70px' }}>
                    <svg width="120" height="70" viewBox="0 0 120 70">
                        {/* Background Arc */}
                        <path
                            d="M 10 60 A 50 50 0 0 1 110 60"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="8"
                            strokeLinecap="round"
                        />
                        {/* Colored Progress Arc */}
                        <motion.path
                            d="M 10 60 A 50 50 0 0 1 110 60"
                            fill="none"
                            stroke={color}
                            strokeWidth="8"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: data.value / 100 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                    </svg>
                    {/* Needle */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            bottom: '10px',
                            left: '50%',
                            width: '2px',
                            height: '40px',
                            background: '#fff',
                            transformOrigin: 'bottom center',
                            marginLeft: '-1px'
                        }}
                        initial={{ rotate: -90 }}
                        animate={{ rotate: rotation }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '28px', fontWeight: 'bold', color }}>{data.value}</span>
                    <span style={{ fontSize: '20px' }}>{emoji}</span>
                </div>
                <div style={{ fontSize: '12px', color, textTransform: 'uppercase', fontWeight: 'bold' }}>
                    {data.classification}
                </div>
            </div>
        );
    }

    // LARGE: Full dashboard with history placeholder
    return (
        <div style={{ ...baseStyle, justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '10px', color: THEME.neon, border: `1px solid ${THEME.neon}`, padding: '2px 8px', borderRadius: '12px' }}>
                    LIVE
                </div>
                <div style={{ fontSize: '10px', color: THEME.textDim }}>ALTERNATIVE.ME</div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                {/* Large Gauge */}
                <div style={{ position: 'relative', width: '180px', height: '100px' }}>
                    <svg width="180" height="100" viewBox="0 0 180 100">
                        {/* Gradient Definitions */}
                        <defs>
                            <linearGradient id="fng-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#ef4444" />
                                <stop offset="25%" stopColor="#f97316" />
                                <stop offset="50%" stopColor="#eab308" />
                                <stop offset="75%" stopColor="#84cc16" />
                                <stop offset="100%" stopColor="#22c55e" />
                            </linearGradient>
                        </defs>
                        {/* Background Arc */}
                        <path
                            d="M 15 90 A 75 75 0 0 1 165 90"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="12"
                            strokeLinecap="round"
                        />
                        {/* Colored Progress Arc */}
                        <motion.path
                            d="M 15 90 A 75 75 0 0 1 165 90"
                            fill="none"
                            stroke="url(#fng-gradient)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: data.value / 100 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                    </svg>
                    {/* Needle */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            bottom: '10px',
                            left: '50%',
                            width: '3px',
                            height: '60px',
                            background: 'linear-gradient(to top, #fff, transparent)',
                            transformOrigin: 'bottom center',
                            marginLeft: '-1.5px',
                            borderRadius: '3px'
                        }}
                        initial={{ rotate: -90 }}
                        animate={{ rotate: (data.value / 100) * 180 - 90 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    {/* Center Value */}
                    <div style={{
                        position: 'absolute',
                        bottom: '5px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '10px', color: THEME.textDim }}>INDEX</div>
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '48px', fontWeight: 'bold', color }}>{data.value}</span>
                        <span style={{ fontSize: '32px' }}>{emoji}</span>
                    </div>
                    <div style={{ fontSize: '16px', color, textTransform: 'uppercase', fontWeight: 'bold', marginTop: '4px' }}>
                        {data.classification}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
                <div>
                    <div style={{ fontSize: '9px', color: THEME.textDim }}>FEAR</div>
                    <div style={{ fontSize: '12px', color: '#ef4444' }}>0-25</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '9px', color: THEME.textDim }}>NEUTRAL</div>
                    <div style={{ fontSize: '12px', color: '#eab308' }}>45-55</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '9px', color: THEME.textDim }}>GREED</div>
                    <div style={{ fontSize: '12px', color: '#22c55e' }}>75-100</div>
                </div>
            </div>
        </div>
    );
}

// Icon for Widget Center
export const FearGreedIcon = (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 12 L12 6" />
        <path d="M12 12 L16 8" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
);

export default FearGreedWidget;
