import { NextResponse } from 'next/server';

// Proxy for Trending Searches (CoinGecko)
export async function GET() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/search/trending', {
            next: { revalidate: 300 } // Cache 5 min
        });

        if (!response.ok) {
            throw new Error(`CoinGecko Trending error: ${response.status}`);
        }

        const data = await response.json();
        const coins = data.coins || [];

        const trending = coins.map((item: any) => ({
            id: item.item.id,
            name: item.item.name,
            symbol: item.item.symbol,
            rank: item.item.market_cap_rank,
            thumb: item.item.thumb,
            score: item.item.score
        }));

        return NextResponse.json(trending);

    } catch (error: any) {
        console.error('Trending Proxy error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
