import { NextResponse } from 'next/server';

const HACKS_API = 'https://api.llama.fi/hacks';

// Cache for 1 hour
export const revalidate = 3600;

export async function GET() {
    try {
        const res = await fetch(HACKS_API);
        const data = await res.json();

        // Return top 5 recent hacks
        // Structure: name, date, amount, chain
        if (Array.isArray(data)) {
            const recent = data.slice(0, 5).map((h: any) => ({
                name: h.name,
                date: h.date,
                amount: h.amount,
                chain: h.chain
            }));
            return NextResponse.json(recent);
        }

        return NextResponse.json([]);

    } catch (error) {
        console.error('Hacks Proxy Error:', error);
        // Fallback
        return NextResponse.json([
            { name: 'KyberSwap', date: 1700697600, amount: 48000000, chain: 'Elastic' },
            { name: 'Poloniex', date: 1699574400, amount: 126000000, chain: 'Multi' }
        ]);
    }
}
