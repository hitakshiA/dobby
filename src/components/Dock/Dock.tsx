'use client';

import React, { useState } from 'react';
import styles from './Dock.module.css';
import { WidgetCenterIcon } from '../WidgetCenter';

// --- High-Fidelity Icons ---
const SketchIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="white" />
        <path d="M12 2.5L3 8.5L12 21.5L21 8.5L12 2.5Z" fill="url(#sketch-gradient)" stroke="#FDB300" strokeWidth="0.5" />
        <path d="M3 8.5H21" stroke="#E68D00" strokeWidth="0.5" />
        <path d="M7.5 8.5L12 3" stroke="#E68D00" strokeWidth="0.5" />
        <path d="M16.5 8.5L12 3" stroke="#E68D00" strokeWidth="0.5" />
        <path d="M7.5 8.5L12 21.5" stroke="#E68D00" strokeWidth="0.5" />
        <path d="M16.5 8.5L12 21.5" stroke="#E68D00" strokeWidth="0.5" />
        <defs>
            <linearGradient id="sketch-gradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FEE600" />
                <stop offset="1" stopColor="#FD8900" />
            </linearGradient>
        </defs>
    </svg>
);

const AstroIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#0D071E" />
        <path d="M16.5 4.5C16.5 4.5 13.5 8 13.5 10.5M7.5 4.5C7.5 4.5 10.5 8 10.5 10.5M12 2L12 22" stroke="url(#astro-beam)" strokeWidth="1" />
        <circle cx="12" cy="12" r="5" fill="url(#astro-planet)" />
        <path d="M8 20L12 15L16 20H8Z" fill="#FF5D01" />
        <defs>
            <linearGradient id="astro-planet" x1="12" y1="7" x2="12" y2="17" gradientUnits="userSpaceOnUse">
                <stop stopColor="#883AE8" />
                <stop offset="1" stopColor="#480894" />
            </linearGradient>
            <linearGradient id="astro-beam" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" stopOpacity="0" />
                <stop offset="0.5" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
        </defs>
    </svg>
);

const PerplexityIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="5" fill="#102A30" />
        <path d="M12 4L14 10H20L15.5 14L17.5 20L12 16L6.5 20L8.5 14L4 10H10L12 4Z" fill="#22B8CF" stroke="#1098AD" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 16V20M12 4V10" stroke="#22B8CF" strokeOpacity="0.5" />
    </svg>
);

interface DockProps {
    onWidgetCenterClick?: () => void;
}

export default function Dock({ onWidgetCenterClick }: DockProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const apps = [
        { title: 'Sketch', icon: SketchIcon },
        { title: 'Widget Center', icon: WidgetCenterIcon, onClick: onWidgetCenterClick },
        { title: 'Astro', icon: AstroIcon },
        { title: 'Perplexity', icon: PerplexityIcon },
    ];

    const getStyle = (index: number) => {
        if (hoveredIndex === null) {
            return { transform: 'scale(1) translateY(0px)' };
        }

        const distance = Math.abs(hoveredIndex - index);

        if (distance === 0) {
            return { transform: 'scale(1.5) translateY(-10px)' };
        } else if (distance === 1) {
            return { transform: 'scale(1.2) translateY(-6px)' };
        } else if (distance === 2) {
            return { transform: 'scale(1.1) translateY(0px)' };
        }

        return { transform: 'scale(1) translateY(0px)' };
    };

    return (
        <div className={styles['dock-wrapper']}>
            <ul className={styles['dock-container']}>
                {apps.map((app, i) => (
                    <li
                        key={i}
                        className={styles['dock-item']}
                        onMouseOver={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        style={getStyle(i)}
                        onClick={app.onClick}
                    >
                        <div className={styles.name}>{app.title}</div>
                        <div className={styles['dock-icon']}>
                            <app.icon />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
