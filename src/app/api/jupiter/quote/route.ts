import { NextResponse } from 'next/server';

// Jupiter V6 Quote API
const JUPITER_API = 'https://quote-api.jup.ag/v6';

// Cache for 30 seconds (fast moving)
export const revalidate = 30;

export async function GET() {
    try {
        // Quote for 1 SOL to USDC
        // SOL Mint: So11111111111111111111111111111111111111112
        // USDC Mint: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
        const amount = 1000000000; // 1 SOL (9 decimals)
        const url = `${JUPITER_API}/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=${amount}&slippageBps=50`;

        const res = await fetch(url);
        const data = await res.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Jupiter Proxy Error:', error);
        return NextResponse.json({ error: 'Failed to fetch quote' }, { status: 500 });
    }
}
