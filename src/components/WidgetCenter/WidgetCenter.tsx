'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './WidgetCenter.module.css';

// Widget categories matching Crypto Theme
const CATEGORIES = [
    { id: 'all', name: 'All' },
    { id: 'markets', name: 'Markets' },
    { id: 'ecosystem', name: 'Ecosystem' },
    { id: 'security', name: 'Security' },
    { id: 'degen', name: 'Degen' },
];

// Minimalist SVG Icons for Brutalist Theme
const Icons = {
    // Legacy icons removed
    // NEW: Fear & Greed Index
    // NEW: Fear & Greed Index
    feargreed: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 12 L12 6" /><path d="M12 12 L16 8" /><circle cx="12" cy="12" r="2" fill="currentColor" /></svg>,
    // NEW: DexScreener Trending
    dexscreener: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /><circle cx="19" cy="9" r="2" /></svg>,
    // NEW: Polymarket
    polymarket: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /><path d="M16 16l-4-4" /></svg>,
    // NEW: GeckoTerminal New Tokens
    newtokens: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.912 5.813a2 2 0 001.272 1.272L21 12l-5.813 1.912a2 2 0 00-1.272 1.272L12 21l-1.912-5.813a2 2 0 00-1.272-1.272L3 12l5.813-1.912a2 2 0 001.272-1.272L12 3z" /></svg>,
    // NEW: Yields
    yields: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
    // NEW: Gas
    gas: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" /><path d="M8 10V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" /><path d="M8 22v-2" /><path d="M16 22v-2" /></svg>,
    // NEW: Funding
    funding: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
    // NEW: OI
    oi: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" /></svg>,
    // NEW: Depth
    depth: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
    // NEW: Mempool
    mempool: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
    // NEW: Terminal
    terminal: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>,
    // NEW: Governance
    vote: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 5v10l-8 5-8-5V7l8-5z" /><path d="M12 22V12" /><path d="M20 7l-8 5-8-5" /><path d="M12 7v5" /></svg>,
    // NEW: Security
    shield: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    // NEW: Osmosis
    flask: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31" /><path d="M14 2v7.31" /><path d="M8.5 2h7" /><path d="M14 9.3a6.5 6.5 0 1 1-4 0" /><path d="M5.52 16h12.96" /></svg>,
    // NEW: Pump
    pill: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="10" rx="5" ry="5" /><line x1="12" y1="7" x2="12" y2="17" /></svg>,
    // NEW: Solana Phase
    jupiter: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
    lightning: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
    diamond: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 13L2 9z" /></svg>,
    eye: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
    // NEW: Phase 6
    alert: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
    lock: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
    search: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    // NEW: Phase 7/8
    pie: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>,
    bank: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21v-7" /><path d="M19 21v-7" /><path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v3H4v-3z" /><path d="M12 3L2 6h20L12 3z" /></svg>,
    cash: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>,
    gem: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 13L2 9z" /></svg>,
    // NEW: News
    news: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>,
    // NEW: Global
    global: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
    // NEW: Solana
    solana: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 18h16" /><path d="M4 14h16" /><path d="M4 10h16" /><path d="M4 6h16" /></svg>,
    // NEW: ETH Supply
    ethsupply: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12l6-9 6 9-6 9-6-9z" /></svg>,
    // NEW: NFT
    nft: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>,
    // NEW: Thorchain
    thorchain: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
    // NEW: L2
    l2: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /><path d="M5 12h14" /></svg>,
    // NEW: Cardano
    cardano: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="8" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="M2 12h2" /><path d="M20 12h2" /></svg>,
    // NEW: Trending
    trending: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2z" /><polyline points="9 17 9 5 21 17" /><polyline points="12 12 12 5 21 5" /></svg>,
    // NEW: Base Gas
    basegas: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" /><path d="M12 6v6l4 2" /></svg>,
    // NEW: Peg
    peg: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
    // NEW: Gainers
    gainers: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
    // NEW: Losers
    losers: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></svg>,
};

