// Tile System Types and Configuration

export interface TileConstraints {
    /** Minimum width in grid units */
    minW?: number;
    /** Maximum width in grid units */
    maxW?: number;
    /** Minimum height in grid units */
    minH?: number;
    /** Maximum height in grid units */
    maxH?: number;
    /** If true, tile cannot be resized */
    static?: boolean;
    /** If true, tile cannot be dragged */
    isDraggable?: boolean;
    /** If true, tile cannot be resized */
    isResizable?: boolean;
}

export interface TileConfig {
    /** Unique identifier for the tile */
    id: string;
    /** Display title shown in tile header */
    title?: string;
    /** Initial width in grid units */
    w: number;
    /** Initial height in grid units */
    h: number;
    /** Initial X position (column) */
    x?: number;
    /** Initial Y position (row) */
    y?: number;
    /** Size constraints for this tile */
    constraints?: TileConstraints;
}

export interface TileGridConfig {
    /** Height of each row in pixels */
    rowHeight?: number;
    /** Gap between tiles [x, y] in pixels */
    margin?: [number, number];
    /** Number of columns at different breakpoints */
    cols?: {
        lg?: number;
        md?: number;
        sm?: number;
        xs?: number;
        xxs?: number;
    };
    /** Breakpoint widths in pixels */
    breakpoints?: {
        lg?: number;
        md?: number;
        sm?: number;
        xs?: number;
        xxs?: number;
    };
    /** Whether tiles compact vertically */
    compactType?: 'vertical' | 'horizontal' | null;
    /** Whether tiles can overlap */
    preventCollision?: boolean;
    /** Which resize handles to show */
    resizeHandles?: Array<'s' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne'>;
}

// Preset tile types for common use cases
export const TILE_PRESETS = {
    /** 1x1 only, no resizing */
    FIXED_SMALL: {
        w: 1, h: 1,
        constraints: { minW: 1, maxW: 1, minH: 1, maxH: 1 }
    },
    /** 2x2 only, no resizing */
    FIXED_MEDIUM: {
        w: 2, h: 2,
        constraints: { minW: 2, maxW: 2, minH: 2, maxH: 2 }
    },
    /** 1x1 to 2x2 */
    FLEXIBLE_SMALL: {
        w: 1, h: 1,
        constraints: { minW: 1, maxW: 2, minH: 1, maxH: 2 }
    },
    /** 2x2 to 4x4 */
    FLEXIBLE_LARGE: {
        w: 2, h: 2,
        constraints: { minW: 2, maxW: 4, minH: 2, maxH: 4 }
    },
    /** 1x1 to 3x2 (wide format) */
    WIDE_WIDGET: {
        w: 2, h: 1,
        constraints: { minW: 1, maxW: 3, minH: 1, maxH: 2 }
    },
    /** 1x2 to 1x4 (tall format) */
    TALL_WIDGET: {
        w: 1, h: 2,
        constraints: { minW: 1, maxW: 1, minH: 2, maxH: 4 }
    },
} as const;

// Default grid configuration - expanded for more positions
export const DEFAULT_GRID_CONFIG: TileGridConfig = {
    rowHeight: 100,
    margin: [12, 12],
    cols: { lg: 12, md: 8, sm: 4, xs: 2, xxs: 1 },
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    compactType: null, // Allow widgets anywhere, not just top
    preventCollision: true, // Prevent overlapping
    resizeHandles: ['s', 'se', 'sw'],
};

// Helper to merge tile config with preset
export function createTileConfig(
    id: string,
    preset: keyof typeof TILE_PRESETS,
    overrides?: Partial<TileConfig>
): TileConfig {
    const presetConfig = TILE_PRESETS[preset];
    return {
        id,
        ...presetConfig,
        ...overrides,
        constraints: {
            ...presetConfig.constraints,
            ...overrides?.constraints,
        },
    };
}
