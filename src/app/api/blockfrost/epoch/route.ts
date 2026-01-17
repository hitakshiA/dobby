import { NextResponse } from 'next/server';

// Proxy for Cardano Epoch (Blockfrost)
export async function GET() {
    const apiKey = process.env.BLOCKFROST_API_KEY || process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'Missing Blockfrost Key' }, { status: 500 });
    }

    try {
        const response = await fetch('https://cardano-mainnet.blockfrost.io/api/v0/epochs/latest', {
            headers: { 'project_id': apiKey },
            next: { revalidate: 300 } // Cache 5 min
        });

        if (!response.ok) {
            throw new Error(`Blockfrost API error: ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json(data);

    } catch (error: any) {
        console.error('Cardano proxy error:', error);
        // Mock Data Fallback
        const now = Math.floor(Date.now() / 1000);
        return NextResponse.json({
            epoch: 530,
            start_time: now - 300000, // Started 5 mins ago
            end_time: now + 128000,   // Ends in ~2 days
            tx_count: 45200,
            isMock: true
        });
    }
}
