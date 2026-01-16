#  DOBBY - Your Free Crypto Intelligence Co-Pilot

> *"Notion meets Bloomberg Terminal meets ChatGPT — but for crypto, and free"*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Hackathon](https://img.shields.io/badge/Hackathon-2026-purple?style=flat-square)](https://hackathon.com)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [API Integration](#-api-integration)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [Demo](#-demo)
- [Team](#-team)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**DOBBY** is a free, modular crypto intelligence dashboard that unifies 10+ essential tools into a single, customizable command center. Built entirely on free APIs, DOBBY democratizes access to institutional-grade crypto analytics—eliminating the $200+/month subscription barrier.

### 🏆 Hackathon Submission

**Track:** Web3 / Fintech Innovation  
**Challenge:** Democratizing Crypto Access  
**Date:** January 2026

**Team:**
- **Akash Deep** - Full-stack Developer | SRM Institute of Science and Technology
- **Hitakshi Arora** - UI/UX Designer & Frontend Developer | SRM Institute of Science and Technology

---

## ❌ The Problem

### Current Crypto Tool Landscape is Broken

Crypto traders and investors face three critical challenges:

1. **Fragmentation Crisis**
   - Users juggle **10+ different platforms** daily
   - DexScreener for prices, DeFiLlama for yields, GoPlus for security, Twitter for alpha, Zerion for portfolios
   - Constant tab-switching causes **missed opportunities** and security blind spots

2. **Cost Barrier**
   - Professional tools cost **$200+/month** in subscriptions
   - Nansen: $150/mo | Dune Analytics: $99/mo | DexTools Pro: $49/mo
   - Excludes 88% of crypto users who can't afford multiple subscriptions

3. **One-Size-Fits-All Problem**
   - Generic dashboards don't serve diverse user needs
   - Complete beginners ≠ Meme coin hunters ≠ DeFi farmers ≠ Institutional traders
   - Fixed layouts force irrelevant features on everyone

**The Pain:** Users spend more time navigating tools than making informed decisions.

---

## ✅ Our Solution

### DOBBY: Modular + AI-Powered + Free

DOBBY solves fragmentation, cost, and customization problems through three core innovations:

#### 1. 🧩 **Modular Architecture**
- **62+ draggable tiles** across 9 categories
- Users build **their own** perfect dashboard
- Beginners use 3 tiles, pro traders use 20+ tiles
- Save and switch between layout presets (e.g., "Degen Mode" vs "Chill Mode")

#### 2. 🤖 **Contextual AI Agents**
- AI agents **embedded inside each tile** (not a separate chatbot)
- Direct access to tile data for contextual intelligence
- Natural language queries: *"Is this token safe?"* → Instant 30-point security scan
- Action-capable: Execute swaps, set alerts, revoke approvals

#### 3. 💰 **100% Free Forever**
- Built entirely on **free APIs** (DeFiLlama, GoPlus, Jupiter, GeckoTerminal)
- No paywalls, no premium tiers, no "freemium" traps
- Sustainable through smart caching and rate limit optimization

---

## 🚀 Key Features

### For Every User Persona

#### 🌱 **Complete Beginners**
- Simple portfolio view with big, clear numbers
- Guided swap assistant with step-by-step help
- Educational tooltips on hover
- Automatic safety checks before every action
- "Are you sure?" warnings for risky operations

#### 🎯 **Meme Coin Hunters (Degens)**
- **Pump.fun live feed** with real-time token launches
- **One-Click Safe Ape:** See → Auto-scan → Buy in <10 seconds
- Automatic rug detection (honeypot, liquidity lock, ownership checks)
- Jupiter swap integration for Solana
- Whale transaction alerts

#### 🌾 **DeFi Yield Farmers**
- **Yield Opportunity Matrix** across 5000+ pools
- Compare APY, TVL, risk score, and IL instantly
- Position health monitoring (liquidation warnings)
- Impermanent loss calculator
- Stablecoin depeg alerts

#### 📱 **Social Alpha Hunters**
- Farcaster crypto feed integration
- Twitter/CT alpha monitor
- Whale wallet tracking with context (*"This wallet bought PEPE before 100x"*)
- Token mention sentiment analysis
- Cast directly to Farcaster from DOBBY

#### 💎 **Long-Term Investors (HODLers)**
- Cost basis tracking for taxes
- Governance proposal notifications
- **Airdrop eligibility checker** (auto-scans wallet for qualification)
- Token unlock calendar
- Portfolio rebalancing suggestions

---

## 🔧 Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.0
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4.0
- **State Management:**
