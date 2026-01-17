import { NextResponse } from 'next/server';

const GOPLUS_API = 'https://api.gopluslabs.io/api/v1/token_security';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const contract = searchParams.get('contract');
    const chainId = searchParams.get('chainId') || '1'; // Default ETH

    if (!contract) return NextResponse.json({ error: 'Contract required' }, { status: 400 });

    try {
        const res = await fetch(`${GOPLUS_API}/${chainId}?contract_addresses=${contract}`);
        const data = await res.json();
        const result = data.result?.[contract.toLowerCase()] || {};

        return NextResponse.json({
            is_honeypot: result.is_honeypot === "1",
            buy_tax: result.buy_tax,
            sell_tax: result.sell_tax,
            is_open_source: result.is_open_source === "1",
            owner_change_balance: result.owner_change_balance === "1",
        });

    } catch (error) {
        console.error('GoPlus Proxy Error:', error);
        return NextResponse.json({ error: 'Scan Failed' }, { status: 500 });
    }
}
