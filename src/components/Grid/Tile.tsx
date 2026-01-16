'use client';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import styles from './TileGrid.module.css';

interface TileProps {
    /** Tile title shown in header */
    title?: string;
    /** Content to render inside the tile */
    children: React.ReactNode;
    /** Callback when delete button is clicked */
    onDelete?: () => void;
    /** Custom class name */
    className?: string;
    // Props injected by react-grid-layout
    style?: React.CSSProperties;
    onMouseDown?: React.MouseEventHandler;
    onMouseUp?: React.MouseEventHandler;
    onTouchEnd?: React.TouchEventHandler;
    'data-grid'?: any;
}

/**
 * A glassmorphic tile component for use with InteractiveGrid.
 * Automatically measures its size and passes dimensions to children.
 */
export const Tile = forwardRef<HTMLDivElement, TileProps>(({
    title,
    children,
    onDelete,
    className,
    style,
    onMouseDown,
    onMouseUp,
    onTouchEnd,
    ...rest
}, ref) => {
    const localRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 200, height: 200 });

    // Observe size changes for responsive content
    useEffect(() => {
        if (!localRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setDimensions({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height
                });
            }
        });

        observer.observe(localRef.current);
        return () => observer.disconnect();
    }, []);

    // Inject dimensions into children for LOD support
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<{ width?: number; height?: number }>, {
                width: dimensions.width,
                height: dimensions.height
            });
        }
        return child;
    });

    return (
        <div
            ref={(node) => {
                localRef.current = node;
                if (typeof ref === 'function') ref(node);
                else if (ref) ref.current = node;
            }}
            className={`${styles.tile} ${className || ''}`}
            style={style}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchEnd={onTouchEnd}
            {...rest}
        >
            {title && (
                <div className={styles['tile-header']}>
                    <span>{title}</span>
                    {onDelete && (
                        <button
                            className={styles['delete-button']}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}
                            title="Delete widget"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            )}
            <div className={styles['tile-content']}>
                {childrenWithProps}
            </div>
        </div>
    );
});

Tile.displayName = 'Tile';

// Re-export for convenience
export { TILE_PRESETS, createTileConfig } from './types';
