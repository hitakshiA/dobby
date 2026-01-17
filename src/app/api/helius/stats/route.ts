import { NextResponse } from 'next/server';

const HELIUS_RPC = `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`;

// Cache for 10 seconds
export const revalidate = 10;

export async function GET() {
    try {
        // Fetch TPS (Recent Performance Samples)
        const res = await fetch(HELIUS_RPC, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getRecentPerformanceSamples',
                params: [1]
            })
        });

        const data = await res.json();

        // Calculate TPS from sample
        // sample: { numTransactions, samplePeriodSecs, slot }
        const sample = data.result?.[0];
        const tps = sample ? Math.round(sample.numTransactions / sample.samplePeriodSecs) : 0;

        return NextResponse.json({
            tps,
            slot: sample?.slot || 0
        });

    } catch (error) {
        console.error('Helius Proxy Error:', error);
        // Fallback mock
        return NextResponse.json({ tps: 2450, slot: 0 });
    }
}
