import { NextResponse } from 'next/server';

// Proxy for Stablecoin Pegs (DeFiLlama)
export async function GET() {
    try {
        const response = await fetch('https://stablecoins.llama.fi/stablecoins', {
            next: { revalidate: 300 } // Cache 5 min
        });

        if (!response.ok) {
            throw new Error(`DeFiLlama/Stablecoin error: ${response.status}`);
        }

        const data = await response.json();

        // Structure: data.peggedAssets
        const assets = data.peggedAssets || [];

        // Filter for major USD stablecoins
        const targets = ['Tether', 'USDC', 'Dai', 'First Digital USD', 'USDe', 'PayPal USD'];

        const pegs = assets
            .filter((a: any) => targets.includes(a.name))
            .map((a: any) => ({
                name: a.name,
                symbol: a.symbol,
                price: a.price,
                circulating: a.circulating.peggedUSD
            }))
            .sort((a: any, b: any) => b.circulating - a.circulating);

        return NextResponse.json(pegs);

    } catch (error: any) {
        console.error('Peg Proxy error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
