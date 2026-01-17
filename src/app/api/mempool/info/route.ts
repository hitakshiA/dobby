import { NextResponse } from 'next/server';

// Proxy for Mempool.space (Bitcoin Data)
export async function GET() {
    try {
        const [feesRes, heightRes, diffRes] = await Promise.all([
            fetch('https://mempool.space/api/v1/fees/recommended', { next: { revalidate: 30 } }),
            fetch('https://mempool.space/api/blocks/tip/height', { next: { revalidate: 60 } }),
            fetch('https://mempool.space/api/v1/difficulty-adjustment', { next: { revalidate: 300 } })
        ]);

        const fees = await feesRes.json();
        const height = await heightRes.text();
        const diff = await diffRes.json();

        return NextResponse.json({
            fees: fees, // { fastestFee, halfHourFee, hourFee, economyFee, minimumFee }
            height: parseInt(height),
            difficulty: {
                progress: diff.progressPercent, // e.g. 50.5
                change: diff.difficultyChange, // e.g. 2.1 or -1.5
                remainingBlocks: diff.remainingBlocks
            }
        });

    } catch (error: any) {
        console.error('Mempool proxy error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
