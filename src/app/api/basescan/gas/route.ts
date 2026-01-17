import { NextResponse } from 'next/server';

// Proxy for Base Network Gas (RPC)
export async function GET() {
    try {
        const response = await fetch('https://mainnet.base.org', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'eth_gasPrice',
                params: []
            }),
            next: { revalidate: 10 } // Cache 10s
        });

        const data = await response.json();

        // Value is in wei (hex)
        const wei = parseInt(data.result, 16);
        const gwei = wei / 1e9;

        // Estimate basic transfer cost (21000 gas)
        // Need ETH Price for $ conversion.
        // Let's just return Gwei for now.

        return NextResponse.json({
            gwei: gwei,
            wei: wei
        });

    } catch (error: any) {
        console.error('Base Gas Proxy error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
