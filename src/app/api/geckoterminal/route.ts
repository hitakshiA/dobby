import { NextResponse } from 'next/server';

// Proxy for GeckoTerminal New Pools API
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const network = searchParams.get('network') || 'solana';

    try {
        const response = await fetch(
            `https://api.geckoterminal.com/api/v2/networks/${network}/new_pools?include=quote_token&page=1`,
            {
                headers: {
                    'Accept': 'application/json',
                },
                next: { revalidate: 60 } // Cache for 60 seconds
            }
        );

        if (!response.ok) {
            throw new Error(`GeckoTerminal API error: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('GeckoTerminal proxy error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
