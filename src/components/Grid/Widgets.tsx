'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================
// APPLE-QUALITY WIDGETS WITH LOD (Level of Detail)
// ============================================

// Helper to determine size category
const getSize = (w: number, h: number): 'small' | 'medium' | 'large' => {
    const area = w * h;
    if (area >= 60000) return 'large';
    if (area >= 30000) return 'medium';
    return 'small';
};

// ==================== CLOCK WIDGET ====================
export function ClockWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [time, setTime] = useState(new Date());
    const size = getSize(width, height);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const date = time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    // Small: Just time
    if (size === 'small') {
        return (
            <div style={{
                width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)'
            }}>
                <span style={{ fontSize: '28px', fontWeight: '300', color: '#fff', fontFamily: 'system-ui' }}>
                    {displayHours}:{minutes.toString().padStart(2, '0')}
                </span>
            </div>
        );
    }

    // Medium: Time + AM/PM + Date
    if (size === 'medium') {
        return (
            <div style={{
                width: '100%', height: '100%',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)'
            }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '48px', fontWeight: '200', color: '#fff', fontFamily: 'system-ui' }}>
                        {displayHours}:{minutes.toString().padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', fontWeight: '400' }}>{period}</span>
                </div>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', fontWeight: '400' }}>{date}</span>
            </div>
        );
    }

    // Large: Analog-style with digital backup
    return (
        <div style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '12px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)'
        }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '72px', fontWeight: '100', color: '#fff', fontFamily: 'system-ui', letterSpacing: '-2px' }}>
                    {displayHours}:{minutes.toString().padStart(2, '0')}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '24px', color: 'rgba(255,255,255,0.6)', fontWeight: '300' }}>:{seconds.toString().padStart(2, '0')}</span>
                    <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', fontWeight: '500' }}>{period}</span>
                </div>
            </div>
            <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', fontWeight: '400' }}>{date}</span>
        </div>
    );
}

// ==================== WEATHER WIDGET ====================
export function WeatherWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const size = getSize(width, height);

    const conditions = { temp: 72, high: 78, low: 64, condition: 'Sunny', location: 'San Francisco' };
    const forecast = [
        { day: 'Mon', temp: 72, icon: '☀️' },
        { day: 'Tue', temp: 68, icon: '⛅' },
        { day: 'Wed', temp: 65, icon: '🌧️' },
        { day: 'Thu', temp: 70, icon: '☀️' },
        { day: 'Fri', temp: 75, icon: '☀️' },
    ];

    // Small: Just icon and temp
    if (size === 'small') {
        return (
            <div style={{
                width: '100%', height: '100%',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: '4px',
                background: 'linear-gradient(180deg, rgba(135,206,235,0.15) 0%, rgba(255,165,0,0.1) 100%)'
            }}>
                <span style={{ fontSize: '36px' }}>☀️</span>
                <span style={{ fontSize: '24px', fontWeight: '300', color: '#fff' }}>{conditions.temp}°</span>
            </div>
        );
    }

    // Medium: Icon, temp, hi/lo, location
    if (size === 'medium') {
        return (
            <div style={{
                width: '100%', height: '100%',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: '8px',
                background: 'linear-gradient(180deg, rgba(135,206,235,0.15) 0%, rgba(255,165,0,0.1) 100%)'
            }}>
                <span style={{ fontSize: '48px' }}>☀️</span>
                <span style={{ fontSize: '42px', fontWeight: '200', color: '#fff' }}>{conditions.temp}°</span>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{conditions.location}</span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>H:{conditions.high}° L:{conditions.low}°</span>
            </div>
        );
    }

    // Large: Full forecast
    return (
        <div style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '16px', gap: '12px',
            background: 'linear-gradient(180deg, rgba(135,206,235,0.15) 0%, rgba(255,165,0,0.1) 100%)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '56px' }}>☀️</span>
                <div>
                    <span style={{ fontSize: '52px', fontWeight: '200', color: '#fff' }}>{conditions.temp}°</span>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{conditions.condition}</div>
                </div>
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>{conditions.location}</div>
            <div style={{
                display: 'flex', gap: '16px', marginTop: '8px',
                padding: '12px 16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px'
            }}>
                {forecast.map((f, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>{f.day}</div>
                        <div style={{ fontSize: '20px', marginBottom: '4px' }}>{f.icon}</div>
                        <div style={{ fontSize: '14px', color: '#fff', fontWeight: '500' }}>{f.temp}°</div>
                    </div>
                ))}
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
            setUsage(prev => Math.max(10, Math.min(95, prev + (Math.random() - 0.5) * 20)));
        }, 1500);
        return () => clearInterval(timer);
    }, []);

    const getColor = (val: number) => {
        if (val < 50) return '#4ade80';
        if (val < 80) return '#fbbf24';
        return '#ef4444';
    };

    // Small: Just percentage ring
    if (size === 'small') {
        const circumference = 2 * Math.PI * 40;
        const offset = circumference - (usage / 100) * circumference;

        return (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="80" height="80" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                    <motion.circle
                        cx="50" cy="50" r="40" fill="none"
                        stroke={getColor(usage)} strokeWidth="8" strokeLinecap="round"
                        strokeDasharray={circumference}
                        animate={{ strokeDashoffset: offset }}
                        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                    />
                    <text x="50" y="55" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="300">
                        {Math.round(usage)}%
                    </text>
                </svg>
            </div>
        );
    }

    // Medium/Large: Multiple cores
    const coreCount = size === 'large' ? 8 : 4;
    const [cores] = useState(() => Array(coreCount).fill(0).map(() => Math.random() * 100));

    return (
        <div style={{
            width: '100%', height: '100%', padding: '12px',
            display: 'flex', flexDirection: 'column', gap: '8px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '28px', fontWeight: '200', color: '#fff' }}>{Math.round(usage)}%</span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>CPU</span>
            </div>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: `repeat(${Math.sqrt(coreCount)}, 1fr)`, gap: '4px' }}>
                {cores.map((core, i) => (
                    <motion.div
                        key={i}
                        style={{
                            borderRadius: '4px',
                            background: `linear-gradient(180deg, ${getColor(core)} 0%, rgba(255,255,255,0.05) 100%)`,
                        }}
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                    />
                ))}
            </div>
        </div>
    );
}

