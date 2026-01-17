import { NextResponse } from 'next/server';

const IMPERATOR_URL = 'https://api-osmosis.imperator.co';

// Cache for 5 minutes
export const revalidate = 300;

export async function GET() {
    try {
        const [metricsRes, liquidityRes] = await Promise.all([
            fetch(`${IMPERATOR_URL}/overview/v1/metrics`),
            fetch(`${IMPERATOR_URL}/liquidity/v2/historical/chart`)
        ]);

        const metrics = await metricsRes.json();
        // Liquidity might be heavy, let's just use metrics for now if it has what we need
        // Metrics usually has volume_24h, liquidity_usd, etc.

        return NextResponse.json(metrics);
    } catch (error) {
        console.error('Osmosis Proxy Error:', error);
        return NextResponse.json({
            liquidity_usd: 0,
            volume_24h: 0,
            price_change_24h: 0
        }, { status: 500 });
    }
}
