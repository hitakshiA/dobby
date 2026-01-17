import { NextResponse } from 'next/server';

const TREASURY_API = 'https://api.llama.fi/protocols'; // Treasuries often listed here or specific endpoint

// Using a simplified mock for reliability as /treasury endpoint structure varies complexly
export async function GET() {
    const treasuries = [
        { name: 'Arbitrum DAO', value: 3200000000, asset: 'ARB' },
        { name: 'Uniswap', value: 2400000000, asset: 'UNI' },
        { name: 'Optimism', value: 1100000000, asset: 'OP' },
        { name: 'Ethereum Foundation', value: 980000000, asset: 'ETH' },
    ];

    return NextResponse.json(treasuries);
}
