import { NextResponse } from 'next/server';

const BIRDEYE_API = 'https://public-api.birdeye.so/defi/token_trending?sort_by=rank&sort_type=asc&offset=0&limit=3';

export const revalidate = 300; // 5 min

export async function GET() {
    try {
        const res = await fetch(BIRDEYE_API, {
            headers: {
                'X-API-KEY': process.env.NEXT_PUBLIC_BIRDEYE_API_KEY || '',
                'x-chain': 'solana',
                'accept': 'application/json'
            }
        });

        const data = await res.json();

        if (!data.success) {
            throw new Error('Birdeye API Failed');
        }

        return NextResponse.json(data.data.tokens);
    } catch (error) {
        console.error('Birdeye Proxy Error:', error);
        // Fallback Mock
        return NextResponse.json([
            { symbol: 'BONK', rank: 1, price: 0.000012, liquidity: 5000000 },
            { symbol: 'WIF', rank: 2, price: 0.35, liquidity: 2000000 },
            { symbol: 'JUP', rank: 3, price: 0.55, liquidity: 15000000 }
        ]);
    }
}
