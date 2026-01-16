'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './WidgetCenter.module.css';

// Widget categories matching macOS style
const CATEGORIES = [
    { id: 'all', name: 'All' },
    { id: 'system', name: 'System' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'finance', name: 'Finance' },
    { id: 'utilities', name: 'Utilities' },
];

// Widget catalog with full metadata
export const WIDGET_CATALOG = [
    {
        id: 'clock',
        name: 'Clock',
        description: 'Live digital clock with date display. Scales to show seconds in larger sizes.',
        icon: '🕐',
        category: 'utilities',
        defaultSize: { w: 1, h: 1 },
        constraints: { minW: 1, maxW: 2, minH: 1, maxH: 2 }
    },
    {
        id: 'weather',
        name: 'Weather',
        description: 'Current weather conditions with 5-day forecast when expanded.',
        icon: '🌤️',
        category: 'utilities',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 1, maxW: 3, minH: 1, maxH: 3 }
    },
    {
        id: 'cpu',
        name: 'CPU Monitor',
        description: 'Real-time CPU core usage visualization. Shows more cores when expanded.',
        icon: '⚡',
        category: 'system',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    {
        id: 'network',
        name: 'Network Activity',
        description: 'Live network throughput graph showing upload and download speeds.',
        icon: '📡',
        category: 'system',
        defaultSize: { w: 2, h: 1 },
        constraints: { minW: 2, maxW: 4, minH: 1, maxH: 2 }
    },
    {
        id: 'battery',
        name: 'Battery',
        description: 'Device battery level with charging status indicator.',
        icon: '🔋',
        category: 'system',
        defaultSize: { w: 1, h: 1 },
        constraints: { minW: 1, maxW: 2, minH: 1, maxH: 1 }
    },
    {
        id: 'stats',
        name: 'System Stats',
        description: 'CPU, Memory, and Disk usage overview in one glance.',
        icon: '📊',
        category: 'system',
        defaultSize: { w: 1, h: 2 },
        constraints: { minW: 1, maxW: 2, minH: 2, maxH: 3 }
    },
    {
        id: 'crypto',
        name: 'Crypto Prices',
        description: 'Live cryptocurrency prices with BTC, ETH, and SOL tracking.',
        icon: '₿',
        category: 'finance',
        defaultSize: { w: 1, h: 2 },
        constraints: { minW: 1, maxW: 2, minH: 2, maxH: 3 }
    },
    {
        id: 'notes',
        name: 'Quick Notes',
        description: 'Editable sticky note for quick reminders and thoughts.',
        icon: '📝',
        category: 'productivity',
        defaultSize: { w: 2, h: 2 },
        constraints: { minW: 1, maxW: 3, minH: 1, maxH: 4 }
    },
];

interface WidgetCenterProps {
    isOpen: boolean;
    onClose: () => void;
    onAddWidget: (widgetId: string) => void;
}

export function WidgetCenter({ isOpen, onClose, onAddWidget }: WidgetCenterProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedWidget, setSelectedWidget] = useState<string | null>(null);

    // Filter widgets based on search and category
    const filteredWidgets = useMemo(() => {
        return WIDGET_CATALOG.filter(widget => {
            const matchesSearch = widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                widget.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'all' || widget.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    const handleWidgetClick = (widgetId: string) => {
        if (selectedWidget === widgetId) {
            // Second click - add widget
            onAddWidget(widgetId);
            onClose();
        } else {
            setSelectedWidget(widgetId);
        }
    };

    const handleDragStart = (e: React.DragEvent, widgetId: string) => {
        e.dataTransfer.setData('widgetId', widgetId);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Full-screen backdrop with strong blur */}
                    <div className={styles.backdrop} onClick={onClose} />

                    {/* Widget Center Container */}
                    <motion.div
                        className={styles.container}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.1 }}
                    >
                        {/* Header with Search */}
                        <div className={styles.header}>
                            <h1 className={styles.title}>Widgets</h1>
                            <div className={styles.searchContainer}>
                                <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="M21 21l-4.35-4.35" />
                                </svg>
                                <input
                                    type="text"
                                    className={styles.searchInput}
                                    placeholder="Search widgets..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Category Tabs */}
                        <div className={styles.categories}>
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`${styles.categoryTab} ${activeCategory === cat.id ? styles.active : ''}`}
                                    onClick={() => setActiveCategory(cat.id)}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Widget Grid */}
                        <div className={styles.widgetGrid}>
                            {filteredWidgets.map((widget) => (
                                <motion.div
                                    key={widget.id}
                                    className={`${styles.widgetCard} ${selectedWidget === widget.id ? styles.selected : ''}`}
                                    onClick={() => handleWidgetClick(widget.id)}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e as any, widget.id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    layout
                                >
                                    <div className={styles.widgetIcon}>{widget.icon}</div>
                                    <div className={styles.widgetName}>{widget.name}</div>

                                    {/* Expanded description */}
                                    <AnimatePresence>
                                        {selectedWidget === widget.id && (
                                            <motion.div
                                                className={styles.widgetDescription}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                            >
                                                <p>{widget.description}</p>
                                                <div className={styles.widgetMeta}>
                                                    <span>Size: {widget.defaultSize.w}×{widget.defaultSize.h}</span>
                                                    <button
                                                        className={styles.addButton}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onAddWidget(widget.id);
                                                            onClose();
                                                        }}
                                                    >
                                                        + Add
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>

                        {/* Hint text */}
                        <div className={styles.hint}>
                            Click to expand • Drag to place • Double-click to add
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Widget Center Button Icon
export function WidgetCenterIcon() {
    return (
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="url(#wc-gradient)" />
            <rect x="4" y="4" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.9" />
            <rect x="14" y="4" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.7" />
            <rect x="4" y="14" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.7" />
            <rect x="14" y="14" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.5" />
            <defs>
                <linearGradient id="wc-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#667eea" />
                    <stop offset="1" stopColor="#764ba2" />
                </linearGradient>
            </defs>
        </svg>
    );
}
