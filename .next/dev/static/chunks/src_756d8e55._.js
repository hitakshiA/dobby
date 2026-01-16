(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/new/new.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "a": "new-module__eh8a_q__a",
  "background": "new-module__eh8a_q__background",
  "container": "new-module__eh8a_q__container",
  "content": "new-module__eh8a_q__content",
  "director": "new-module__eh8a_q__director",
  "draggingOver": "new-module__eh8a_q__draggingOver",
  "emptyButton": "new-module__eh8a_q__emptyButton",
  "emptyIcon": "new-module__eh8a_q__emptyIcon",
  "emptyState": "new-module__eh8a_q__emptyState",
  "glassy-button": "new-module__eh8a_q__glassy-button",
  "highlight": "new-module__eh8a_q__highlight",
  "li": "new-module__eh8a_q__li",
  "nav": "new-module__eh8a_q__nav",
  "ul": "new-module__eh8a_q__ul",
});
}),
"[project]/src/components/Dock/Dock.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "dock-container": "Dock-module__jY0-gq__dock-container",
  "dock-icon": "Dock-module__jY0-gq__dock-icon",
  "dock-item": "Dock-module__jY0-gq__dock-item",
  "dock-wrapper": "Dock-module__jY0-gq__dock-wrapper",
  "name": "Dock-module__jY0-gq__name",
});
}),
"[project]/src/components/WidgetCenter/WidgetCenter.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "active": "WidgetCenter-module__XJkrdq__active",
  "addButton": "WidgetCenter-module__XJkrdq__addButton",
  "backdrop": "WidgetCenter-module__XJkrdq__backdrop",
  "categories": "WidgetCenter-module__XJkrdq__categories",
  "categoryTab": "WidgetCenter-module__XJkrdq__categoryTab",
  "container": "WidgetCenter-module__XJkrdq__container",
  "header": "WidgetCenter-module__XJkrdq__header",
  "hint": "WidgetCenter-module__XJkrdq__hint",
  "overlay": "WidgetCenter-module__XJkrdq__overlay",
  "searchContainer": "WidgetCenter-module__XJkrdq__searchContainer",
  "searchIcon": "WidgetCenter-module__XJkrdq__searchIcon",
  "searchInput": "WidgetCenter-module__XJkrdq__searchInput",
  "selected": "WidgetCenter-module__XJkrdq__selected",
  "title": "WidgetCenter-module__XJkrdq__title",
  "widgetCard": "WidgetCenter-module__XJkrdq__widgetCard",
  "widgetDescription": "WidgetCenter-module__XJkrdq__widgetDescription",
  "widgetGrid": "WidgetCenter-module__XJkrdq__widgetGrid",
  "widgetIcon": "WidgetCenter-module__XJkrdq__widgetIcon",
  "widgetMeta": "WidgetCenter-module__XJkrdq__widgetMeta",
  "widgetName": "WidgetCenter-module__XJkrdq__widgetName",
});
}),
"[project]/src/components/WidgetCenter/WidgetCenter.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WIDGET_CATALOG",
    ()=>WIDGET_CATALOG,
    "WidgetCenter",
    ()=>WidgetCenter,
    "WidgetCenterIcon",
    ()=>WidgetCenterIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/WidgetCenter/WidgetCenter.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
