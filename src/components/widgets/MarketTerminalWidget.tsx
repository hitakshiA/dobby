import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi } from 'lightweight-charts';
import { motion } from 'framer-motion';

// Enforce 4x4
const WIDGET_SIZE = '4x4';

interface OHLCV {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
}

export const MarketTerminalWidget: React.FC<{ width?: number; height?: number }> = ({ width, height }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const candlesticksRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

    // Default: SOL/USDC on Solana
    const [network] = useState('solana');
    const [poolAddress] = useState('58oQChx4yWmvKdwLLZzBi4ChoCcKTk3Vm82J878dBx8C'); // Raydium SOL/USDC
    const [data, setData] = useState<OHLCV[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            const res = await fetch(`/api/geckoterminal/ohlcv?network=${network}&pool_address=${poolAddress}&timeframe=hour&limit=100`);
            const json = await res.json();

            if (json.data?.attributes?.ohlcv_list) {
                // GeckoTerminal returns [time, open, high, low, close, volume]
                const formatted: OHLCV[] = json.data.attributes.ohlcv_list
                    .map((item: number[]) => ({
                        time: item[0],
                        open: item[1],
                        high: item[2],
                        low: item[3],
                        close: item[4],
                    }))
                    .sort((a: OHLCV, b: OHLCV) => a.time - b.time); // Ensure ascending order

                setData(formatted);
            }
        } catch (e) {
            console.error('Failed to fetch OHLCV:', e);
        } finally {
            setLoading(false);
        }
    }, [network, poolAddress]);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60000); // 1m refresh
        return () => clearInterval(interval);
    }, [fetchData]);

    // Initialize Chart
    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'transparent' },
                textColor: '#999',
            },
            grid: {
                vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
                horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
            },
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            timeScale: {
                borderColor: 'rgba(255, 255, 255, 0.1)',
                timeVisible: true,
            },
            rightPriceScale: {
                borderColor: 'rgba(255, 255, 255, 0.1)',
            },
        });

        const candlestickSeries = chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });

        chartRef.current = chart;
        candlesticksRef.current = candlestickSeries;

        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                    height: chartContainerRef.current.clientHeight
                });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, []);

    // Update Data
    useEffect(() => {
        if (candlesticksRef.current && data.length > 0) {
            // @ts-ignore - Lightweight charts type mismatch with Time
            candlesticksRef.current.setData(data as any);
            chartRef.current?.timeScale().fitContent();
        }
    }, [data]);

    return (
        <div className="w-full h-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col overflow-hidden relative group">
            <div className="flex items-center justify-between mb-4 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                    </div>
                    <div>
                        <h3 className="text-white font-medium text-lg leading-tight">SOL / USDC</h3>
                        <p className="text-white/40 text-xs font-mono">Raydium • 1H</p>
                    </div>
                </div>
                {loading && (
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                )}
            </div>

            <div className="flex-1 w-full h-full min-h-0 relative" ref={chartContainerRef}>
                {/* Chart renders here */}
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
    );
};
