import { NextResponse } from 'next/server';

// Proxy for Binance Order Book Depth
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') || 'BTCUSDT';
    const limit = searchParams.get('limit') || '20';

    try {
        const response = await fetch(
            `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=${limit}`,
            { next: { revalidate: 5 } } // Fast revalidate for orderbook
        );

        if (!response.ok) {
            throw new Error(`Binance API error: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Depth proxy error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
