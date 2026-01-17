import { NextResponse } from 'next/server';

// Proxy for CryptoPanic News
export async function GET() {
    const apiKey = process.env.CRYPTOPANIC_API_KEY || process.env.NEXT_PUBLIC_CRYPTOPANIC_API_KEY;

    // Mock data if key is missing
    if (!apiKey) {
        return NextResponse.json({
            results: [
                { id: 1, title: "[DEMO] Bitcoin hits new All-Time High in Hashrate", domain: "mocknews.com", created_at: new Date().toISOString(), url: "https://cryptopanic.com" },
                { id: 2, title: "[DEMO] Ethereum L2 TVL Surpasses $50 Billion", domain: "mockdefi.io", created_at: new Date(Date.now() - 3600000).toISOString(), url: "https://cryptopanic.com" },
                { id: 3, title: "[DEMO] Solana transactions reach 5000 TPS", domain: "mocksol.xyz", created_at: new Date(Date.now() - 7200000).toISOString(), url: "https://cryptopanic.com" },
                { id: 4, title: "[DEMO] API Key Missing - Add CRYPTOPANIC_API_KEY to .env.local", domain: "system", created_at: new Date(Date.now() - 10000000).toISOString(), url: "https://github.com" },
            ]
        });
    }

    try {
        const response = await fetch(
            `https://cryptopanic.com/api/v1/posts/?auth_token=${apiKey}&public=true&filter=hot&kind=news`,
            { next: { revalidate: 300 } } // Cache 5 min
        );

        if (!response.ok) {
            throw new Error(`CryptoPanic API error: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error: any) {
        console.error('CryptoPanic proxy error:', error);
        // Fallback to mock data on ANY error
        return NextResponse.json({
            results: [
                { id: 1, title: "[DEMO] Bitcoin hits new All-Time High in Hashrate", domain: "mocknews.com", created_at: new Date().toISOString(), url: "https://cryptopanic.com" },
                { id: 2, title: "[DEMO] Ethereum L2 TVL Surpasses $50 Billion", domain: "mockdefi.io", created_at: new Date(Date.now() - 3600000).toISOString(), url: "https://cryptopanic.com" },
                { id: 3, title: "[DEMO] Solana transactions reach 5000 TPS", domain: "mocksol.xyz", created_at: new Date(Date.now() - 7200000).toISOString(), url: "https://cryptopanic.com" },
                { id: 4, title: "[DEMO] API Key Invalid or Rate Limited - Showing Mock Data", domain: "system", created_at: new Date(Date.now() - 10000000).toISOString(), url: "https://github.com" },
            ]
        });
    }
}
