import { NextResponse } from 'next/server';

const BASE_URL = 'https://api.geckoterminal.com/api/v2';

// Cache for 1 minute
export const revalidate = 60;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const network = searchParams.get('network') || 'solana';
    const poolAddress = searchParams.get('pool_address');
    const timeframe = searchParams.get('timeframe') || 'hour';
    const aggregate = searchParams.get('aggregate') || '1';
    const limit = searchParams.get('limit') || '100';

    if (!poolAddress) {
        return NextResponse.json({ error: 'Pool address is required' }, { status: 400 });
    }

    // Default to SOL/USDC pool if generic test
    // Raydium SOL/USDC: 58oQChx4yWmvKdwLLZzBi4ChoCcKTk3Vm82J878dBx8C

    try {
        const url = `${BASE_URL}/networks/${network}/pools/${poolAddress}/ohlcv/${timeframe}?aggregate=${aggregate}&limit=${limit}`;

        console.log(`Fetching OHLCV from: ${url}`);

        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'DobbyDashboard/1.0'
            }
        });

        if (!res.ok) {
            console.error(`GeckoTerminal API Error: ${res.status} ${res.statusText}`);
            // Fallback mock data if API fails (common with rate limits)
            throw new Error(`API returned ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Error fetching OHLCV:', error);

        // Return Mock Data for robustness
        const now = Math.floor(Date.now() / 1000);
        const mockData = {
            data: {
                attributes: {
                    ohlcv_list: Array.from({ length: 100 }, (_, i) => {
                        const time = now - (i * 3600);
                        const open = 150 + Math.random() * 10;
                        const close = 150 + Math.random() * 10;
                        const high = Math.max(open, close) + Math.random() * 2;
                        const low = Math.min(open, close) - Math.random() * 2;
                        const volume = Math.random() * 100000;
                        return [time, open, high, low, close, volume];
                    }).reverse()
                }
            }
        };

        return NextResponse.json(mockData);
    }
}
