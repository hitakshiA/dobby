import { NextResponse } from 'next/server';

// Proxy for Top Yields using DeFiLlama
// The original endpoint returns EVERYTHING (MBs of data)
// We filter it here to just return the best opportunities
export async function GET() {
    try {
        const response = await fetch('https://yields.llama.fi/pools', {
            next: { revalidate: 300 } // Cache for 5 minutes
        });

        if (!response.ok) {
            throw new Error(`DeFiLlama API error: ${response.status}`);
        }

        const data = await response.json();

        // Filter and categorize on the server
        const pools = data.data || [];

        // Helper to format
        const process = (p: any) => ({
            chain: p.chain,
            project: p.project,
            symbol: p.symbol,
            apy: p.apy,
            tvl: p.tvlUsd,
            url: `https://defillama.com/yields/pool/${p.pool}`
        });

        // 1. Stablecoins (USDC, USDT, DAI)
        const stable = pools
            .filter((p: any) =>
                p.tvlUsd > 1000000 && // > $1M TVL
                (p.symbol.includes('USDC') || p.symbol.includes('USDT') || p.symbol.includes('DAI')) &&
                !p.symbol.includes('-') // Simple pools preferred
            )
            .sort((a: any, b: any) => b.apy - a.apy)
            .slice(0, 20)
            .map(process);

        // 2. ETH (WETH, stETH)
        const eth = pools
            .filter((p: any) =>
                p.tvlUsd > 1000000 &&
                (p.symbol === 'WETH' || p.symbol === 'ETH' || p.symbol === 'stETH')
            )
            .sort((a: any, b: any) => b.apy - a.apy)
            .slice(0, 20)
            .map(process);

        // 3. SOL (SOL, JitoSOL, mSOL)
        const sol = pools
            .filter((p: any) =>
                p.tvlUsd > 1000000 &&
                p.chain === 'Solana'
            )
            .sort((a: any, b: any) => b.apy - a.apy)
            .slice(0, 20)
            .map(process);

        return NextResponse.json({ stable, eth, sol });
    } catch (error: any) {
        console.error('Yields proxy error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
