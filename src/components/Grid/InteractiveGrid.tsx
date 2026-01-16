'use client';

import React, { useState, useEffect, useMemo, useCallback, ComponentType } from 'react';
import dynamic from 'next/dynamic';
import styles from './InteractiveGrid.module.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { TileGridConfig, DEFAULT_GRID_CONFIG } from './types';

// Type for the responsive grid layout props
interface ResponsiveGridLayoutProps {
    className?: string;
    rowHeight?: number;
    margin?: [number, number];
    breakpoints?: Record<string, number>;
    cols?: Record<string, number>;
    compactType?: 'vertical' | 'horizontal' | null;
    preventCollision?: boolean;
    isResizable?: boolean;
    isDraggable?: boolean;
    resizeHandles?: Array<'s' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne'>;
    onLayoutChange?: (currentLayout: any, allLayouts: any) => void;
    children?: React.ReactNode;
}

// Dynamically import from the legacy subpath with proper typing
const ReactGridLayout = dynamic<ResponsiveGridLayoutProps>(
    async () => {
        const RGL = await import('react-grid-layout/legacy');
        const WidthProvider = (RGL as any).WidthProvider || (RGL as any).default?.WidthProvider;
        const Responsive = (RGL as any).Responsive || (RGL as any).default?.Responsive;
        return WidthProvider(Responsive) as ComponentType<ResponsiveGridLayoutProps>;
    },
    { ssr: false }
);

interface InteractiveGridProps {
    children: React.ReactNode;
    /** Grid configuration options */
    config?: Partial<TileGridConfig>;
    /** Callback when layout changes */
    onLayoutChange?: (layout: any) => void;
}

export function InteractiveGrid({
    children,
    config = {},
    onLayoutChange
}: InteractiveGridProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Merge user config with defaults
    const gridConfig = useMemo(() => ({
        ...DEFAULT_GRID_CONFIG,
        ...config,
        cols: { ...DEFAULT_GRID_CONFIG.cols, ...config.cols },
        breakpoints: { ...DEFAULT_GRID_CONFIG.breakpoints, ...config.breakpoints },
    }), [config]);

    const handleLayoutChange = useCallback((currentLayout: any, allLayouts: any) => {
        if (onLayoutChange) {
            onLayoutChange(allLayouts);
        }
    }, [onLayoutChange]);

    if (!mounted) {
        return <div className={styles['grid-container']}>Loading grid...</div>;
    }

    return (
        <div className={styles['grid-container']}>
            <ReactGridLayout
                className="layout"
                rowHeight={gridConfig.rowHeight}
                margin={gridConfig.margin}
                breakpoints={gridConfig.breakpoints}
                cols={gridConfig.cols}
                compactType={gridConfig.compactType}
                preventCollision={gridConfig.preventCollision}
                isResizable={true}
                isDraggable={true}
                resizeHandles={gridConfig.resizeHandles}
                onLayoutChange={handleLayoutChange}
            >
                {children}
            </ReactGridLayout>
        </div>
    );
}

// Re-export types for convenience
export * from './types';
