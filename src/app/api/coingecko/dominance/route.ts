import { NextResponse } from 'next/server';

const GLOBAL_API = 'https://api.coingecko.com/api/v3/global';

// Cache for 10 minutes
export const revalidate = 600;

export async function GET() {
    try {
        const res = await fetch(GLOBAL_API);
        const data = await res.json();

        const dom = data.data?.market_cap_percentage || {};

        return NextResponse.json({
            btc: dom.btc || 0,
            eth: dom.eth || 0,
            sol: dom.sol || 0,
            usdt: dom.usdt || 0,
            others: 100 - (dom.btc + dom.eth + dom.sol + dom.usdt)
        });

    } catch (error) {
        console.error('Dominance Proxy Error:', error);
        return NextResponse.json({ btc: 52.4, eth: 17.2, sol: 4.8, usdt: 5.1, others: 20.5 });
    }
}
