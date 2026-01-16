'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ============================================
// NEWS WIDGET
// API: CryptoPanic (Key Required / Mock Fallback)
// Sizes: 2x2 and 4x4 ONLY
// Features: Live News Feed
// ============================================

const THEME = {
    fontMono: '"The Good Monolith", monospace',
    neon: '#00ff41',
    text: '#fff',
    textDim: 'rgba(255,255,255,0.5)',
    blue: '#3b82f6',
    purple: '#a855f7'
};

const formatTimeAgo = (dateStr: string) => {
    const diff = (new Date().getTime() - new Date(dateStr).getTime()) / 1000 / 60; // min
    if (diff < 60) return `${Math.floor(diff)}m`;
    const hours = diff / 60;
    if (hours < 24) return `${Math.floor(hours)}h`;
    return `${Math.floor(hours / 24)}d`;
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

export function NewsWidget({ width = 200, height = 200 }: { width?: number; height?: number }) {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Size detection
    const isLarge = width > 500 && height > 500; // 4x4 mode

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/cryptopanic');
                if (!response.ok) throw new Error('API Error');
                const data = await response.json();
                if (data.results) {
                    setNews(data.results);
                }
            } catch (e) {
                console.error('News error:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 300000); // 5 min refresh
        return () => clearInterval(interval);
    }, []);

    const openLink = (url: string) => {
        window.open(url, '_blank');
    };

    const displayCount = isLarge ? 8 : 4;

    return (
        <div style={{ ...baseStyle }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                    <div style={{ fontSize: isLarge ? '16px' : '12px', fontWeight: 'bold', color: THEME.purple }}>LATEST NEWS</div>
                    <div style={{ fontSize: isLarge ? '11px' : '9px', color: THEME.textDim }}>CryptoPanic</div>
                </div>
                <div style={{
                    fontSize: '8px',
                    color: THEME.textDim,
                    border: `1px solid rgba(255,255,255,0.1)`,
                    padding: '2px 6px',
                    borderRadius: '8px'
                }}>HOT</div>
                {news.length > 0 && news[0].title.includes('[DEMO]') && (
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

            {loading ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ fontSize: '9px', color: THEME.textDim }}
                    >
                        FETCHING FEED...
                    </motion.div>
                </div>
            ) : news.length === 0 ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '9px', color: THEME.textDim }}>NO NEWS</div>
                </div>
            ) : (
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }} className="no-scrollbar">
                    <style>{`
                        .no-scrollbar::-webkit-scrollbar { display: none; }
                        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                    `}</style>
                    {news.slice(0, displayCount).map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => openLink(item.url)}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(168,85,247,0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            style={{
                                cursor: 'pointer',
                                padding: '4px',
                                borderRadius: '4px',
                                transition: 'background 0.15s'
                            }}
                        >
                            <div style={{ fontSize: '11px', lineHeight: '1.2', marginBottom: '4px' }}>
                                {item.title.replace('[DEMO] ', '')}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '9px', color: THEME.textDim, background: 'rgba(255,255,255,0.1)', padding: '1px 4px', borderRadius: '4px' }}>
                                    {item.domain}
                                </span>
                                <span style={{ fontSize: '9px', color: THEME.textDim }}>
                                    {formatTimeAgo(item.created_at)} ago
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