// Widget catalog with full metadata
export const WIDGET_CATALOG = [
    // === NEW: REAL DATA WIDGETS ===
    {
        id: 'market_terminal',
        name: 'Market Terminal',
        description: 'Professional grade candlestick charts with volume histograms for Solana pairs.',
        icon: Icons.terminal,
        category: 'markets',
        defaultSize: { w: 4, h: 4 },
        constraints: { minW: 4, maxW: 4, minH: 4, maxH: 4 }
    },
    {
        id: 'governance',
        name: 'Governance Console',
        description: 'Active proposal tracking for major DAOs via Snapshot. Tracks Aave, Uniswap, ENS.',
        icon: Icons.vote,
        category: 'ecosystem',
        defaultSize: { w: 4, h: 4 },
        constraints: { minW: 4, maxW: 4, minH: 4, maxH: 4 }
    },
    {
        id: 'security',
        name: 'Security Audit',
        description: 'Instant token safety reports. Checks for mint authority, freeze authority, and top holder concentration.',
        icon: Icons.shield,
        category: 'security',
        defaultSize: { w: 4, h: 4 },
        constraints: { minW: 4, maxW: 4, minH: 4, maxH: 4 }
    },
    {
        id: 'osmosis',
        name: 'Osmosis Liquidity',
        description: 'Cosmos ecosystem hub. Tracks Total Value Locked (TVL) and 24h Volume via Imperator API.',
        icon: Icons.flask,
        category: 'ecosystem',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'pumpfun',
        name: 'Pump.fun Terminal',
        description: 'Instant gateway to the Pump.fun meme coin launchpad. Prevents rugs.',
        icon: Icons.pill,
        category: 'degen',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 2, minH: 2, maxH: 2 }
    },
    // === PHASE 5: SOLANA ===
    {
        id: 'jupiter',
        name: 'Jupiter Quote',
        description: 'Live SOL/USDC price aggregator stats via Jupiter V6 API.',
        icon: Icons.jupiter,
        category: 'markets',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 2 }
    },
    {
        id: 'helius',
        name: 'Helius Scope',
        description: 'Network performance monitor. Tracks live TPS and slot height.',
        icon: Icons.lightning,
        category: 'ecosystem',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 2, minH: 2, maxH: 2 }
    },
    {
        id: 'magiceden',
        name: 'Magic Eden',
        description: 'Top NFT Collections by 24h volume. Floor price ticker.',
        icon: Icons.diamond,
        category: 'ecosystem',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 2, minH: 2, maxH: 4 }
    },
    {
        id: 'birdeye',
        name: 'Birdeye Radar',
        description: 'Trending tokens and degen radar.',
        icon: Icons.eye,
        category: 'degen',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 2, minH: 2, maxH: 4 }
    },
    // === PHASE 6: SECURITY ===
    {
        id: 'hacks',
        name: 'DeFi Hacks',
        description: 'Latest exploits and hacks from DeFiLlama.',
        icon: Icons.alert,
        category: 'security',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 2, minH: 2, maxH: 4 }
    },
    {
        id: 'goplus',
        name: 'GoPlus Scanner',
        description: 'Interactive token security check. Scan for honeypots and taxes.',
        icon: Icons.search,
        category: 'security',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 2 }
    },
    {
        id: 'unlocks',
        name: 'Token Unlocks',
        description: 'Upcoming major token cliff unlocks and vesting events.',
        icon: Icons.lock,
        category: 'markets',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 2, minH: 2, maxH: 2 }
    },
    // === PHASE 7/8: SOC/INST ===
    {
        id: 'dominance',
        name: 'Market Dominance',
        description: 'Market cap share spread: BTC vs ETH vs SOL vs Stablecoins.',
        icon: Icons.pie,
        category: 'markets',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 2, minH: 2, maxH: 4 }
    },
    {
        id: 'treasury',
        name: 'DAO Treasuries',
        description: 'Largest protocol treasuries and liquid holdings.',
        icon: Icons.bank,
        category: 'ecosystem',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 2, minH: 2, maxH: 4 }
    },
    {
        id: 'stables',
        name: 'Stablecoins',
        description: 'Top stablecoin rankings by market cap.',
        icon: Icons.cash,
        category: 'ecosystem',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 2, minH: 2, maxH: 2 }
    },
    {
        id: 'bluechips',
        name: 'NFT Blue Chips',
        description: 'Floor price ticker for top ETH collections (Punks, Apes, Pudgy).',
        icon: Icons.gem,
        category: 'ecosystem',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 2, minH: 2, maxH: 2 }
    },
    {
        id: 'feargreed',
        name: 'Fear & Greed',
        description: 'Live Crypto Fear & Greed Index from Alternative.me. Gauge-style visualization with color-coded sentiment.',
        icon: Icons.feargreed,
        category: 'markets',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 1, maxW: 3, minH: 1, maxH: 3 }
    },
    {
        id: 'dexscreener',
        name: 'DEX Trending',
        description: 'Live trending token pairs from DexScreener. Shows top Solana pairs by 24h volume with price changes.',
        icon: Icons.dexscreener,
        category: 'degen',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 1, maxW: 2, minH: 1, maxH: 2 }
    },
    {
        id: 'polymarket',
        name: 'Polymarket',
        description: 'Live prediction markets from Polymarket. Shows odds, volume, and clickable links to bet.',
        icon: Icons.polymarket,
        category: 'markets',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'newtokens',
        name: 'New Token Scanner',
        description: 'Live feed of newly created pools on Solana, Ethereum, and Base. Shows age, price, and FDV.',
        icon: Icons.newtokens,
        category: 'degen',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'yields',
        name: 'Top Yields Listor',
        description: 'Best DeFi yields from DeFiLlama. Filter by Stablecoins, ETH, and SOL pools.',
        icon: Icons.yields,
        category: 'markets',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'gas',
        name: 'Gas Tracker',
        description: 'Live Ethereum gas prices from Etherscan. Shows Safe, Propose, and Fast gas in Gwei.',
        icon: Icons.gas,
        category: 'network',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'funding',
        name: 'Funding Rates',
        description: 'Live Binance Futures funding rates with countdown. Tracks BTC, ETH, SOL, and top assets.',
        icon: Icons.funding,
        category: 'markets',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'oi',
        name: 'Open Interest',
        description: 'Live Options Open Interest (Notional USD) for BTC and ETH from Deribit. Smart Money indicator.',
        icon: Icons.oi,
        category: 'markets',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'depth',
        name: 'Order Book Depth',
        description: 'Live Bid/Ask Depth visualization from Binance. Shows Buy/Sell walls for BTC, ETH, SOL.',
        icon: Icons.depth,
        category: 'markets',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'mempool',
        name: 'Bitcoin Blocks',
        description: 'Live Bitcoin fees and network height from Mempool.space. Essential for on-chain users.',
        icon: Icons.mempool,
        category: 'ecosystem',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'news',
        name: 'Crypto News',
        description: 'Latest headlines from CryptoPanic. Aggregates news from top crypto sources.',
        icon: Icons.news,
        category: 'markets',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'global',
        name: 'Global Metrics',
        description: 'Total Market Cap, 24h Volume, and Bitcoin Dominance from CoinPaprika.',
        icon: Icons.global,
        category: 'markets',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'solana',
        name: 'Solana Speed',
        description: 'Live TPS (Transactions Per Second) from Helius RPC. Shows network throughput.',
        icon: Icons.solana,
        category: 'ecosystem',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'ethsupply',
        name: 'ETH Supply',
        description: 'Live Ethereum Total Supply and Market Cap from Etherscan.',
        icon: Icons.ethsupply,
        category: 'ecosystem',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'nft',
        name: 'NFT Trending',
        description: 'Top NFT collections by 24h volume from CoinGecko. Shows floor prices and changes.',
        icon: Icons.nft,
        category: 'ecosystem',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'thorchain',
        name: 'Thorchain Volume',
        description: 'Live Swap Volume and RUNE Price from Midgard. Shows cross-chain activity.',
        icon: Icons.thorchain,
        category: 'ecosystem',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'l2',
        name: 'L2 TVL',
        description: 'Top Ethereum Layer 2 rankings by TVL from DeFiLlama. Includes Arthitrum, Optimism, Base.',
        icon: Icons.l2,
        category: 'ecosystem',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'cardano',
        name: 'Cardano Epoch',
        description: 'Live Cardano Epoch progress and transaction counts from Blockfrost.',
        icon: Icons.cardano,
        category: 'ecosystem',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'trending',
        name: 'Trending Search',
        description: 'Top searched coins on CoinGecko in real-time. Spot heat before it happens.',
        icon: Icons.trending,
        category: 'markets',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'basegas',
        name: 'Base Gas',
        description: 'Live Base Mainnet L2 Gas Fees. Essential for on-chain users.',
        icon: Icons.basegas,
        category: 'ecosystem',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'peg',
        name: 'Stablecoin Pegs',
        description: 'Live peg monitoring for major stablecoins (USDT, USDC, DAI).',
        icon: Icons.peg,
        category: 'markets',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'gainers',
        name: 'Top Gainers',
        description: 'Crypto assets with the highest 24h price increase.',
        icon: Icons.gainers,
        category: 'markets',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'losers',
        name: 'Top Losers',
        description: 'Crypto assets with the highest 24h price decrease.',
        icon: Icons.losers,
        category: 'markets',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
];

