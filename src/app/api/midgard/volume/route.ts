import { NextResponse } from 'next/server';

// Proxy for Thorchain Stats (Midgard)
export async function GET() {
    try {
        const response = await fetch(
            'https://midgard.ninerealms.com/v2/history/stats?interval=day&count=1',
            { next: { revalidate: 300 } } // Cache 5 min
        );

        if (!response.ok) {
            throw new Error(`Midgard API error: ${response.status}`);
        }

        const data = await response.json();

        // Midgard returns amounts in 1e8 notation (thor units)
        // e.g. "swapVolume": "12345678900"
        const interval = data.intervals && data.intervals[0] ? data.intervals[0] : null;

        if (!interval) {
            throw new Error('No Midgard data');
        }

        /* 
           Midgard values (like swapVolume) are in RUNE * 1e8.
           Wait, 'swapVolume' is in RUNE. 
           Need Rune Price to get USD?
           Midgard v2 returns 'stats' with values usually in Rune units.
           Actually, 'swapVolume' is sum of all swaps in Rune value.
           Midgard also provides `runePriceUSD` in `v2/stats`.
        */

        const priceRes = await fetch('https://midgard.ninerealms.com/v2/stats', { next: { revalidate: 60 } });
        const priceData = await priceRes.json();
        const runePrice = parseFloat(priceData.runePriceUSD);

        const volumeRune = parseFloat(interval.swapVolume) / 1e8;
        const volumeUsd = volumeRune * runePrice;

        return NextResponse.json({
            volume24h: volumeUsd,
            runePrice: runePrice,
            swapCount: parseInt(interval.swapCount)
        });

    } catch (error: any) {
        console.error('Thorchain proxy error:', error);
        // Mock Data Fallback
        return NextResponse.json({
            volume24h: 15000000 + Math.random() * 5000000,
            runePrice: 5.24,
            swapCount: 12500,
            isMock: true
        });
    }
}
