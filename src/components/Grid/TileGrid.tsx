'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './TileGrid.module.css';

interface TileProps {
    title?: string;
    colSpan?: number;
    rowSpan?: number;
    children: React.ReactNode;
}

export function Tile({ title, colSpan = 1, rowSpan = 1, children }: TileProps) {
    return (
        <motion.div
            className={styles.tile}
            style={{
                gridColumn: `span ${colSpan}`,
                gridRow: `span ${rowSpan}`,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {title && <div className={styles['tile-header']}>{title}</div>}
            <div className={styles['tile-content']}>
                {children}
            </div>
        </motion.div>
    );
}

interface TileGridProps {
    children: React.ReactNode;
}

export function TileGrid({ children }: TileGridProps) {
    return (
        <div className={styles['grid-container']}>
            {children}
        </div>
    );
}
