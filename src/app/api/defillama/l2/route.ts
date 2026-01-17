import { NextResponse } from 'next/server';

// Proxy for L2 TVL Rankings (DeFiLlama)
export async function GET() {
    try {
        const response = await fetch('https://api.llama.fi/v2/chains', {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`DeFiLlama API error: ${response.status}`);
        }

        const data = await response.json();

        // Define known L2s to filter
        const targetChains = [
            'Arbitrum', 'Optimism', 'Base', 'Blast', 'Scroll', 'Linea',
            'Starknet', 'ZkSync Era', 'Manta', 'Polygon zkEVM'
        ];

        const l2s = data
            .filter((c: any) => targetChains.includes(c.name))
            .sort((a: any, b: any) => b.tvl - a.tvl)
            .map((c: any) => ({
                name: c.name,
                tvl: c.tvl,
                symbol: c.tokenSymbol
            }));

        return NextResponse.json(l2s);

    } catch (error: any) {
        console.error('L2 Proxy error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
