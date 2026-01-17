
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickSeries } from 'lightweight-charts';
import { ArrowUp, ArrowDown, Activity, BarChart2, Layers, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AnalyticsWidget.module.css';

// --- Types ---
interface Coin {
    symbol: string;
    binanceSymbol: string;
    name: string;
    color: string;
}

const COINS: Coin[] = [
    { symbol: 'SOL', binanceSymbol: 'solusdt', name: 'Solana', color: '#9945FF' },
    { symbol: 'BTC', binanceSymbol: 'btcusdt', name: 'Bitcoin', color: '#F7931A' },
    { symbol: 'ETH', binanceSymbol: 'ethusdt', name: 'Ethereum', color: '#627EEA' },
    { symbol: 'DOGE', binanceSymbol: 'dogeusdt', name: 'Dogecoin', color: '#C2A633' },
    { symbol: 'PEPE', binanceSymbol: 'pepeusdt', name: 'Pepe', color: '#4CAF50' },
];

interface Trade {
    id: number;
    price: number;
    qty: number;
    isBuyerMaker: boolean;
    time: number;
}

interface Ticker24h {
    priceChange: string;
    priceChangePercent: string;
    openPrice: string;
    highPrice: string;
    lowPrice: string;
    volume: string;
    quoteVolume: string;
}

// --- Components ---


// --- Inline Helpers Replaced by CSS Modules ---
const StatsCard = ({ label, value, subValue }: { label: string, value: string, subValue?: string }) => (
    <div className={styles.statCard}>
        <span className={styles.statLabel}>{label}</span>
        <div className={styles.statValue}>{value}</div>
        {subValue && <span className={styles.statSub}>{subValue}</span>}
    </div>
);


export const AnalyticsWidget = () => {
    const [selectedCoin, setSelectedCoin] = useState(COINS[0]);
    const [price, setPrice] = useState<number | null>(null);
    const [trades, setTrades] = useState<Trade[]>([]);
    const [ticker, setTicker] = useState<Ticker24h | null>(null);
    const chartContainerRef = useRef<HTMLDivElement>(null);

    // Using refs for WebSocket management
    const wsRef = useRef<WebSocket | null>(null);
    const chartRef = useRef<any | null>(null);
    const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

    // --- WebSocket Logic ---
    useEffect(() => {
        // Close existing
        if (wsRef.current) wsRef.current.close();

        // Connect new
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${selectedCoin.binanceSymbol}@trade/${selectedCoin.binanceSymbol}@kline_1m/${selectedCoin.binanceSymbol}@ticker`);
        wsRef.current = ws;

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            // Trade
            if (data.e === 'trade') {
                const trade: Trade = {
                    id: data.t,
                    price: parseFloat(data.p),
                    qty: parseFloat(data.q),
                    isBuyerMaker: data.m,
                    time: data.T
                };
                setPrice(trade.price);
                setTrades(prev => [trade, ...prev].slice(0, 50));

                // Kline (Candle) - Update Chart
            } else if (data.e === 'kline') {
                const candle = data.k;
                if (seriesRef.current) {
                    seriesRef.current.update({
                        time: candle.t / 1000 as any,
                        open: parseFloat(candle.o),
                        high: parseFloat(candle.h),
                        low: parseFloat(candle.l),
                        close: parseFloat(candle.c),
                    });
                }

                // Ticker (24h Stats)
            } else if (data.e === '24hrTicker') {
                setTicker({
                    priceChange: data.p,
                    priceChangePercent: data.P,
                    openPrice: data.o,
                    highPrice: data.h,
                    lowPrice: data.l,
                    volume: data.v,
                    quoteVolume: data.q
                });
            }
        };

        return () => {
            if (wsRef.current) wsRef.current.close();
        };
    }, [selectedCoin]);

    // --- Chart Initialization ---
    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'transparent' },
                textColor: '#71717a',
            },
            grid: {
                vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
                horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
            },
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
        });

        const newSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#4ade80',
            downColor: '#ef4444',
            borderVisible: false,
            wickUpColor: '#4ade80',
            wickDownColor: '#ef4444'
        });

        chartRef.current = chart;
        seriesRef.current = newSeries;

        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current!.clientWidth, height: chartContainerRef.current!.clientHeight });
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, []);

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.coinSelector}>
                    {COINS.map(coin => (
                        <button
                            key={coin.symbol}
                            onClick={() => setSelectedCoin(coin)}
                            className={`${styles.coinBtn} ${selectedCoin.symbol === coin.symbol ? styles.coinBtnActive : ''}`}
                        >
                            <div className={styles.coinDot} style={{ backgroundColor: coin.color }} />
                            {coin.name}
                        </button>
                    ))}
                </div>
                <div className={styles.priceDisplay}>
                    <div className={styles.priceValue} style={{ color: selectedCoin.color }}>
                        ${price?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '---'}
                    </div>
                    <div className={styles.priceChange}>
                        {parseFloat(ticker?.priceChangePercent || '0') >= 0 ?
                            <span className={styles.textGreen}>▲</span> :
                            <span className={styles.textRed}>▼</span>
                        }
                        <span className={parseFloat(ticker?.priceChangePercent || '0') >= 0 ? styles.textGreen : styles.textRed}>
                            {ticker?.priceChangePercent || '0.00'}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className={styles.grid}>

                {/* 1. Main Chart */}
                <div className={styles.chartArea}>
                    <div className={styles.chartOverlay}>
                        <span className={styles.chartBadge}>1m</span>
                        <span className={styles.chartBadge} style={{ fontWeight: 400 }}>Binance Spot</span>
                    </div>
                    <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }} />
                </div>

                {/* 2. Stats Column */}
                <div className={styles.statsArea}>
                    <div className={styles.statsGrid}>
                        <StatsCard label="24h High" value={parseFloat(ticker?.highPrice || '0').toLocaleString()} />
                        <StatsCard label="24h Low" value={parseFloat(ticker?.lowPrice || '0').toLocaleString()} />
                        <StatsCard label="Volume (BTC)" value={(parseFloat(ticker?.volume || '0') / 1000).toFixed(1) + 'k'} subValue="BTC" />
                        <StatsCard label="Volume (USDT)" value={(parseFloat(ticker?.quoteVolume || '0') / 1000000).toFixed(1) + 'M'} subValue="USDT" />
                    </div>

                    {/* Order Book Depth */}
                    <div className={styles.orderBook}>
                        <div className={styles.sectionTitle}>
                            <Layers size={12} /> Depth
                        </div>
                        <div className={styles.depthVis}>
                            {Array.from({ length: 40 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={styles.depthBar}
                                    style={{
                                        height: `${10 + Math.random() * 90}%`,
                                        backgroundColor: i < 20 ? '#10b981' : '#ef4444'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Recent Trades */}
                <div className={styles.tradesArea}>
                    <div className={styles.sectionTitle} style={{ justifyContent: 'space-between' }}>
                        <span className="flex items-center gap-1"><Zap size={12} /> Trades</span>
                        <div className="flex items-center gap-2">
                            <span className={styles.liveDot} />
                            <span style={{ color: '#10b981' }}>LIVE</span>
                        </div>
                    </div>
                    <div className={styles.tradeHeader}>
                        <span>Price</span>
                        <span className="text-center">Qty</span>
                        <span className="text-right">Time</span>
                    </div>
                    <div className={styles.tradeScroll}>
                        <AnimatePresence initial={false}>
                            {trades.slice(0, 50).map((t) => (
                                <motion.div
                                    key={t.id}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={styles.tradeRow}
                                >
                                    <span className={t.isBuyerMaker ? styles.textRed : styles.textGreen}>
                                        {t.price.toFixed(t.price < 1 ? 6 : 2)}
                                    </span>
                                    <span className={`${styles.textZinc} text-center`}>{t.qty.toFixed(4)}</span>
                                    <span className={`${styles.textZinc} text-right`}>
                                        {new Date(t.time).toLocaleTimeString([], { hour12: false, formatMatcher: 'basic' }).split(' ')[0]}
                                    </span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* 4. Momentum Meter */}
                <div className={styles.meterArea}>
                    <div className={styles.sectionTitle}>
                        <Activity size={12} /> Momentum
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <svg viewBox="0 0 100 60" style={{ width: '100%', overflow: 'visible' }}>
                            {/* Background Arc */}
                            <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" strokeLinecap="round" />

                            {/* Active Arc */}
                            <path
                                d="M 10 50 A 40 40 0 0 1 90 50"
                                fill="none"
                                stroke={selectedCoin.color}
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray="126"
                                strokeDashoffset={126 - (126 * Math.min(Math.max((parseFloat(ticker?.priceChangePercent || '0') + 5) / 10, 0), 1))}
                                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                            />

                            <text x="50" y="45" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="monospace">
                                {ticker?.priceChangePercent || '0.00'}%
                            </text>
                            <text x="50" y="62" textAnchor="middle" fill="#71717a" fontSize="7" letterSpacing="1px">24H CHANGE</text>
                        </svg>
                    </div>
                </div>

            </div>
        </div>
    );
};