interface WidgetCenterProps {
    isOpen: boolean;
    onClose: () => void;
    onAddWidget: (widgetId: string) => void;
}

export function WidgetCenter({ isOpen, onClose, onAddWidget }: WidgetCenterProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedWidget, setSelectedWidget] = useState<string | null>(null);

    // Filter widgets based on search and category
    const filteredWidgets = useMemo(() => {
        return WIDGET_CATALOG.filter(widget => {
            const matchesSearch = widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                widget.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'all' || widget.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    const handleWidgetClick = (widgetId: string) => {
        if (selectedWidget === widgetId) {
            // Second click - collapse description (toggle off)
            setSelectedWidget(null);
        } else {
            // First click - expand description
            setSelectedWidget(widgetId);
        }
    };

    const handleDragStart = (e: React.DragEvent, widgetId: string) => {
        e.dataTransfer.setData('widgetId', widgetId);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Full-screen backdrop with strong blur */}
                    <div className={styles.backdrop} onClick={onClose} />

                    {/* Widget Center Container */}
                    <motion.div
                        className={styles.container}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.1 }}
                    >
                        {/* Header with Search */}
                        <div className={styles.header}>
                            <h1 className={styles.title}>Widgets</h1>
                            <div className={styles.searchContainer}>
                                <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="M21 21l-4.35-4.35" />
                                </svg>
                                <input
                                    type="text"
                                    className={styles.searchInput}
                                    placeholder="Search widgets..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Category Tabs */}
                        <div className={styles.categories}>
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`${styles.categoryTab} ${activeCategory === cat.id ? styles.active : ''}`}
                                    onClick={() => setActiveCategory(cat.id)}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Widget Grid */}
                        <div className={styles.widgetGrid}>
                            {filteredWidgets.map((widget) => (
                                <motion.div
                                    key={widget.id}
                                    className={`${styles.widgetCard} ${selectedWidget === widget.id ? styles.selected : ''}`}
                                    onClick={() => handleWidgetClick(widget.id)}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e as any, widget.id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    layout
                                >
                                    <div className={styles.widgetIcon}>{widget.icon}</div>
                                    <div className={styles.widgetName}>{widget.name}</div>

                                    {/* Expanded description */}
                                    <AnimatePresence>
                                        {selectedWidget === widget.id && (
                                            <motion.div
                                                className={styles.widgetDescription}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                            >
                                                <p>{widget.description}</p>
                                                <div className={styles.widgetMeta}>
                                                    <span>Size: {widget.defaultSize.w}×{widget.defaultSize.h}</span>
                                                    <button
                                                        className={styles.addButton}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onAddWidget(widget.id);
                                                            onClose();
                                                        }}
                                                    >
                                                        + Add
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>

                        {/* Hint text */}
                        <div className={styles.hint}>
                            Click to expand • Drag to place • Double-click to add
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Widget Center Button Icon
export function WidgetCenterIcon() {
    return (
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="url(#wc-gradient)" />
            <rect x="4" y="4" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.9" />
            <rect x="14" y="4" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.7" />
            <rect x="4" y="14" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.7" />
            <rect x="14" y="14" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.5" />
            <defs>
                <linearGradient id="wc-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#667eea" />
                    <stop offset="1" stopColor="#764ba2" />
                </linearGradient>
            </defs>
        </svg>
    );
}