// Widget categories matching macOS style
const CATEGORIES = [
    {
        id: 'all',
        name: 'All'
    },
    {
        id: 'system',
        name: 'System'
    },
    {
        id: 'productivity',
        name: 'Productivity'
    },
    {
        id: 'finance',
        name: 'Finance'
    },
    {
        id: 'utilities',
        name: 'Utilities'
    }
];
const WIDGET_CATALOG = [
    {
        id: 'clock',
        name: 'Clock',
        description: 'Live digital clock with date display. Scales to show seconds in larger sizes.',
        icon: '🕐',
        category: 'utilities',
        defaultSize: {
            w: 1,
            h: 1
        },
        constraints: {
            minW: 1,
            maxW: 2,
            minH: 1,
            maxH: 2
        }
    },
    {
        id: 'weather',
        name: 'Weather',
        description: 'Current weather conditions with 5-day forecast when expanded.',
        icon: '🌤️',
        category: 'utilities',
        defaultSize: {
            w: 2,
            h: 2
        },
        constraints: {
            minW: 1,
            maxW: 3,
            minH: 1,
            maxH: 3
        }
    },
    {
        id: 'cpu',
        name: 'CPU Monitor',
        description: 'Real-time CPU core usage visualization. Shows more cores when expanded.',
        icon: '⚡',
        category: 'system',
        defaultSize: {
            w: 2,
            h: 2
        },
        constraints: {
            minW: 2,
            maxW: 4,
            minH: 2,
            maxH: 4
        }
    },
    {
        id: 'network',
        name: 'Network Activity',
        description: 'Live network throughput graph showing upload and download speeds.',
        icon: '📡',
        category: 'system',
        defaultSize: {
            w: 2,
            h: 1
        },
        constraints: {
            minW: 2,
            maxW: 4,
            minH: 1,
            maxH: 2
        }
    },
    {
        id: 'battery',
        name: 'Battery',
        description: 'Device battery level with charging status indicator.',
        icon: '🔋',
        category: 'system',
        defaultSize: {
            w: 1,
            h: 1
        },
        constraints: {
            minW: 1,
            maxW: 2,
            minH: 1,
            maxH: 1
        }
    },
    {
        id: 'stats',
        name: 'System Stats',
        description: 'CPU, Memory, and Disk usage overview in one glance.',
        icon: '📊',
        category: 'system',
        defaultSize: {
            w: 1,
            h: 2
        },
        constraints: {
            minW: 1,
            maxW: 2,
            minH: 2,
            maxH: 3
        }
    },
    {
        id: 'crypto',
        name: 'Crypto Prices',
        description: 'Live cryptocurrency prices with BTC, ETH, and SOL tracking.',
        icon: '₿',
        category: 'finance',
        defaultSize: {
            w: 1,
            h: 2
        },
        constraints: {
            minW: 1,
            maxW: 2,
            minH: 2,
            maxH: 3
        }
    },
    {
        id: 'notes',
        name: 'Quick Notes',
        description: 'Editable sticky note for quick reminders and thoughts.',
        icon: '📝',
        category: 'productivity',
        defaultSize: {
            w: 2,
            h: 2
        },
        constraints: {
            minW: 1,
            maxW: 3,
            minH: 1,
            maxH: 4
        }
    }
];
function WidgetCenter({ isOpen, onClose, onAddWidget }) {
    _s();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [selectedWidget, setSelectedWidget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Filter widgets based on search and category
    const filteredWidgets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WidgetCenter.useMemo[filteredWidgets]": ()=>{
            return WIDGET_CATALOG.filter({
                "WidgetCenter.useMemo[filteredWidgets]": (widget)=>{
                    const matchesSearch = widget.name.toLowerCase().includes(searchQuery.toLowerCase()) || widget.description.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesCategory = activeCategory === 'all' || widget.category === activeCategory;
                    return matchesSearch && matchesCategory;
                }
            }["WidgetCenter.useMemo[filteredWidgets]"]);
        }
    }["WidgetCenter.useMemo[filteredWidgets]"], [
        searchQuery,
        activeCategory
    ]);
    const handleWidgetClick = (widgetId)=>{
        if (selectedWidget === widgetId) {
            // Second click - add widget
            onAddWidget(widgetId);
            onClose();
        } else {
            setSelectedWidget(widgetId);
        }
    };
    const handleDragStart = (e, widgetId)=>{
        e.dataTransfer.setData('widgetId', widgetId);
        onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].overlay,
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            transition: {
                duration: 0.2
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backdrop,
                    onClick: onClose
                }, void 0, false, {
                    fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                    lineNumber: 139,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: 20
                    },
                    transition: {
                        delay: 0.1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                                    children: "Widgets"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                                    lineNumber: 151,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchContainer,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchIcon,
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    cx: "11",
                                                    cy: "11",
                                                    r: "8"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                                                    lineNumber: 154,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M21 21l-4.35-4.35"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                                                    lineNumber: 155,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                                            lineNumber: 153,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchInput,
                                            placeholder: "Search widgets...",
                                            value: searchQuery,
                                            onChange: (e)=>setSearchQuery(e.target.value),
                                            autoFocus: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                                            lineNumber: 157,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                                    lineNumber: 152,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                            lineNumber: 150,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].categories,
                            children: CATEGORIES.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].categoryTab} ${activeCategory === cat.id ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].active : ''}`,
                                    onClick: ()=>setActiveCategory(cat.id),
                                    children: cat.name
                                }, cat.id, false, {
                                    fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                                    lineNumber: 171,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                            lineNumber: 169,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].widgetGrid,
                            children: filteredWidgets.map((widget)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].widgetCard} ${selectedWidget === widget.id ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selected : ''}`,
                                    onClick: ()=>handleWidgetClick(widget.id),
                                    draggable: true,
                                    onDragStart: (e)=>handleDragStart(e, widget.id),
                                    whileHover: {
                                        scale: 1.05
                                    },
                                    whileTap: {
                                        scale: 0.95
                                    },
                                    layout: true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].widgetIcon,
                                            children: widget.icon
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                                            lineNumber: 194,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].widgetName,
                                            children: widget.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                                            lineNumber: 195,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                            children: selectedWidget === widget.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].widgetDescription,
                                                initial: {
                                                    opacity: 0,
                                                    height: 0
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    height: 'auto'
                                                },
                                                exit: {
                                                    opacity: 0,
                                                    height: 0
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: widget.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                                                        lineNumber: 206,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].widgetMeta,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "Size: ",
                                                                    widget.defaultSize.w,
                                                                    "×",
                                                                    widget.defaultSize.h
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                                                                lineNumber: 208,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].addButton,
                                                                onClick: (e)=>{
                                                                    e.stopPropagation();
                                                                    onAddWidget(widget.id);
                                                                    onClose();
                                                                },
                                                                children: "+ Add"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                                                                lineNumber: 209,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                                                        lineNumber: 207,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                                                lineNumber: 200,
                                                columnNumber: 45
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                                            lineNumber: 198,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, widget.id, true, {
                                    fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                                    lineNumber: 184,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                            lineNumber: 182,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hint,
                            children: "Click to expand • Drag to place • Double-click to add"
                        }, void 0, false, {
                            fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                            lineNumber: 228,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                    lineNumber: 142,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
            lineNumber: 131,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
        lineNumber: 129,
        columnNumber: 9
    }, this);
}
_s(WidgetCenter, "sKGUKNininEkebY/g1kHk9vwmYg=");
_c = WidgetCenter;
function WidgetCenterIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "100%",
        height: "100%",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                width: "24",
                height: "24",
                rx: "6",
                fill: "url(#wc-gradient)"
            }, void 0, false, {
                fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                lineNumber: 242,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "4",
                y: "4",
                width: "6",
                height: "6",
                rx: "1.5",
                fill: "white",
                fillOpacity: "0.9"
            }, void 0, false, {
                fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                lineNumber: 243,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "14",
                y: "4",
                width: "6",
                height: "6",
                rx: "1.5",
                fill: "white",
                fillOpacity: "0.7"
            }, void 0, false, {
                fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                lineNumber: 244,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "4",
                y: "14",
                width: "6",
                height: "6",
                rx: "1.5",
                fill: "white",
                fillOpacity: "0.7"
            }, void 0, false, {
                fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                lineNumber: 245,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "14",
                y: "14",
                width: "6",
                height: "6",
                rx: "1.5",
                fill: "white",
                fillOpacity: "0.5"
            }, void 0, false, {
                fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                lineNumber: 246,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                    id: "wc-gradient",
                    x1: "0",
                    y1: "0",
                    x2: "24",
                    y2: "24",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            stopColor: "#667eea"
                        }, void 0, false, {
                            fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                            lineNumber: 249,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "1",
                            stopColor: "#764ba2"
                        }, void 0, false, {
                            fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                            lineNumber: 250,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                    lineNumber: 248,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
                lineNumber: 247,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/WidgetCenter/WidgetCenter.tsx",
        lineNumber: 241,
        columnNumber: 9
    }, this);
}
_c1 = WidgetCenterIcon;
var _c, _c1;
__turbopack_context__.k.register(_c, "WidgetCenter");
__turbopack_context__.k.register(_c1, "WidgetCenterIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/WidgetCenter/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/WidgetCenter/WidgetCenter.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Dock/Dock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Dock$2f$Dock$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/Dock/Dock.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/WidgetCenter/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/WidgetCenter/WidgetCenter.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
// --- High-Fidelity Icons ---
const SketchIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "100%",
        height: "100%",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                width: "24",
                height: "24",
                rx: "5",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/src/components/Dock/Dock.tsx",
                lineNumber: 10,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 2.5L3 8.5L12 21.5L21 8.5L12 2.5Z",
                fill: "url(#sketch-gradient)",
                stroke: "#FDB300",
                strokeWidth: "0.5"
            }, void 0, false, {
                fileName: "[project]/src/components/Dock/Dock.tsx",
                lineNumber: 11,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 8.5H21",
                stroke: "#E68D00",
                strokeWidth: "0.5"
            }, void 0, false, {
                fileName: "[project]/src/components/Dock/Dock.tsx",
                lineNumber: 12,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7.5 8.5L12 3",
                stroke: "#E68D00",
                strokeWidth: "0.5"
            }, void 0, false, {
                fileName: "[project]/src/components/Dock/Dock.tsx",
                lineNumber: 13,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16.5 8.5L12 3",
                stroke: "#E68D00",
                strokeWidth: "0.5"
            }, void 0, false, {
                fileName: "[project]/src/components/Dock/Dock.tsx",
                lineNumber: 14,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7.5 8.5L12 21.5",
                stroke: "#E68D00",
                strokeWidth: "0.5"
            }, void 0, false, {
                fileName: "[project]/src/components/Dock/Dock.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16.5 8.5L12 21.5",
                stroke: "#E68D00",
                strokeWidth: "0.5"
            }, void 0, false, {
                fileName: "[project]/src/components/Dock/Dock.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                    id: "sketch-gradient",
                    x1: "12",
                    y1: "2",
                    x2: "12",
                    y2: "22",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            stopColor: "#FEE600"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Dock/Dock.tsx",
                            lineNumber: 19,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "1",
                            stopColor: "#FD8900"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Dock/Dock.tsx",
                            lineNumber: 20,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Dock/Dock.tsx",
                    lineNumber: 18,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/Dock/Dock.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Dock/Dock.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
_c = SketchIcon;
const AstroIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "100%",
        height: "100%",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                width: "24",
                height: "24",
                rx: "5",
                fill: "#0D071E"
            }, void 0, false, {
                fileName: "[project]/src/components/Dock/Dock.tsx",
                lineNumber: 28,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16.5 4.5C16.5 4.5 13.5 8 13.5 10.5M7.5 4.5C7.5 4.5 10.5 8 10.5 10.5M12 2L12 22",
                stroke: "url(#astro-beam)",
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/src/components/Dock/Dock.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "5",
                fill: "url(#astro-planet)"
            }, void 0, false, {
                fileName: "[project]/src/components/Dock/Dock.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 20L12 15L16 20H8Z",
                fill: "#FF5D01"
            }, void 0, false, {
                fileName: "[project]/src/components/Dock/Dock.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: "astro-planet",
                        x1: "12",
                        y1: "7",
                        x2: "12",
                        y2: "17",
                        gradientUnits: "userSpaceOnUse",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                stopColor: "#883AE8"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Dock/Dock.tsx",
                                lineNumber: 34,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "1",
                                stopColor: "#480894"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Dock/Dock.tsx",
                                lineNumber: 35,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Dock/Dock.tsx",
                        lineNumber: 33,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: "astro-beam",
                        x1: "12",
                        y1: "2",
                        x2: "12",
                        y2: "22",
                        gradientUnits: "userSpaceOnUse",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                stopColor: "white",
                                stopOpacity: "0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Dock/Dock.tsx",
                                lineNumber: 38,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0.5",
                                stopColor: "white"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Dock/Dock.tsx",
                                lineNumber: 39,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "1",
                                stopColor: "white",
                                stopOpacity: "0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Dock/Dock.tsx",
                                lineNumber: 40,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Dock/Dock.tsx",
                        lineNumber: 37,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Dock/Dock.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Dock/Dock.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
_c1 = AstroIcon;
const PerplexityIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "100%",
        height: "100%",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                width: "24",
                height: "24",
                rx: "5",
                fill: "#102A30"
            }, void 0, false, {
                fileName: "[project]/src/components/Dock/Dock.tsx",
                lineNumber: 48,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 4L14 10H20L15.5 14L17.5 20L12 16L6.5 20L8.5 14L4 10H10L12 4Z",
                fill: "#22B8CF",
                stroke: "#1098AD",
                strokeWidth: "1.5",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/Dock/Dock.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 16V20M12 4V10",
                stroke: "#22B8CF",
                strokeOpacity: "0.5"
            }, void 0, false, {
                fileName: "[project]/src/components/Dock/Dock.tsx",
                lineNumber: 50,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Dock/Dock.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
_c2 = PerplexityIcon;
function Dock({ onWidgetCenterClick }) {
    _s();
    const [hoveredIndex, setHoveredIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const apps = [
        {
            title: 'Sketch',
            icon: SketchIcon
        },
        {
            title: 'Widget Center',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidgetCenterIcon"],
            onClick: onWidgetCenterClick
        },
        {
            title: 'Astro',
            icon: AstroIcon
        },
        {
            title: 'Perplexity',
            icon: PerplexityIcon
        }
    ];
    const getStyle = (index)=>{
        if (hoveredIndex === null) {
            return {
                transform: 'scale(1) translateY(0px)'
            };
        }
        const distance = Math.abs(hoveredIndex - index);
        if (distance === 0) {
            return {
                transform: 'scale(1.5) translateY(-10px)'
            };
        } else if (distance === 1) {
            return {
                transform: 'scale(1.2) translateY(-6px)'
            };
        } else if (distance === 2) {
            return {
                transform: 'scale(1.1) translateY(0px)'
            };
        }
        return {
            transform: 'scale(1) translateY(0px)'
        };
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Dock$2f$Dock$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]['dock-wrapper'],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Dock$2f$Dock$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]['dock-container'],
            children: apps.map((app, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Dock$2f$Dock$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]['dock-item'],
                    onMouseOver: ()=>setHoveredIndex(i),
                    onMouseLeave: ()=>setHoveredIndex(null),
                    style: getStyle(i),
                    onClick: app.onClick,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Dock$2f$Dock$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].name,
                            children: app.title
                        }, void 0, false, {
                            fileName: "[project]/src/components/Dock/Dock.tsx",
                            lineNumber: 98,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Dock$2f$Dock$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]['dock-icon'],
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(app.icon, {}, void 0, false, {
                                fileName: "[project]/src/components/Dock/Dock.tsx",
                                lineNumber: 100,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Dock/Dock.tsx",
                            lineNumber: 99,
                            columnNumber: 25
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/src/components/Dock/Dock.tsx",
                    lineNumber: 90,
                    columnNumber: 21
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/Dock/Dock.tsx",
            lineNumber: 88,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Dock/Dock.tsx",
        lineNumber: 87,
        columnNumber: 9
    }, this);
}
_s(Dock, "9iVkaaUbrFxVCU6MuI1jK6905pI=");
_c3 = Dock;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "SketchIcon");
__turbopack_context__.k.register(_c1, "AstroIcon");
__turbopack_context__.k.register(_c2, "PerplexityIcon");
__turbopack_context__.k.register(_c3, "Dock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Grid/InteractiveGrid.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "grid-container": "InteractiveGrid-module__DgSReW__grid-container",
  "react-grid-item": "InteractiveGrid-module__DgSReW__react-grid-item",
  "react-grid-placeholder": "InteractiveGrid-module__DgSReW__react-grid-placeholder",
  "react-resizable-handle": "InteractiveGrid-module__DgSReW__react-resizable-handle",
  "react-resizable-handle-e": "InteractiveGrid-module__DgSReW__react-resizable-handle-e",
  "react-resizable-handle-n": "InteractiveGrid-module__DgSReW__react-resizable-handle-n",
  "react-resizable-handle-ne": "InteractiveGrid-module__DgSReW__react-resizable-handle-ne",
  "react-resizable-handle-nw": "InteractiveGrid-module__DgSReW__react-resizable-handle-nw",
  "react-resizable-handle-s": "InteractiveGrid-module__DgSReW__react-resizable-handle-s",
  "react-resizable-handle-se": "InteractiveGrid-module__DgSReW__react-resizable-handle-se",
  "react-resizable-handle-sw": "InteractiveGrid-module__DgSReW__react-resizable-handle-sw",
  "react-resizable-handle-w": "InteractiveGrid-module__DgSReW__react-resizable-handle-w",
  "tile": "InteractiveGrid-module__DgSReW__tile",
});
}),
"[project]/src/components/Grid/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Tile System Types and Configuration
__turbopack_context__.s([
    "DEFAULT_GRID_CONFIG",
    ()=>DEFAULT_GRID_CONFIG,
    "TILE_PRESETS",
    ()=>TILE_PRESETS,
    "createTileConfig",
    ()=>createTileConfig
]);
const TILE_PRESETS = {
    /** 1x1 only, no resizing */ FIXED_SMALL: {
        w: 1,
        h: 1,
        constraints: {
            minW: 1,
            maxW: 1,
            minH: 1,
            maxH: 1
        }
    },
    /** 2x2 only, no resizing */ FIXED_MEDIUM: {
        w: 2,
        h: 2,
        constraints: {
            minW: 2,
            maxW: 2,
            minH: 2,
            maxH: 2
        }
    },
    /** 1x1 to 2x2 */ FLEXIBLE_SMALL: {
        w: 1,
        h: 1,
        constraints: {
            minW: 1,
            maxW: 2,
            minH: 1,
            maxH: 2
        }
    },
    /** 2x2 to 4x4 */ FLEXIBLE_LARGE: {
        w: 2,
        h: 2,
        constraints: {
            minW: 2,
            maxW: 4,
            minH: 2,
            maxH: 4
        }
    },
    /** 1x1 to 3x2 (wide format) */ WIDE_WIDGET: {
        w: 2,
        h: 1,
        constraints: {
            minW: 1,
            maxW: 3,
            minH: 1,
            maxH: 2
        }
    },
    /** 1x2 to 1x4 (tall format) */ TALL_WIDGET: {
        w: 1,
        h: 2,
        constraints: {
            minW: 1,
            maxW: 1,
            minH: 2,
            maxH: 4
        }
    }
};
const DEFAULT_GRID_CONFIG = {
    rowHeight: 100,
    margin: [
        12,
        12
    ],
    cols: {
        lg: 12,
        md: 8,
        sm: 4,
        xs: 2,
        xxs: 1
    },
    breakpoints: {
        lg: 1200,
        md: 996,
        sm: 768,
        xs: 480,
        xxs: 0
    },
    compactType: null,
    preventCollision: true,
    resizeHandles: [
        's',
        'se',
        'sw'
    ]
};
function createTileConfig(id, preset, overrides) {
    const presetConfig = TILE_PRESETS[preset];
    return {
        id,
        ...presetConfig,
        ...overrides,
        constraints: {
            ...presetConfig.constraints,
            ...overrides?.constraints
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Grid/InteractiveGrid.tsx [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InteractiveGrid",
    ()=>InteractiveGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$InteractiveGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/Grid/InteractiveGrid.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Grid/types.ts [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
// Dynamically import from the legacy subpath with proper typing
const ReactGridLayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(async ()=>{
    const RGL = await __turbopack_context__.A("[project]/node_modules/react-grid-layout/dist/legacy.mjs [app-client] (ecmascript, next/dynamic entry, async loader)");
    const WidthProvider = RGL.WidthProvider || RGL.default?.WidthProvider;
    const Responsive = RGL.Responsive || RGL.default?.Responsive;
    return WidthProvider(Responsive);
}, {
    loadableGenerated: {
        modules: [
            "[project]/node_modules/react-grid-layout/dist/legacy.mjs [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = ReactGridLayout;
function InteractiveGrid({ children, config = {}, onLayoutChange }) {
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InteractiveGrid.useEffect": ()=>{
            setMounted(true);
        }
    }["InteractiveGrid.useEffect"], []);
    // Merge user config with defaults
    const gridConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "InteractiveGrid.useMemo[gridConfig]": ()=>({
                ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_GRID_CONFIG"],
                ...config,
                cols: {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_GRID_CONFIG"].cols,
                    ...config.cols
                },
                breakpoints: {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_GRID_CONFIG"].breakpoints,
                    ...config.breakpoints
                }
            })
    }["InteractiveGrid.useMemo[gridConfig]"], [
        config
    ]);
    const handleLayoutChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "InteractiveGrid.useCallback[handleLayoutChange]": (currentLayout, allLayouts)=>{
            if (onLayoutChange) {
                onLayoutChange(allLayouts);
            }
        }
    }["InteractiveGrid.useCallback[handleLayoutChange]"], [
        onLayoutChange
    ]);
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$InteractiveGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]['grid-container'],
            children: "Loading grid..."
        }, void 0, false, {
            fileName: "[project]/src/components/Grid/InteractiveGrid.tsx",
            lineNumber: 71,
            columnNumber: 16
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$InteractiveGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]['grid-container'],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReactGridLayout, {
            className: "layout",
            rowHeight: gridConfig.rowHeight,
            margin: gridConfig.margin,
            breakpoints: gridConfig.breakpoints,
            cols: gridConfig.cols,
            compactType: gridConfig.compactType,
            preventCollision: gridConfig.preventCollision,
            isResizable: true,
            isDraggable: true,
            resizeHandles: gridConfig.resizeHandles,
            onLayoutChange: handleLayoutChange,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/Grid/InteractiveGrid.tsx",
            lineNumber: 76,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Grid/InteractiveGrid.tsx",
        lineNumber: 75,
        columnNumber: 9
    }, this);
}
_s(InteractiveGrid, "NW4wna185gDEE8eMmQLbor658lk=");
_c1 = InteractiveGrid;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "ReactGridLayout");
__turbopack_context__.k.register(_c1, "InteractiveGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Grid/TileGrid.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "delete-button": "TileGrid-module__vrDuTG__delete-button",
  "grid-container": "TileGrid-module__vrDuTG__grid-container",
  "tile": "TileGrid-module__vrDuTG__tile",
  "tile-content": "TileGrid-module__vrDuTG__tile-content",
  "tile-header": "TileGrid-module__vrDuTG__tile-header",
});
}),
"[project]/src/components/Grid/Tile.tsx [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tile",
    ()=>Tile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$TileGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/Grid/TileGrid.module.css [app-client] (css module)");
