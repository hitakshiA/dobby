import { NextResponse } from 'next/server';

// Proxy for Polymarket API (bypasses CORS)
export async function GET() {
    try {
        const response = await fetch(
            'https://gamma-api.polymarket.com/events?limit=50&active=true&closed=false',
            {
                headers: {
                    'Accept': 'application/json',
                },
                next: { revalidate: 60 } // Cache for 60 seconds
            }
        );

        if (!response.ok) {
            throw new Error(`Polymarket API error: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Polymarket proxy error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
