# 🦅 DOBBY - The Free Crypto Intelligence Terminal

> *"Notion meets Bloomberg Terminal — but for crypto, and free"*

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [Widget Ecosystem](#-widget-ecosystem)
- [Tech Stack](#-tech-stack)
- [API Architecture](#-api-architecture)
- [Getting Started](#-getting-started)
- [Team](#-team)

---

## 🎯 Overview

 **DOBBY** is a modular, high-performance crypto dashboard that unifies the entire ecosystem into a single, customizable grid. It replaces paid institutional tools with a free, open-source alternative powered by 15+ industry-leading public APIs.

Designed with a **"Degen-Futuristic"** aesthetic, Dobby provides real-time data, security scanning, and ecosystem metrics in a drag-and-drop interface.

---

## ❌ The Problem

Crypto traders and researchers suffer from **"Tab Fatigue"**:
1.  **Fragmentation**: Checking prices on DexScreener, yields on DeFiLlama, security on GoPlus, and news on CryptoPanic requires constant context switching.
2.  **Cost**: Professional terminals (Nansen, Bloomberg, Glassnode) cost **$200-$20,000/month**.
3.  **Latency**: Generic dashboards are often slow and lack real-time WebSocket capabilities.

---

## ✅ Our Solution: The Widget Center

DOBBY provides a focused command center with **40+ specialized widgets** organized into four key pillars.

### 📊 Markets
*Real-time price action and macro trends.*
-   **Market Terminal**: Professional candlestick charts (TradingView/Lightweight Charts) with volume histograms.
-   **Market Dominance**: Live BTC vs ETH vs SOL vs Stablecoin market share.
-   **Order Book Depth**: Real-time Bid/Ask visualizer for BTC, ETH, SOL (Binance WebSocket).
-   **Funding Rates**: Live futures funding rates and countdowns.
-   **Stablecoin Monitor**: Peg tracking for USDT, USDC, DAI.
-   **Open Interest**: Live derivatives open interest data.

### 🌐 Ecosystem
*Chain-specific metrics and protocol health.*
-   **Solana Scope**: TPS, Slot Height, and Network Status via Helius RPC.
-   **L2 Beat**: TVL rankings for Arbitrum, Optimism, Base, and ZK-Rollups.
-   **DAO Treasuries**: Top protocol holdings and liquid assets.
-   **NFT Blue Chips**: Floor price ticker for Punks, Apes, and Pudgy, plus Magic Eden top lists.
-   **Gas Stations**: Live gas fees for Ethereum and Base L2.
-   **Osmosis Zone**: IBC liquidity and volume metrics.

### 🛡️ Security
*Risk intelligence and safety scanners.*
-   **GoPlus Scanner**: Interactive contract scanner for honeypots and taxes.
-   **DeFi Hacks**: Live feed of recent protocol exploits and flash loan attacks.
-   **Token Unlocks**: Tracking upcoming cliff unlocks and vesting schedules.
-   **RugCheck Gateway**: Direct integration for Solana token safety scores.

### 🦍 Degen
*Alpha hunting and high-risk opportunities.*
-   **Pump.fun Terminal**: Live feed of new bonding curve launches.
-   **Birdeye Radar**: Trending tokens on Solana.
-   **New Pairs**: Fresh liquidity pools detected on GeckoTerminal.
-   **Polymarket Odds**: Prediction market sentiment and volume.

---

## 🔧 Tech Stack

Built for speed, modularity, and aesthetics.

### Core Framework
-   **Next.js 16**: Utilizing the latest App Router and Server Actions.
-   **Turbopack**: Fast incremental compilation.
-   **React 19**: leveraging concurrent features for smooth UI updates.
-   **TypeScript**: Strict type safety across the entire codebase.

### Frontend Engineering
-   **CSS Modules**: Zero-runtime overhead styling with a custom "Glassmorphism" design system.
-   **React Grid Layout**: Robust drag-and-drop grid engine for customizable layouts.
-   **Framer Motion**: Cinematic animations, layout transitions, and micro-interactions.
-   **Lightweight Charts**: High-performance financial charting engine (Canvas-based).

### Real-Time Infrastructure
-   **WebSockets**: Custom hooks for live streaming data (Binance, Mempool).
-   **Server-Side Proxies**: Next.js API Routes act as middleware to secure keys and handle CORS for 15+ external APIs.
-   **SWR / React Query**: Smart caching and revalidation strategies to respect API rate limits.

---

## 🔌 API Architecture

DOBBY is "API Agnostic" but effectively integrated with the best free tiers in crypto:

| Provider | Purpose |
| :--- | :--- |
| **Helius** | Solana RPC, TPS, Network Status |
| **Jupiter** | Token Swaps, Price Quotes (Aggregator V6) |
| **Birdeye** | Verified Token Trends, Price Data |
| **DeFiLlama** | TVL, Yields, Stablecoins, Hacks, Treasuries |
| **CoinGecko** | Global Market Data, NFT Floors, Metadata |
| **GoPlus** | Security Scanning, Honeypot Detection |
| **Mempool.space** | Bitcoin Blocks, Fee Estimates (WebSocket) |
| **Binance** | CEX Market Data, Order Books (WebSocket) |
| **Midgard** | Thorchain/Native Swap Stats |
| **Magic Eden** | NFT Collections Data |
| **CryptoPanic** | News Aggregation |

---

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/dobby.git
    cd dobby
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file with your API keys (optional for some, required for others like Helius/Birdeye):
    ```env
    NEXT_PUBLIC_HELIUS_API_KEY=your_key_here
    NEXT_PUBLIC_BIRDEYE_API_KEY=your_key_here
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

5.  **Open Dashboard**
    Navigate to `http://localhost:3000` to launch the terminal.

---

## � Team

**Hackathon Submission 2026**

-   **Akash Deep** - Full Stack Engineer
-   **Hitakshi Arora** - UI/UX Designer & Frontend Developer

---

*Power to the Players. Controlled by Dobby.* 🦅
