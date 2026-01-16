'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================
// SOFT BRUTALIST DESIGN SYSTEM
// Uses INLINE STYLES only (no Tailwind)
// ============================================

const THEME = {
    fontSans: '"PP Neue Montreal", sans-serif',
    fontMono: '"The Good Monolith", monospace',
    neon: '#00ff41',
    bg: 'transparent',
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

// Base styles reused
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

// ==================== CLOCK WIDGET ====================
export function ClockWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [time, setTime] = useState(new Date());
    const size = getSize(width, height);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    const date = time.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase();

    // SMALL
    if (size === 'small') {
        return (
            <div style={{ ...baseStyle, justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: THEME.textDim }}>TIME</div>
                <div style={{ fontSize: '36px', fontWeight: 'bold', lineHeight: 1 }}>{hours}:{minutes}</div>
                <div style={{ fontSize: '10px', color: THEME.neon }}>{date}</div>
            </div>
        );
    }

    // MEDIUM
    if (size === 'medium') {
        return (
            <div style={{ ...baseStyle, justifyContent: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '52px', fontWeight: 'bold', lineHeight: 1 }}>{hours}:{minutes}</span>
                    <span style={{ fontSize: '20px', color: THEME.neon }}>:{seconds}</span>
                </div>
                <div style={{ fontSize: '12px', color: THEME.textDim, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px', marginTop: '4px' }}>{date}</div>
            </div>
        );
    }

    // LARGE
    return (
        <div style={{ ...baseStyle, justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', color: THEME.neon, border: `1px solid ${THEME.neon}`, padding: '2px 8px', borderRadius: '12px' }}>SYSTEM</span>
                <span style={{ fontSize: '10px', color: THEME.textDim }}>LOCAL</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <span style={{ fontSize: '72px', fontWeight: 'bold', lineHeight: 1, textShadow: '0 0 20px rgba(0,255,65,0.3)' }}>{hours}:{minutes}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
                <div><div style={{ fontSize: '10px', color: THEME.textDim }}>DATE</div><div style={{ fontSize: '14px' }}>{date}</div></div>
                <div style={{ textAlign: 'right' }}><div style={{ fontSize: '10px', color: THEME.textDim }}>SEC</div><div style={{ fontSize: '20px' }}>{seconds}</div></div>
            </div>
        </div>
    );
}

// ==================== CPU WIDGET ====================
export function CpuWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [usage, setUsage] = useState(45);
    const size = getSize(width, height);

    useEffect(() => {
        const timer = setInterval(() => {
            setUsage(prev => Math.max(10, Math.min(95, prev + (Math.random() - 0.5) * 15)));
        }, 800);
        return () => clearInterval(timer);
    }, []);

    // SMALL: Radial Gauge
    if (size === 'small') {
        const circumference = 2 * Math.PI * 28;
        const offset = circumference - (usage / 100) * circumference;
        return (
            <div style={{ ...baseStyle, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <svg width="70" height="70" viewBox="0 0 64 64" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                    <circle
                        cx="32" cy="32" r="28" fill="none"
                        stroke={usage > 80 ? '#ef4444' : THEME.neon}
                        strokeWidth="4"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                    />
                </svg>
                <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{Math.round(usage)}%</span>
                    <span style={{ fontSize: '8px', color: THEME.textDim }}>CPU</span>
                </div>
            </div>
        );
    }

    // MEDIUM/LARGE: Histogram
    const bars = size === 'large' ? 24 : 14;
    return (
        <div style={{ ...baseStyle }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>SYSTEM</span>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: usage > 80 ? '#ef4444' : THEME.neon }}>{Math.round(usage)}%</span>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '3px' }}>
                {Array.from({ length: bars }).map((_, i) => (
                    <motion.div
                        key={i}
                        style={{ flex: 1, background: i >= bars - 3 ? THEME.neon : 'rgba(255,255,255,0.15)', borderRadius: '2px 2px 0 0' }}
                        animate={{ height: `${Math.min(100, Math.random() * usage + 10)}%` }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                ))}
            </div>
        </div>
    );
}

// ==================== CRYPTO WIDGET ====================
export function CryptoWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const size = getSize(width, height);
    const coins = [
        { sym: 'BTC', price: '95,432', change: '+2.4%' },
        { sym: 'ETH', price: '3,302', change: '-1.1%' },
        { sym: 'SOL', price: '142.5', change: '+5.7%' },
        { sym: 'BONK', price: '0.00002', change: '+12%' }
    ];
    const count = size === 'small' ? 2 : size === 'medium' ? 3 : 4;

    return (
        <div style={{ ...baseStyle, gap: '8px' }}>
            <div style={{ fontSize: '10px', color: THEME.textDim }}>MARKETS</div>
            {coins.slice(0, count).map((c, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '6px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{c.sym}</span>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px' }}>${c.price}</div>
                        <div style={{ fontSize: '10px', color: c.change.startsWith('+') ? THEME.neon : '#ef4444' }}>{c.change}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ==================== WEATHER WIDGET ====================
export function WeatherWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const size = getSize(width, height);

    // SMALL
    if (size === 'small') {
        return (
            <div style={{ ...baseStyle, alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <div style={{ fontSize: '28px' }}>☀️</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold' }}>72°</div>
                <div style={{ fontSize: '10px', color: THEME.textDim }}>SAN FRANCISCO</div>
            </div>
        );
    }

    // MEDIUM/LARGE
    return (
        <div style={{ ...baseStyle, justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <div style={{ fontSize: '10px', color: THEME.neon }}>CLEAR</div>
                    <div style={{ fontSize: '10px', color: THEME.textDim }}>SAN FRANCISCO</div>
                </div>
                <div style={{ fontSize: '36px', fontWeight: 'bold' }}>72°</div>
            </div>
            {size === 'large' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px', marginTop: '12px' }}>
                    {['MON', 'TUE', 'WED', 'THU'].map((day, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '9px', color: THEME.textDim }}>{day}</div>
                            <div style={{ fontSize: '16px', margin: '4px 0' }}>☁️</div>
                            <div style={{ fontSize: '12px' }}>{70 + i}°</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ==================== NOTES WIDGET ====================
export function NotesWidget() {
    return (
        <div style={{ ...baseStyle }}>
            <div style={{ fontSize: '10px', color: THEME.textDim, marginBottom: '8px' }}>&gt; SCRATCHPAD</div>
            <textarea
                style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    color: THEME.text,
                    fontFamily: THEME.fontMono,
                    fontSize: '12px',
                    lineHeight: '1.6'
                }}
                placeholder="// Type anything..."
            />
        </div>
    );
}

// Compatibility Exports
export function SystemStatsWidget() { return <CpuWidget />; }
export function ActivityWidget() { return <CpuWidget />; }
export function BatteryWidget() { return <CpuWidget />; } 
