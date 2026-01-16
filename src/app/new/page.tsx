'use client';

import React, { useState, useCallback } from 'react';
import styles from './new.module.css';
import Link from 'next/link';
import Dock from '@/components/Dock/Dock';
import { InteractiveGrid } from '@/components/Grid/InteractiveGrid';
import { Tile } from '@/components/Grid/Tile';
import { FearGreedWidget } from '@/components/widgets/FearGreedWidget';
import { DexScreenerWidget } from '@/components/widgets/DexScreenerWidget';
import { PolymarketWidget } from '@/components/widgets/PolymarketWidget';
import { NewTokensWidget } from '@/components/widgets/NewTokensWidget';
import { YieldsWidget } from '@/components/widgets/YieldsWidget';
import { GasWidget } from '@/components/widgets/GasWidget';
import { FundingWidget } from '@/components/widgets/FundingWidget';
import { OpenInterestWidget } from '@/components/widgets/OpenInterestWidget';
import { DepthWidget } from '@/components/widgets/DepthWidget';
import { MempoolWidget } from '@/components/widgets/MempoolWidget';
import { NewsWidget } from '@/components/widgets/NewsWidget';
import { GlobalWidget } from '@/components/widgets/GlobalWidget';
import { SolanaWidget } from '@/components/widgets/SolanaWidget';
import { EthSupplyWidget } from '@/components/widgets/EthSupplyWidget';
import { NftWidget } from '@/components/widgets/NftWidget';
import { ThorchainWidget } from '@/components/widgets/ThorchainWidget';
import { L2Widget } from '@/components/widgets/L2Widget';
import { CardanoWidget } from '@/components/widgets/CardanoWidget';
import { TrendingWidget } from '@/components/widgets/TrendingWidget';
import { BaseGasWidget } from '@/components/widgets/BaseGasWidget';
import { PegWidget } from '@/components/widgets/PegWidget';
import { GainersWidget } from '@/components/widgets/GainersWidget';
import { LosersWidget } from '@/components/widgets/LosersWidget';
import { MarketTerminalWidget } from '@/components/widgets/MarketTerminalWidget';
import { GovernanceWidget } from '@/components/widgets/GovernanceWidget';
import { SecurityWidget } from '@/components/widgets/SecurityWidget';
import { OsmosisWidget } from '@/components/widgets/OsmosisWidget';
import { PumpFunWidget } from '@/components/widgets/PumpFunWidget';
import { JupiterWidget } from '@/components/widgets/JupiterWidget';
import { HeliusWidget } from '@/components/widgets/HeliusWidget';
import { MagicEdenWidget } from '@/components/widgets/MagicEdenWidget';
import { BirdeyeWidget } from '@/components/widgets/BirdeyeWidget';
import { HacksWidget } from '@/components/widgets/HacksWidget';
import { GoPlusWidget } from '@/components/widgets/GoPlusWidget';
import { TokenUnlocksWidget } from '@/components/widgets/TokenUnlocksWidget';
import { DominanceWidget } from '@/components/widgets/DominanceWidget';
import { TreasuryWidget } from '@/components/widgets/TreasuryWidget';
import { StablecoinWidget } from '@/components/widgets/StablecoinWidget';
import { BlueChipWidget } from '@/components/widgets/BlueChipWidget';
import { WidgetCenter, WIDGET_CATALOG } from '@/components/WidgetCenter';

// Widget factory mapping IDs to components
const WidgetFactory: Record<string, React.FC<{ width?: number; height?: number }>> = {
    // Real Data Widgets
    dominance: DominanceWidget,
    treasury: TreasuryWidget,
    stables: StablecoinWidget,
    bluechips: BlueChipWidget,
    hacks: HacksWidget,
    goplus: GoPlusWidget,
    unlocks: TokenUnlocksWidget,
    jupiter: JupiterWidget,
    helius: HeliusWidget,
    magiceden: MagicEdenWidget,
    birdeye: BirdeyeWidget,
    osmosis: OsmosisWidget,
    pumpfun: PumpFunWidget,
    security: SecurityWidget,
    governance: GovernanceWidget,
    market_terminal: MarketTerminalWidget,
    feargreed: FearGreedWidget,
    dexscreener: DexScreenerWidget,
    polymarket: PolymarketWidget,
    newtokens: NewTokensWidget,
    yields: YieldsWidget,
    gas: GasWidget,
    funding: FundingWidget,
    oi: OpenInterestWidget,
    depth: DepthWidget,
    mempool: MempoolWidget,
    news: NewsWidget,
    global: GlobalWidget,
    solana: SolanaWidget,
    ethsupply: EthSupplyWidget,
    nft: NftWidget,
    thorchain: ThorchainWidget,
    l2: L2Widget,
    cardano: CardanoWidget,
    trending: TrendingWidget,
    basegas: BaseGasWidget,
    peg: PegWidget,
    gainers: GainersWidget,
    losers: LosersWidget,
};

