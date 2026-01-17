import { NextResponse } from 'next/server';

// Proxy for Global Market Metrics (CoinPaprika)
// Free, no key required, reliable
export async function GET() {
    try {
        const response = await fetch('https://api.coinpaprika.com/v1/global', {
            next: { revalidate: 300 } // Cache for 5 minutes
        });

        if (!response.ok) {
            throw new Error(`CoinPaprika API error: ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json({
            marketCap: data.market_cap_usd,
            volume24h: data.volume_24h_usd,
            btcDominance: data.bitcoin_dominance_percentage,
            marketCapChange: data.market_cap_change_24h,
            volumeChange: data.volume_24h_change_24h
        });

    } catch (error: any) {
        console.error('Global Metrics error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
