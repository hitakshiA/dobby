import { NextResponse } from 'next/server';

// Proxy for Solana TPS (Helius)
export async function GET() {
    const apiKey = process.env.HELIUS_API_KEY || process.env.NEXT_PUBLIC_HELIUS_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'Missing Helius Key' }, { status: 500 });
    }

    try {
        const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: '1',
                method: 'getRecentPerformanceSamples',
                params: [60] // Get last 60 samples
            }),
            next: { revalidate: 10 } // Cache 10s
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        const samples = data.result;

        // Calculate TPS for each sample
        const history = samples.map((s: any) => ({
            tps: s.numTransactions / s.samplePeriodSecs,
            slot: s.slot
        })).reverse(); // Oldest first

        // Current TPS (avg of last 3 for stability)
        const current = history.slice(-3).reduce((acc: number, curr: any) => acc + curr.tps, 0) / 3;

        return NextResponse.json({
            current: Math.round(current),
            history: history
        });

    } catch (error: any) {
        console.error('Helius proxy error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