interface ActiveWidget {
    id: string;
    instanceId: string;
    x: number;
    y: number;
}

export default function NewDashboard() {
    const [isWidgetCenterOpen, setIsWidgetCenterOpen] = useState(false);
    const [activeWidgets, setActiveWidgets] = useState<ActiveWidget[]>([]); // Start empty per request

    const handleAddWidget = useCallback((widgetId: string) => {
        const instanceId = `${widgetId}-${Date.now()}`;
        const catalogEntry = WIDGET_CATALOG.find(c => c.id === widgetId);
        const newW = catalogEntry?.defaultSize.w || 2;
        const newH = catalogEntry?.defaultSize.h || 2;

        // Find first available position (scan grid for empty spot)
        setActiveWidgets(prev => {
            // Create a simple occupancy map
            const occupied = new Set<string>();
            prev.forEach(w => {
                const cat = WIDGET_CATALOG.find(c => c.id === w.id);
                const wW = cat?.defaultSize.w || 1;
                const wH = cat?.defaultSize.h || 1;
                for (let dx = 0; dx < wW; dx++) {
                    for (let dy = 0; dy < wH; dy++) {
                        occupied.add(`${w.x + dx},${w.y + dy}`);
                    }
                }
            });

            // Find first position where new widget fits
            const cols = 12;
            for (let y = 0; y < 100; y++) {
                for (let x = 0; x <= cols - newW; x++) {
                    let fits = true;
                    for (let dx = 0; dx < newW && fits; dx++) {
                        for (let dy = 0; dy < newH && fits; dy++) {
                            if (occupied.has(`${x + dx},${y + dy}`)) {
                                fits = false;
                            }
                        }
                    }
                    if (fits) {
                        return [...prev, { id: widgetId, instanceId, x, y }];
                    }
                }
            }
            // Fallback: place at end
            const maxY = prev.reduce((max, w) => Math.max(max, w.y + 2), 0);
            return [...prev, { id: widgetId, instanceId, x: 0, y: maxY }];
        });
    }, []);

    const handleDeleteWidget = useCallback((instanceId: string) => {
        setActiveWidgets(prev => prev.filter(w => w.instanceId !== instanceId));
    }, []);

    // Handle drag-drop from Widget Center
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingOver(false);
        const widgetId = e.dataTransfer.getData('widgetId');
        if (widgetId) {
            handleAddWidget(widgetId);
        }
    }, [handleAddWidget]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingOver(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDraggingOver(false);
    }, []);

    return (
        <div
            className={`${styles.container} ${isDraggingOver ? styles.draggingOver : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            {/* Background */}
            <div className={styles.background}></div>

            {/* Empty State */}
            {activeWidgets.length === 0 && (
                <div className={styles.emptyState}>
                    <div className={styles.emptyGlitchWrapper}>
                        <div className={styles.emptyGlitch}>INITIALIZE_GRID</div>
                    </div>
                    <div className={styles.emptyStatus}>
                        <div className={styles.statusDot}></div>
                        <span>SYSTEM READY</span>
                    </div>
                    <p className={styles.emptyDesc}>Awaiting Module Injection...</p>
                    <button
                        className={styles.emptyButton}
                        onClick={() => setIsWidgetCenterOpen(true)}
                    >
                        <span className={styles.cmdPrefix}>{">"}</span> ACCESS_WIDGET_CENTER
                    </button>
                </div>
            )}

            {/* Interactive Grid Layer */}
            <InteractiveGrid>
                {activeWidgets.map((widget) => {
                    const catalogEntry = WIDGET_CATALOG.find(c => c.id === widget.id);
                    const WidgetComponent = WidgetFactory[widget.id];

                    if (!catalogEntry || !WidgetComponent) return null;

                    return (
                        <Tile
                            key={widget.instanceId}
                            data-grid={{
                                x: widget.x,
                                y: widget.y,
                                w: catalogEntry.defaultSize.w,
                                h: catalogEntry.defaultSize.h,
                                ...catalogEntry.constraints
                            }}
                            title={catalogEntry.name}
                            onDelete={() => handleDeleteWidget(widget.instanceId)}
                        >
                            <WidgetComponent />
                        </Tile>
                    );
                })}
            </InteractiveGrid>

            {/* Widget Center Menu */}
            <WidgetCenter
                isOpen={isWidgetCenterOpen}
                onClose={() => setIsWidgetCenterOpen(false)}
                onAddWidget={handleAddWidget}
            />

            {/* Home Button */}
            <Link href="/" className={styles['glassy-button']} aria-label="Home">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            </Link>

            {/* Dock */}
            <Dock onWidgetCenterClick={() => setIsWidgetCenterOpen(true)} />
        </div>
    );
}