// ==================== NETWORK WIDGET ====================
export function ActivityWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [data, setData] = useState<{ up: number; down: number }[]>([]);
    const size = getSize(width, height);

    useEffect(() => {
        const points = size === 'large' ? 30 : 15;
        setData(Array(points).fill(0).map(() => ({ up: Math.random() * 50, down: Math.random() * 80 })));

        const timer = setInterval(() => {
            setData(prev => [...prev.slice(1), { up: Math.random() * 50, down: Math.random() * 80 }]);
        }, 500);
        return () => clearInterval(timer);
    }, [size]);

    const currentUp = data[data.length - 1]?.up || 0;
    const currentDown = data[data.length - 1]?.down || 0;

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div>
                    <span style={{ fontSize: '10px', color: '#4ade80' }}>↑</span>
                    <span style={{ fontSize: '14px', color: '#fff', marginLeft: '4px' }}>{currentUp.toFixed(1)}</span>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginLeft: '2px' }}>MB/s</span>
                </div>
                <div>
                    <span style={{ fontSize: '10px', color: '#60a5fa' }}>↓</span>
                    <span style={{ fontSize: '14px', color: '#fff', marginLeft: '4px' }}>{currentDown.toFixed(1)}</span>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginLeft: '2px' }}>MB/s</span>
                </div>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                {data.map((d, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1px', height: '100%', justifyContent: 'flex-end' }}>
                        <motion.div
                            style={{ background: '#4ade80', borderRadius: '1px', minHeight: '2px' }}
                            animate={{ height: `${(d.up / 100) * 100}%` }}
                        />
                        <motion.div
                            style={{ background: '#60a5fa', borderRadius: '1px', minHeight: '2px' }}
                            animate={{ height: `${(d.down / 100) * 100}%` }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

// ==================== CRYPTO WIDGET ====================
export function CryptoWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const size = getSize(width, height);
    const [prices, setPrices] = useState([
        { symbol: 'BTC', name: 'Bitcoin', price: 43250, change: 2.5, color: '#f7931a' },
        { symbol: 'ETH', name: 'Ethereum', price: 2280, change: -1.2, color: '#627eea' },
        { symbol: 'SOL', name: 'Solana', price: 98.5, change: 5.8, color: '#00ffa3' },
    ]);

    useEffect(() => {
        const timer = setInterval(() => {
            setPrices(prev => prev.map(p => ({
                ...p,
                price: p.price * (1 + (Math.random() - 0.5) * 0.005),
                change: p.change + (Math.random() - 0.5) * 0.3
            })));
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    const displayCount = size === 'small' ? 1 : 3;

    return (
        <div style={{ width: '100%', height: '100%', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {prices.slice(0, displayCount).map((coin, i) => (
                <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px',
                    borderLeft: `3px solid ${coin.color}`
                }}>
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{coin.symbol}</div>
                        {size !== 'small' && <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{coin.name}</div>}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', color: '#fff' }}>
                            ${coin.price.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                        <div style={{ fontSize: '11px', color: coin.change >= 0 ? '#4ade80' : '#ef4444' }}>
                            {coin.change >= 0 ? '+' : ''}{coin.change.toFixed(2)}%
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ==================== BATTERY WIDGET ====================
export function BatteryWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [battery, setBattery] = useState({ level: 0.85, charging: true });

    useEffect(() => {
        if ('getBattery' in navigator) {
            (navigator as any).getBattery().then((bat: any) => {
                setBattery({ level: bat.level, charging: bat.charging });
            });
        }
    }, []);

    const percentage = Math.round(battery.level * 100);
    const color = percentage > 50 ? '#4ade80' : percentage > 20 ? '#fbbf24' : '#ef4444';

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <div style={{ position: 'relative', width: '64px', height: '32px', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '4px' }}>
                <div style={{ position: 'absolute', right: '-6px', top: '8px', width: '4px', height: '16px', background: 'rgba(255,255,255,0.3)', borderRadius: '0 2px 2px 0' }} />
                <motion.div
                    style={{ height: '100%', background: color, borderRadius: '2px' }}
                    animate={{ width: `${percentage}%` }}
                />
            </div>
            <span style={{ fontSize: '20px', fontWeight: '300', color: '#fff' }}>
                {percentage}%{battery.charging && ' ⚡'}
            </span>
        </div>
    );
}

// ==================== SYSTEM STATS WIDGET ====================
export function SystemStatsWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [stats] = useState({ cpu: 45, memory: 62, disk: 78 });

    return (
        <div style={{ width: '100%', height: '100%', padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
                { label: 'CPU', value: stats.cpu, color: '#60a5fa' },
                { label: 'Memory', value: stats.memory, color: '#a78bfa' },
                { label: 'Disk', value: stats.disk, color: '#4ade80' },
            ].map((stat, i) => (
                <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{stat.label}</span>
                        <span style={{ fontSize: '12px', color: '#fff' }}>{stat.value}%</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                        <motion.div
                            style={{ height: '100%', background: stat.color, borderRadius: '2px' }}
                            animate={{ width: `${stat.value}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

// ==================== NOTES WIDGET ====================
export function NotesWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [notes, setNotes] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div style={{
            width: '100%', height: '100%', padding: '12px',
            background: 'linear-gradient(135deg, rgba(255,235,59,0.1) 0%, rgba(255,193,7,0.05) 100%)'
        }}>
            {isEditing ? (
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    onBlur={() => setIsEditing(false)}
                    placeholder="Type your notes..."
                    autoFocus
                    style={{
                        width: '100%', height: '100%',
                        background: 'transparent', border: 'none',
                        color: '#fff', fontSize: '14px', resize: 'none', outline: 'none',
                        fontFamily: 'inherit', lineHeight: '1.5'
                    }}
                />
            ) : (
                <div
                    onClick={() => setIsEditing(true)}
                    style={{
                        width: '100%', height: '100%',
                        color: notes ? '#fff' : 'rgba(255,255,255,0.3)',
                        fontSize: '14px', cursor: 'text',
                        whiteSpace: 'pre-wrap', lineHeight: '1.5'
                    }}
                >
                    {notes || 'Click to add notes...'}
                </div>
            )}
        </div>
    );
}