// Re-export for convenience
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Grid/types.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const Tile = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s(({ title, children, onDelete, className, style, onMouseDown, onMouseUp, onTouchEnd, ...rest }, ref)=>{
    _s();
    const localRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [dimensions, setDimensions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        width: 200,
        height: 200
    });
    // Observe size changes for responsive content
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Tile.useEffect": ()=>{
            if (!localRef.current) return;
            const observer = new ResizeObserver({
                "Tile.useEffect": (entries)=>{
                    for (const entry of entries){
                        setDimensions({
                            width: entry.contentRect.width,
                            height: entry.contentRect.height
                        });
                    }
                }
            }["Tile.useEffect"]);
            observer.observe(localRef.current);
            return ({
                "Tile.useEffect": ()=>observer.disconnect()
            })["Tile.useEffect"];
        }
    }["Tile.useEffect"], []);
    // Inject dimensions into children for LOD support
    const childrenWithProps = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Children.map(children, (child)=>{
        if (/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isValidElement(child)) {
            return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cloneElement(child, {
                width: dimensions.width,
                height: dimensions.height
            });
        }
        return child;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: (node)=>{
            localRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
        },
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$TileGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tile} ${className || ''}`,
        style: style,
        onMouseDown: onMouseDown,
        onMouseUp: onMouseUp,
        onTouchEnd: onTouchEnd,
        ...rest,
        children: [
            title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$TileGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]['tile-header'],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/Grid/Tile.tsx",
                        lineNumber: 85,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    onDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$TileGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]['delete-button'],
                        onClick: (e)=>{
                            e.stopPropagation();
                            onDelete();
                        },
                        title: "Delete widget",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "12",
                            height: "12",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M18 6L6 18M6 6l12 12"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Grid/Tile.tsx",
                                lineNumber: 96,
                                columnNumber: 33
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/Grid/Tile.tsx",
                            lineNumber: 95,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Grid/Tile.tsx",
                        lineNumber: 87,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Grid/Tile.tsx",
                lineNumber: 84,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$TileGrid$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]['tile-content'],
                children: childrenWithProps
            }, void 0, false, {
                fileName: "[project]/src/components/Grid/Tile.tsx",
                lineNumber: 102,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Grid/Tile.tsx",
        lineNumber: 70,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
}, "Ey+p5gI2zJJiwyku8LFhIFI7leo=")), "Ey+p5gI2zJJiwyku8LFhIFI7leo=");
_c1 = Tile;
Tile.displayName = 'Tile';
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Tile$forwardRef");
__turbopack_context__.k.register(_c1, "Tile");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Grid/Widgets.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActivityWidget",
    ()=>ActivityWidget,
    "BatteryWidget",
    ()=>BatteryWidget,
    "ClockWidget",
    ()=>ClockWidget,
    "CpuWidget",
    ()=>CpuWidget,
    "CryptoWidget",
    ()=>CryptoWidget,
    "NotesWidget",
    ()=>NotesWidget,
    "SystemStatsWidget",
    ()=>SystemStatsWidget,
    "WeatherWidget",
    ()=>WeatherWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature();
'use client';
;
;
// ============================================
// APPLE-QUALITY WIDGETS WITH LOD (Level of Detail)
// ============================================
// Helper to determine size category
const getSize = (w, h)=>{
    const area = w * h;
    if (area >= 60000) return 'large';
    if (area >= 30000) return 'medium';
    return 'small';
};
function ClockWidget({ width = 200, height = 200 }) {
    _s();
    const [time, setTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date());
    const size = getSize(width, height);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClockWidget.useEffect": ()=>{
            const timer = setInterval({
                "ClockWidget.useEffect.timer": ()=>setTime(new Date())
            }["ClockWidget.useEffect.timer"], 1000);
            return ({
                "ClockWidget.useEffect": ()=>clearInterval(timer)
            })["ClockWidget.useEffect"];
        }
    }["ClockWidget.useEffect"], []);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const date = time.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });
    // Small: Just time
    if (size === 'small') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: '28px',
                    fontWeight: '300',
                    color: '#fff',
                    fontFamily: 'system-ui'
                },
                children: [
                    displayHours,
                    ":",
                    minutes.toString().padStart(2, '0')
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Grid/Widgets.tsx",
                lineNumber: 43,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Grid/Widgets.tsx",
            lineNumber: 38,
            columnNumber: 13
        }, this);
    }
    // Medium: Time + AM/PM + Date
    if (size === 'medium') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '4px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: '48px',
                                fontWeight: '200',
                                color: '#fff',
                                fontFamily: 'system-ui'
                            },
                            children: [
                                displayHours,
                                ":",
                                minutes.toString().padStart(2, '0')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Grid/Widgets.tsx",
                            lineNumber: 60,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: '18px',
                                color: 'rgba(255,255,255,0.5)',
                                fontWeight: '400'
                            },
                            children: period
                        }, void 0, false, {
                            fileName: "[project]/src/components/Grid/Widgets.tsx",
                            lineNumber: 63,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Grid/Widgets.tsx",
                    lineNumber: 59,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.4)',
                        fontWeight: '400'
                    },
                    children: date
                }, void 0, false, {
                    fileName: "[project]/src/components/Grid/Widgets.tsx",
                    lineNumber: 65,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Grid/Widgets.tsx",
            lineNumber: 53,
            columnNumber: 13
        }, this);
    }
    // Large: Analog-style with digital backup
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '8px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: '72px',
                            fontWeight: '100',
                            color: '#fff',
                            fontFamily: 'system-ui',
                            letterSpacing: '-2px'
                        },
                        children: [
                            displayHours,
                            ":",
                            minutes.toString().padStart(2, '0')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Grid/Widgets.tsx",
                        lineNumber: 79,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '24px',
                                    color: 'rgba(255,255,255,0.6)',
                                    fontWeight: '300'
                                },
                                children: [
                                    ":",
                                    seconds.toString().padStart(2, '0')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Grid/Widgets.tsx",
                                lineNumber: 83,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '16px',
                                    color: 'rgba(255,255,255,0.4)',
                                    fontWeight: '500'
                                },
                                children: period
                            }, void 0, false, {
                                fileName: "[project]/src/components/Grid/Widgets.tsx",
                                lineNumber: 84,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Grid/Widgets.tsx",
                        lineNumber: 82,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Grid/Widgets.tsx",
                lineNumber: 78,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: '16px',
                    color: 'rgba(255,255,255,0.4)',
                    fontWeight: '400'
                },
                children: date
            }, void 0, false, {
                fileName: "[project]/src/components/Grid/Widgets.tsx",
                lineNumber: 87,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Grid/Widgets.tsx",
        lineNumber: 72,
        columnNumber: 9
    }, this);
}
_s(ClockWidget, "I0+7QaEsXHXB0XO5JypI3yBHjPI=");
_c = ClockWidget;
function WeatherWidget({ width = 200, height = 200 }) {
    const size = getSize(width, height);
    const conditions = {
        temp: 72,
        high: 78,
        low: 64,
        condition: 'Sunny',
        location: 'San Francisco'
    };
    const forecast = [
        {
            day: 'Mon',
            temp: 72,
            icon: '☀️'
        },
        {
            day: 'Tue',
            temp: 68,
            icon: '⛅'
        },
        {
            day: 'Wed',
            temp: 65,
            icon: '🌧️'
        },
        {
            day: 'Thu',
            temp: 70,
            icon: '☀️'
        },
        {
            day: 'Fri',
            temp: 75,
            icon: '☀️'
        }
    ];
    // Small: Just icon and temp
    if (size === 'small') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                background: 'linear-gradient(180deg, rgba(135,206,235,0.15) 0%, rgba(255,165,0,0.1) 100%)'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontSize: '36px'
                    },
                    children: "☀️"
                }, void 0, false, {
                    fileName: "[project]/src/components/Grid/Widgets.tsx",
                    lineNumber: 114,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontSize: '24px',
                        fontWeight: '300',
                        color: '#fff'
                    },
                    children: [
                        conditions.temp,
                        "°"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Grid/Widgets.tsx",
                    lineNumber: 115,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Grid/Widgets.tsx",
            lineNumber: 108,
            columnNumber: 13
        }, this);
    }
    // Medium: Icon, temp, hi/lo, location
    if (size === 'medium') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'linear-gradient(180deg, rgba(135,206,235,0.15) 0%, rgba(255,165,0,0.1) 100%)'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontSize: '48px'
                    },
                    children: "☀️"
                }, void 0, false, {
                    fileName: "[project]/src/components/Grid/Widgets.tsx",
                    lineNumber: 129,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontSize: '42px',
                        fontWeight: '200',
                        color: '#fff'
                    },
                    children: [
                        conditions.temp,
                        "°"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Grid/Widgets.tsx",
                    lineNumber: 130,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.5)'
                    },
                    children: conditions.location
                }, void 0, false, {
                    fileName: "[project]/src/components/Grid/Widgets.tsx",
                    lineNumber: 131,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.4)'
                    },
                    children: [
                        "H:",
                        conditions.high,
                        "° L:",
                        conditions.low,
                        "°"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Grid/Widgets.tsx",
                    lineNumber: 132,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Grid/Widgets.tsx",
            lineNumber: 123,
            columnNumber: 13
        }, this);
    }
    // Large: Full forecast
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            gap: '12px',
            background: 'linear-gradient(180deg, rgba(135,206,235,0.15) 0%, rgba(255,165,0,0.1) 100%)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: '56px'
                        },
                        children: "☀️"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Grid/Widgets.tsx",
                        lineNumber: 146,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '52px',
                                    fontWeight: '200',
                                    color: '#fff'
                                },
                                children: [
                                    conditions.temp,
                                    "°"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Grid/Widgets.tsx",
                                lineNumber: 148,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '13px',
                                    color: 'rgba(255,255,255,0.5)'
                                },
                                children: conditions.condition
                            }, void 0, false, {
                                fileName: "[project]/src/components/Grid/Widgets.tsx",
                                lineNumber: 149,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Grid/Widgets.tsx",
                        lineNumber: 147,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Grid/Widgets.tsx",
                lineNumber: 145,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.5)'
                },
                children: conditions.location
            }, void 0, false, {
                fileName: "[project]/src/components/Grid/Widgets.tsx",
                lineNumber: 152,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: '16px',
                    marginTop: '8px',
                    padding: '12px 16px',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '12px'
                },
                children: forecast.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '11px',
                                    color: 'rgba(255,255,255,0.5)',
                                    marginBottom: '4px'
                                },
                                children: f.day
                            }, void 0, false, {
                                fileName: "[project]/src/components/Grid/Widgets.tsx",
                                lineNumber: 159,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '20px',
                                    marginBottom: '4px'
                                },
                                children: f.icon
                            }, void 0, false, {
                                fileName: "[project]/src/components/Grid/Widgets.tsx",
                                lineNumber: 160,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '14px',
                                    color: '#fff',
                                    fontWeight: '500'
                                },
                                children: [
                                    f.temp,
                                    "°"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Grid/Widgets.tsx",
                                lineNumber: 161,
                                columnNumber: 25
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/components/Grid/Widgets.tsx",
                        lineNumber: 158,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/Grid/Widgets.tsx",
                lineNumber: 153,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Grid/Widgets.tsx",
        lineNumber: 139,
        columnNumber: 9
    }, this);
}
_c1 = WeatherWidget;
function CpuWidget({ width = 200, height = 200 }) {
    _s1();
    const [usage, setUsage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(45);
    const size = getSize(width, height);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CpuWidget.useEffect": ()=>{
            const timer = setInterval({
                "CpuWidget.useEffect.timer": ()=>{
                    setUsage({
                        "CpuWidget.useEffect.timer": (prev)=>Math.max(10, Math.min(95, prev + (Math.random() - 0.5) * 20))
                    }["CpuWidget.useEffect.timer"]);
                }
            }["CpuWidget.useEffect.timer"], 1500);
            return ({
                "CpuWidget.useEffect": ()=>clearInterval(timer)
            })["CpuWidget.useEffect"];
        }
    }["CpuWidget.useEffect"], []);
    const getColor = (val)=>{
        if (val < 50) return '#4ade80';
        if (val < 80) return '#fbbf24';
        return '#ef4444';
    };
    // Small: Just percentage ring
    if (size === 'small') {
        const circumference = 2 * Math.PI * 40;
        const offset = circumference - usage / 100 * circumference;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: "80",
                height: "80",
                viewBox: "0 0 100 100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "50",
                        cy: "50",
                        r: "40",
                        fill: "none",
                        stroke: "rgba(255,255,255,0.1)",
                        strokeWidth: "8"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Grid/Widgets.tsx",
                        lineNumber: 195,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].circle, {
                        cx: "50",
                        cy: "50",
                        r: "40",
                        fill: "none",
                        stroke: getColor(usage),
                        strokeWidth: "8",
                        strokeLinecap: "round",
                        strokeDasharray: circumference,
                        animate: {
                            strokeDashoffset: offset
                        },
                        style: {
                            transform: 'rotate(-90deg)',
                            transformOrigin: '50% 50%'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/Grid/Widgets.tsx",
                        lineNumber: 196,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: "50",
                        y: "55",
                        textAnchor: "middle",
                        fill: "#fff",
                        fontSize: "20",
                        fontWeight: "300",
                        children: [
                            Math.round(usage),
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Grid/Widgets.tsx",
                        lineNumber: 203,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Grid/Widgets.tsx",
                lineNumber: 194,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Grid/Widgets.tsx",
            lineNumber: 193,
            columnNumber: 13
        }, this);
    }
    // Medium/Large: Multiple cores
    const coreCount = size === 'large' ? 8 : 4;
    const [cores] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "CpuWidget.useState": ()=>Array(coreCount).fill(0).map({
                "CpuWidget.useState": ()=>Math.random() * 100
            }["CpuWidget.useState"])
    }["CpuWidget.useState"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: '100%',
            height: '100%',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: '28px',
                            fontWeight: '200',
                            color: '#fff'
                        },
                        children: [
                            Math.round(usage),
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Grid/Widgets.tsx",
                        lineNumber: 221,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: '12px',
                            color: 'rgba(255,255,255,0.4)'
                        },
                        children: "CPU"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Grid/Widgets.tsx",
                        lineNumber: 222,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Grid/Widgets.tsx",
                lineNumber: 220,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    display: 'grid',
                    gridTemplateColumns: `repeat(${Math.sqrt(coreCount)}, 1fr)`,
                    gap: '4px'
                },
                children: cores.map((core, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        style: {
                            borderRadius: '4px',
                            background: `linear-gradient(180deg, ${getColor(core)} 0%, rgba(255,255,255,0.05) 100%)`
                        },
                        animate: {
                            opacity: [
                                0.6,
                                1,
                                0.6
                            ]
                        },
                        transition: {
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.1
                        }
                    }, i, false, {
                        fileName: "[project]/src/components/Grid/Widgets.tsx",
                        lineNumber: 226,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/Grid/Widgets.tsx",
                lineNumber: 224,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Grid/Widgets.tsx",
        lineNumber: 216,
        columnNumber: 9
    }, this);
}
_s1(CpuWidget, "RRa1WIwTg9QNwfCqnNLf3bggcJ8=");
_c2 = CpuWidget;
function ActivityWidget({ width = 200, height = 200 }) {
    _s2();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const size = getSize(width, height);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ActivityWidget.useEffect": ()=>{
            const points = size === 'large' ? 30 : 15;
            setData(Array(points).fill(0).map({
                "ActivityWidget.useEffect": ()=>({
                        up: Math.random() * 50,
                        down: Math.random() * 80
                    })
            }["ActivityWidget.useEffect"]));
            const timer = setInterval({
                "ActivityWidget.useEffect.timer": ()=>{
                    setData({
                        "ActivityWidget.useEffect.timer": (prev)=>[
                                ...prev.slice(1),
                                {
                                    up: Math.random() * 50,
                                    down: Math.random() * 80
                                }
                            ]
                    }["ActivityWidget.useEffect.timer"]);
                }
            }["ActivityWidget.useEffect.timer"], 500);
            return ({
                "ActivityWidget.useEffect": ()=>clearInterval(timer)
            })["ActivityWidget.useEffect"];
        }
    }["ActivityWidget.useEffect"], [
        size
    ]);
    const currentUp = data[data.length - 1]?.up || 0;
    const currentDown = data[data.length - 1]?.down || 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '12px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '10px',
                                    color: '#4ade80'
                                },
                                children: "↑"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Grid/Widgets.tsx",
                                lineNumber: 263,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '14px',
                                    color: '#fff',
                                    marginLeft: '4px'
                                },
                                children: currentUp.toFixed(1)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Grid/Widgets.tsx",
                                lineNumber: 264,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '10px',
                                    color: 'rgba(255,255,255,0.4)',
                                    marginLeft: '2px'
                                },
                                children: "MB/s"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Grid/Widgets.tsx",
                                lineNumber: 265,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Grid/Widgets.tsx",
                        lineNumber: 262,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '10px',
                                    color: '#60a5fa'
                                },
                                children: "↓"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Grid/Widgets.tsx",
                                lineNumber: 268,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '14px',
                                    color: '#fff',
                                    marginLeft: '4px'
                                },
                                children: currentDown.toFixed(1)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Grid/Widgets.tsx",
                                lineNumber: 269,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '10px',
                                    color: 'rgba(255,255,255,0.4)',
                                    marginLeft: '2px'
                                },
                                children: "MB/s"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Grid/Widgets.tsx",
                                lineNumber: 270,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Grid/Widgets.tsx",
                        lineNumber: 267,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Grid/Widgets.tsx",
                lineNumber: 261,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '2px'
                },
                children: data.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1px',
                            height: '100%',
                            justifyContent: 'flex-end'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                style: {
                                    background: '#4ade80',
                                    borderRadius: '1px',
                                    minHeight: '2px'
                                },
                                animate: {
                                    height: `${d.up / 100 * 100}%`
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/Grid/Widgets.tsx",
                                lineNumber: 276,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                style: {
                                    background: '#60a5fa',
                                    borderRadius: '1px',
                                    minHeight: '2px'
                                },
                                animate: {
                                    height: `${d.down / 100 * 100}%`
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/Grid/Widgets.tsx",
                                lineNumber: 280,
                                columnNumber: 25
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/components/Grid/Widgets.tsx",
                        lineNumber: 275,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/Grid/Widgets.tsx",
                lineNumber: 273,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Grid/Widgets.tsx",
        lineNumber: 260,
        columnNumber: 9
    }, this);
}
_s2(ActivityWidget, "IEMTtLVFIuToo7X/raQbJAxzNQU=");
_c3 = ActivityWidget;
function CryptoWidget({ width = 200, height = 200 }) {
    _s3();
    const size = getSize(width, height);
    const [prices, setPrices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            symbol: 'BTC',
            name: 'Bitcoin',
            price: 43250,
            change: 2.5,
            color: '#f7931a'
        },
        {
            symbol: 'ETH',
            name: 'Ethereum',
            price: 2280,
            change: -1.2,
            color: '#627eea'
        },
        {
            symbol: 'SOL',
            name: 'Solana',
            price: 98.5,
            change: 5.8,
            color: '#00ffa3'
        }
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CryptoWidget.useEffect": ()=>{
            const timer = setInterval({
                "CryptoWidget.useEffect.timer": ()=>{
                    setPrices({
                        "CryptoWidget.useEffect.timer": (prev)=>prev.map({
                                "CryptoWidget.useEffect.timer": (p)=>({
                                        ...p,
                                        price: p.price * (1 + (Math.random() - 0.5) * 0.005),
                                        change: p.change + (Math.random() - 0.5) * 0.3
                                    })
                            }["CryptoWidget.useEffect.timer"])
                    }["CryptoWidget.useEffect.timer"]);
                }
            }["CryptoWidget.useEffect.timer"], 2000);
            return ({
                "CryptoWidget.useEffect": ()=>clearInterval(timer)
            })["CryptoWidget.useEffect"];
        }
    }["CryptoWidget.useEffect"], []);
    const displayCount = size === 'small' ? 1 : 3;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: '100%',
            height: '100%',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        },
        children: prices.slice(0, displayCount).map((coin, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '8px',
                    borderLeft: `3px solid ${coin.color}`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#fff'
                                },
                                children: coin.symbol
                            }, void 0, false, {
                                fileName: "[project]/src/components/Grid/Widgets.tsx",
                                lineNumber: 322,
                                columnNumber: 25
                            }, this),
                            size !== 'small' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '10px',
                                    color: 'rgba(255,255,255,0.4)'
                                },
                                children: coin.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/Grid/Widgets.tsx",
                                lineNumber: 323,
                                columnNumber: 46
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Grid/Widgets.tsx",
                        lineNumber: 321,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'right'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '14px',
                                    color: '#fff'
                                },
                                children: [
                                    "$",
                                    coin.price.toLocaleString(undefined, {
                                        maximumFractionDigits: 0
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Grid/Widgets.tsx",
                                lineNumber: 326,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '11px',
                                    color: coin.change >= 0 ? '#4ade80' : '#ef4444'
                                },
                                children: [
                                    coin.change >= 0 ? '+' : '',
                                    coin.change.toFixed(2),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Grid/Widgets.tsx",
                                lineNumber: 329,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Grid/Widgets.tsx",
                        lineNumber: 325,
                        columnNumber: 21
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/src/components/Grid/Widgets.tsx",
                lineNumber: 316,
                columnNumber: 17
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/Grid/Widgets.tsx",
        lineNumber: 314,
        columnNumber: 9
    }, this);
}
_s3(CryptoWidget, "Npw0qYiBD5g/1LmmIMFICDKF8G8=");
_c4 = CryptoWidget;
function BatteryWidget({ width = 200, height = 200 }) {
    _s4();
    const [battery, setBattery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        level: 0.85,
        charging: true
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BatteryWidget.useEffect": ()=>{
            if ('getBattery' in navigator) {
                navigator.getBattery().then({
                    "BatteryWidget.useEffect": (bat)=>{
                        setBattery({
                            level: bat.level,
                            charging: bat.charging
                        });
                    }
                }["BatteryWidget.useEffect"]);
            }
        }
    }["BatteryWidget.useEffect"], []);
    const percentage = Math.round(battery.level * 100);
    const color = percentage > 50 ? '#4ade80' : percentage > 20 ? '#fbbf24' : '#ef4444';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'relative',
                    width: '64px',
                    height: '32px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderRadius: '4px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            right: '-6px',
                            top: '8px',
                            width: '4px',
                            height: '16px',
                            background: 'rgba(255,255,255,0.3)',
                            borderRadius: '0 2px 2px 0'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/Grid/Widgets.tsx",
                        lineNumber: 357,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        style: {
                            height: '100%',
                            background: color,
                            borderRadius: '2px'
                        },
                        animate: {
                            width: `${percentage}%`
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/Grid/Widgets.tsx",
                        lineNumber: 358,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Grid/Widgets.tsx",
                lineNumber: 356,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: '20px',
                    fontWeight: '300',
                    color: '#fff'
                },
                children: [
                    percentage,
                    "%",
                    battery.charging && ' ⚡'
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Grid/Widgets.tsx",
                lineNumber: 363,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Grid/Widgets.tsx",
        lineNumber: 355,
        columnNumber: 9
    }, this);
}
_s4(BatteryWidget, "6QENaTXYk6Y1fTwvGYb+FpQ6y0U=");
_c5 = BatteryWidget;
function SystemStatsWidget({ width = 200, height = 200 }) {
    _s5();
    const [stats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        cpu: 45,
        memory: 62,
        disk: 78
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: '100%',
            height: '100%',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
        },
        children: [
            {
                label: 'CPU',
                value: stats.cpu,
                color: '#60a5fa'
            },
            {
                label: 'Memory',
                value: stats.memory,
                color: '#a78bfa'
            },
            {
                label: 'Disk',
                value: stats.disk,
                color: '#4ade80'
            }
        ].map((stat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '4px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '12px',
                                    color: 'rgba(255,255,255,0.6)'
                                },
                                children: stat.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/Grid/Widgets.tsx",
                                lineNumber: 383,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '12px',
                                    color: '#fff'
                                },
                                children: [
                                    stat.value,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Grid/Widgets.tsx",
                                lineNumber: 384,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Grid/Widgets.tsx",
                        lineNumber: 382,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: '4px',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '2px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            style: {
                                height: '100%',
                                background: stat.color,
                                borderRadius: '2px'
                            },
                            animate: {
                                width: `${stat.value}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/Grid/Widgets.tsx",
                            lineNumber: 387,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Grid/Widgets.tsx",
                        lineNumber: 386,
                        columnNumber: 21
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/src/components/Grid/Widgets.tsx",
                lineNumber: 381,
                columnNumber: 17
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/Grid/Widgets.tsx",
        lineNumber: 375,
        columnNumber: 9
    }, this);
}
_s5(SystemStatsWidget, "Sc0d0pufK1DbK8npEIO7ApAs5P4=");
_c6 = SystemStatsWidget;
function NotesWidget({ width = 200, height = 200 }) {
    _s6();
    const [notes, setNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: '100%',
            height: '100%',
            padding: '12px',
            background: 'linear-gradient(135deg, rgba(255,235,59,0.1) 0%, rgba(255,193,7,0.05) 100%)'
        },
        children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
            value: notes,
            onChange: (e)=>setNotes(e.target.value),
            onBlur: ()=>setIsEditing(false),
            placeholder: "Type your notes...",
            autoFocus: true,
            style: {
                width: '100%',
                height: '100%',
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '14px',
                resize: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                lineHeight: '1.5'
            }
        }, void 0, false, {
            fileName: "[project]/src/components/Grid/Widgets.tsx",
            lineNumber: 409,
            columnNumber: 17
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            onClick: ()=>setIsEditing(true),
            style: {
                width: '100%',
                height: '100%',
                color: notes ? '#fff' : 'rgba(255,255,255,0.3)',
                fontSize: '14px',
                cursor: 'text',
                whiteSpace: 'pre-wrap',
                lineHeight: '1.5'
            },
            children: notes || 'Click to add notes...'
        }, void 0, false, {
            fileName: "[project]/src/components/Grid/Widgets.tsx",
            lineNumber: 423,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Grid/Widgets.tsx",
        lineNumber: 404,
        columnNumber: 9
    }, this);
}
_s6(NotesWidget, "IWnpjXWh2B22dJP9z17X0gscPTI=");
_c7 = NotesWidget;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "ClockWidget");
__turbopack_context__.k.register(_c1, "WeatherWidget");
__turbopack_context__.k.register(_c2, "CpuWidget");
__turbopack_context__.k.register(_c3, "ActivityWidget");
__turbopack_context__.k.register(_c4, "CryptoWidget");
__turbopack_context__.k.register(_c5, "BatteryWidget");
__turbopack_context__.k.register(_c6, "SystemStatsWidget");
__turbopack_context__.k.register(_c7, "NotesWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/new/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NewDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$new$2f$new$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/new/new.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Dock$2f$Dock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Dock/Dock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$InteractiveGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/Grid/InteractiveGrid.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$Tile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/Grid/Tile.tsx [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$Widgets$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Grid/Widgets.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/WidgetCenter/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/WidgetCenter/WidgetCenter.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
// Widget factory mapping IDs to components
const WidgetFactory = {
    cpu: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$Widgets$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CpuWidget"],
    network: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$Widgets$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActivityWidget"],
    clock: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$Widgets$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClockWidget"],
    weather: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$Widgets$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WeatherWidget"],
    battery: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$Widgets$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BatteryWidget"],
    stats: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$Widgets$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SystemStatsWidget"],
    crypto: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$Widgets$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CryptoWidget"],
    notes: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$Widgets$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NotesWidget"]
};
function NewDashboard() {
    _s();
    const [isWidgetCenterOpen, setIsWidgetCenterOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeWidgets, setActiveWidgets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: 'clock',
            instanceId: 'clock-1',
            x: 0,
            y: 0
        },
        {
            id: 'weather',
            instanceId: 'weather-1',
            x: 1,
            y: 0
        },
        {
            id: 'cpu',
            instanceId: 'cpu-1',
            x: 0,
            y: 2
        }
    ]);
    const handleAddWidget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NewDashboard.useCallback[handleAddWidget]": (widgetId)=>{
            const instanceId = `${widgetId}-${Date.now()}`;
            const catalogEntry = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIDGET_CATALOG"].find({
                "NewDashboard.useCallback[handleAddWidget].catalogEntry": (c)=>c.id === widgetId
            }["NewDashboard.useCallback[handleAddWidget].catalogEntry"]);
            const newW = catalogEntry?.defaultSize.w || 2;
            const newH = catalogEntry?.defaultSize.h || 2;
            // Find first available position (scan grid for empty spot)
            setActiveWidgets({
                "NewDashboard.useCallback[handleAddWidget]": (prev)=>{
                    // Create a simple occupancy map
                    const occupied = new Set();
                    prev.forEach({
                        "NewDashboard.useCallback[handleAddWidget]": (w)=>{
                            const cat = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIDGET_CATALOG"].find({
                                "NewDashboard.useCallback[handleAddWidget].cat": (c)=>c.id === w.id
                            }["NewDashboard.useCallback[handleAddWidget].cat"]);
                            const wW = cat?.defaultSize.w || 1;
                            const wH = cat?.defaultSize.h || 1;
                            for(let dx = 0; dx < wW; dx++){
                                for(let dy = 0; dy < wH; dy++){
                                    occupied.add(`${w.x + dx},${w.y + dy}`);
                                }
                            }
                        }
                    }["NewDashboard.useCallback[handleAddWidget]"]);
                    // Find first position where new widget fits
                    const cols = 12;
                    for(let y = 0; y < 100; y++){
                        for(let x = 0; x <= cols - newW; x++){
                            let fits = true;
                            for(let dx = 0; dx < newW && fits; dx++){
                                for(let dy = 0; dy < newH && fits; dy++){
                                    if (occupied.has(`${x + dx},${y + dy}`)) {
                                        fits = false;
                                    }
                                }
                            }
                            if (fits) {
                                return [
                                    ...prev,
                                    {
                                        id: widgetId,
                                        instanceId,
                                        x,
                                        y
                                    }
                                ];
                            }
                        }
                    }
                    // Fallback: place at end
                    const maxY = prev.reduce({
                        "NewDashboard.useCallback[handleAddWidget].maxY": (max, w)=>Math.max(max, w.y + 2)
                    }["NewDashboard.useCallback[handleAddWidget].maxY"], 0);
                    return [
                        ...prev,
                        {
                            id: widgetId,
                            instanceId,
                            x: 0,
                            y: maxY
                        }
                    ];
                }
            }["NewDashboard.useCallback[handleAddWidget]"]);
        }
    }["NewDashboard.useCallback[handleAddWidget]"], []);
    const handleDeleteWidget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NewDashboard.useCallback[handleDeleteWidget]": (instanceId)=>{
            setActiveWidgets({
                "NewDashboard.useCallback[handleDeleteWidget]": (prev)=>prev.filter({
                        "NewDashboard.useCallback[handleDeleteWidget]": (w)=>w.instanceId !== instanceId
                    }["NewDashboard.useCallback[handleDeleteWidget]"])
            }["NewDashboard.useCallback[handleDeleteWidget]"]);
        }
    }["NewDashboard.useCallback[handleDeleteWidget]"], []);
    // Handle drag-drop from Widget Center
    const [isDraggingOver, setIsDraggingOver] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleDrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NewDashboard.useCallback[handleDrop]": (e)=>{
            e.preventDefault();
            setIsDraggingOver(false);
            const widgetId = e.dataTransfer.getData('widgetId');
            if (widgetId) {
                handleAddWidget(widgetId);
            }
        }
    }["NewDashboard.useCallback[handleDrop]"], [
        handleAddWidget
    ]);
    const handleDragOver = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NewDashboard.useCallback[handleDragOver]": (e)=>{
            e.preventDefault();
            setIsDraggingOver(true);
        }
    }["NewDashboard.useCallback[handleDragOver]"], []);
    const handleDragLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NewDashboard.useCallback[handleDragLeave]": ()=>{
            setIsDraggingOver(false);
        }
    }["NewDashboard.useCallback[handleDragLeave]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$new$2f$new$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container} ${isDraggingOver ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$new$2f$new$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].draggingOver : ''}`,
        onDrop: handleDrop,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$new$2f$new$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].background
            }, void 0, false, {
                fileName: "[project]/src/app/new/page.tsx",
                lineNumber: 125,
                columnNumber: 13
            }, this),
            activeWidgets.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$new$2f$new$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyState,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$new$2f$new$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyIcon,
                        children: "🧩"
                    }, void 0, false, {
                        fileName: "[project]/src/app/new/page.tsx",
                        lineNumber: 130,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Your Dashboard is Empty"
                    }, void 0, false, {
                        fileName: "[project]/src/app/new/page.tsx",
                        lineNumber: 131,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Click the ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$new$2f$new$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].highlight,
                                children: "Widget Center"
                            }, void 0, false, {
                                fileName: "[project]/src/app/new/page.tsx",
                                lineNumber: 132,
                                columnNumber: 34
                            }, this),
                            " icon in the dock to add widgets"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/new/page.tsx",
                        lineNumber: 132,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$new$2f$new$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyButton,
                        onClick: ()=>setIsWidgetCenterOpen(true),
                        children: "Open Widget Center"
                    }, void 0, false, {
                        fileName: "[project]/src/app/new/page.tsx",
                        lineNumber: 133,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/new/page.tsx",
                lineNumber: 129,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$InteractiveGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["InteractiveGrid"], {
                children: activeWidgets.map((widget)=>{
                    const catalogEntry = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIDGET_CATALOG"].find((c)=>c.id === widget.id);
                    const WidgetComponent = WidgetFactory[widget.id];
                    if (!catalogEntry || !WidgetComponent) return null;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Grid$2f$Tile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Tile"], {
                        "data-grid": {
                            x: widget.x,
                            y: widget.y,
                            w: catalogEntry.defaultSize.w,
                            h: catalogEntry.defaultSize.h,
                            ...catalogEntry.constraints
                        },
                        title: catalogEntry.name,
                        onDelete: ()=>handleDeleteWidget(widget.instanceId),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WidgetComponent, {}, void 0, false, {
                            fileName: "[project]/src/app/new/page.tsx",
                            lineNumber: 163,
                            columnNumber: 29
                        }, this)
                    }, widget.instanceId, false, {
                        fileName: "[project]/src/app/new/page.tsx",
                        lineNumber: 151,
                        columnNumber: 25
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/app/new/page.tsx",
                lineNumber: 143,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WidgetCenter$2f$WidgetCenter$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WidgetCenter"], {
                isOpen: isWidgetCenterOpen,
                onClose: ()=>setIsWidgetCenterOpen(false),
                onAddWidget: handleAddWidget
            }, void 0, false, {
                fileName: "[project]/src/app/new/page.tsx",
                lineNumber: 170,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$new$2f$new$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]['glassy-button'],
                "aria-label": "Home",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "24",
                    height: "24",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                        }, void 0, false, {
                            fileName: "[project]/src/app/new/page.tsx",
                            lineNumber: 179,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                            points: "9 22 9 12 15 12 15 22"
                        }, void 0, false, {
                            fileName: "[project]/src/app/new/page.tsx",
                            lineNumber: 180,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/new/page.tsx",
                    lineNumber: 178,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/new/page.tsx",
                lineNumber: 177,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Dock$2f$Dock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onWidgetCenterClick: ()=>setIsWidgetCenterOpen(true)
            }, void 0, false, {
                fileName: "[project]/src/app/new/page.tsx",
                lineNumber: 185,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/new/page.tsx",
        lineNumber: 118,
        columnNumber: 9
    }, this);
}
_s(NewDashboard, "/Ecc6LN0fe6L+HaSgdzrxPhysN8=");
_c = NewDashboard;
var _c;
__turbopack_context__.k.register(_c, "NewDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_756d8e55._.js.map