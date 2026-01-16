'use client';

import React, { useState } from 'react';
import styles from './Dock.module.css';
import { WidgetCenterIcon } from '../WidgetCenter';

// --- Minimalist Brutalist Icons (Monochrome Line Art) ---
const HomeIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
);

const GridIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
);

const ChartIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
    </svg>
);

const TerminalIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
);

const SettingsIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

interface DockProps {
    onWidgetCenterClick?: () => void;
}

export default function Dock({ onWidgetCenterClick }: DockProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const apps = [
        { title: 'Home', icon: HomeIcon },
        { title: 'Widgets', icon: GridIcon, onClick: onWidgetCenterClick },
        { title: 'Analytics', icon: ChartIcon },
        { title: 'Terminal', icon: TerminalIcon },
        { title: 'Settings', icon: SettingsIcon },
    ];

    const getStyle = (index: number) => {
        if (hoveredIndex === null) {
            return { transform: 'scale(1) translateY(0px)' };
        }

        const distance = Math.abs(hoveredIndex - index);

        if (distance === 0) {
            return { transform: 'scale(1.4) translateY(-8px)' };
        } else if (distance === 1) {
            return { transform: 'scale(1.15) translateY(-4px)' };
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
