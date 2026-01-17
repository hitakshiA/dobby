import { NextResponse } from 'next/server';

const STABLE_API = 'https://stablecoins.llama.fi/stablecoins?includePrices=true';

// Cache for 1 hour
export const revalidate = 3600;

export async function GET() {
    try {
        const res = await fetch(STABLE_API);
        const data = await res.json();

        // Return top 4
        if (Array.isArray(data.peggedAssets)) {
            const top = data.peggedAssets.slice(0, 4).map((s: any) => ({
                symbol: s.symbol,
                name: s.name,
                mcap: s.circulating.peggedUSD || 0,
                price: s.price || 1.0
            }));
            return NextResponse.json(top);
        }
        return NextResponse.json([]);

    } catch (error) {
        console.error('Stablecoin Proxy Error:', error);
        return NextResponse.json([]);
    }
}
