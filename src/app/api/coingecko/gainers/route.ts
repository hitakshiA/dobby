import { NextResponse } from 'next/server';

// Proxy for Top Gainers (CoinGecko)
export async function GET() {
    try {
        const response = await fetch(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=price_change_percentage_24h_desc&per_page=10&page=1',
            { next: { revalidate: 300 } } // Cache 5 min
        );

        if (!response.ok) {
            throw new Error(`CoinGecko Gainers error: ${response.status}`);
        }

        const data = await response.json();

        const gainers = data.map((c: any) => ({
            id: c.id,
            name: c.name,
            symbol: c.symbol,
            image: c.image,
            price: c.current_price,
            change: c.price_change_percentage_24h
        }));

        return NextResponse.json(gainers);

    } catch (error: any) {
        console.error('Gainers Proxy error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
