# 🦅 DOBBY - The Agentic Crypto Intelligence OS

> *"Not just a dashboard — an intelligent partner powered by OnDemand AI"*

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Auth0](https://img.shields.io/badge/Auth0-Secured-orange?style=flat-square&logo=auth0)](https://auth0.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Agentic AI System](#-agentic-ai-system)
- [Widget Ecosystem](#-widget-ecosystem)
- [Tech Stack](#-tech-stack)
- [API Architecture](#-api-architecture)
- [Getting Started](#-getting-started)
- [Team](#-team)

---

## 🎯 Overview

**DOBBY** is a modular, agentic crypto operating system that unifies the entire ecosystem into a single, intelligent interface. It combines 40+ real-time data widgets with an AI agent powered by **OnDemand AI** — allowing users to link any widget to the AI and ask context-aware questions.

Designed with a **"Degen-Futuristic"** aesthetic, Dobby transforms static dashboards into active, intelligent partners.

---

## ✨ Key Features

### 🔐 Auth0 Authentication
Secure login flow with Auth0. Click `[ ENTER ]` to authenticate before accessing the dashboard.

### 🤖 Agentic AI Chat
The central AI Agent can be linked to any widget on the dashboard. When linked, the agent gains access to that widget's data and can answer complex, synthesized questions.

### 👁️ Vision Op (Multimodal)
Drag and drop any screenshot into the Vision Agent to get instant chart pattern analysis, UI feedback, or data extraction.

---

## 🧠 Agentic AI System

DOBBY's AI is not just a chatbot — it's a **context-aware agent** that adapts based on linked widgets.

### The 6 Agent Personas

| Persona | Linked Widgets | Capability |
| :--- | :--- | :--- |
| **🕵️ The Auditor** | Security Audit, DeFi Hacks, GoPlus | Smart contract vetting & exploit detection |
| **🌾 The Yield Hunter** | Top Yields, Gas Tracker, L2 TVL | Net yield optimization across chains |
| **🧠 The Strategist** | Market Dominance, Funding Rates, OI | Macro analysis & leverage traps |
| **🔫 The Sniper** | New Tokens, Solana Speed, DexScreener | High-speed Solana opportunity detection |
| **🎨 The Curator** | Magic Eden, Blue Chips, NFT Trending | NFT sentiment & retention analysis |
| **👁️ The Visionary** | Vision Op (Image Input) | Multimodal chart & screenshot analysis |

### How It Works
1. Add widgets to your dashboard via the **Widget Center**.
2. Click the **🔗 Link** icon on any widget to connect it to the AI Agent.
3. Ask the agent a question — it will use all linked widgets as context.

---

## 🔧 Widget Ecosystem

### 📊 Markets
- Market Terminal, Dominance, Order Book Depth, Funding Rates, Stablecoin Monitor, Open Interest

### 🌐 Ecosystem
- Solana Scope, L2 Beat, DAO Treasuries, NFT Blue Chips, Gas Stations, Osmosis Zone

### 🛡️ Security
- GoPlus Scanner, DeFi Hacks, Token Unlocks, RugCheck Gateway

### 🦍 Degen
- Pump.fun Terminal, Birdeye Radar, New Pairs, Polymarket Odds

---

## 🔧 Tech Stack

### Core Framework
- **Next.js 16**: App Router, Server Actions, Turbopack
- **React 19**: Concurrent features for smooth UI
- **TypeScript**: Strict type safety

### AI & Auth
- **OnDemand AI**: Plugin-based agentic chat system
- **Auth0**: Secure authentication with `proxy.ts` (Next.js 16)

### Frontend
- **CSS Modules**: Glassmorphism design system
- **React Grid Layout**: Drag-and-drop widget grid
- **Framer Motion**: Cinematic animations

### Real-Time
- **WebSockets**: Live streaming (Binance, Mempool)
- **Server Proxies**: API key security via Next.js routes

---

## 🔌 API Architecture

| Provider | Purpose |
| :--- | :--- |
| **OnDemand AI** | Agentic chat, tool orchestration |
| **Helius** | Solana RPC, TPS, Network Status |
| **Jupiter** | Token Swaps, Price Quotes |
| **Birdeye** | Verified Token Trends |
| **DeFiLlama** | TVL, Yields, Hacks, Treasuries |
| **CoinGecko** | Global Market Data, NFT Floors |
| **GoPlus** | Security Scanning |
| **Binance** | CEX Market Data (WebSocket) |
| **Auth0** | User Authentication |

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/dobby.git
cd dobby
npm install
```

### 2. Environment Setup
Create a `.env.local` file:
```env
# OnDemand AI
NEXT_PUBLIC_ONDEMAND_API_KEY=your_key_here

# Solana
NEXT_PUBLIC_HELIUS_API_KEY=your_key_here

# Auth0 (Required)
AUTH0_SECRET=use_openssl_rand_hex_32
AUTH0_DOMAIN=your_domain.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret
APP_BASE_URL=http://localhost:3000
```

### 3. Configure Auth0
In your Auth0 Dashboard:
- **Allowed Callback URLs:** `http://localhost:3000/auth/callback`
- **Allowed Logout URLs:** `http://localhost:3000`

### 4. Run
```bash
npm run dev
```
Navigate to `http://localhost:3000` and click `[ ENTER ]` to begin.

---

## 👥 Team

**OnDemand AI Hackathon 2026**

- **Akash Deep** - Full Stack Engineer
- **Hitakshi Arora** - UI/UX Designer & Frontend Developer

---

*Power to the Players. Controlled by Dobby.* 🦅
