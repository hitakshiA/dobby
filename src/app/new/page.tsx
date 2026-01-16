'use client';

import React, { useState, useCallback } from 'react';
import styles from './new.module.css';
import Link from 'next/link';
import Dock from '@/components/Dock/Dock';
import { InteractiveGrid } from '@/components/Grid/InteractiveGrid';
import { Tile } from '@/components/Grid/Tile';
import {
    CpuWidget,
    ActivityWidget,
    ClockWidget,
    WeatherWidget,
    BatteryWidget,
    SystemStatsWidget,
    CryptoWidget,
    NotesWidget
} from '@/components/Grid/Widgets';
import { WidgetCenter, WIDGET_CATALOG } from '@/components/WidgetCenter';

// Widget factory mapping IDs to components
const WidgetFactory: Record<string, React.FC<{ width?: number; height?: number }>> = {
    cpu: CpuWidget,
    network: ActivityWidget,
    clock: ClockWidget,
    weather: WeatherWidget,
    battery: BatteryWidget,
    stats: SystemStatsWidget,
    crypto: CryptoWidget,
    notes: NotesWidget,
};

interface ActiveWidget {
    id: string;
    instanceId: string;
    x: number;
    y: number;
}

export default function NewDashboard() {
    const [isWidgetCenterOpen, setIsWidgetCenterOpen] = useState(false);
    const [activeWidgets, setActiveWidgets] = useState<ActiveWidget[]>([
        { id: 'clock', instanceId: 'clock-1', x: 0, y: 0 },
        { id: 'weather', instanceId: 'weather-1', x: 1, y: 0 },
        { id: 'cpu', instanceId: 'cpu-1', x: 0, y: 2 },
    ]);

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
                    <div className={styles.emptyIcon}>🧩</div>
                    <h2>Your Dashboard is Empty</h2>
                    <p>Click the <span className={styles.highlight}>Widget Center</span> icon in the dock to add widgets</p>
                    <button
                        className={styles.emptyButton}
                        onClick={() => setIsWidgetCenterOpen(true)}
                    >
                        Open Widget Center
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
