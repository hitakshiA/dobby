
// Birdeye API - Trending Tokens
const BASE_URL = 'https://public-api.birdeye.so/defi';
const API_KEY = process.env.NEXT_PUBLIC_BIRDEYE_API_KEY;

export async function getTrendingTokens(tags = 'trending') {
    if (!API_KEY) throw new Error('Birdeye API Key missing');
    const response = await fetch(`${BASE_URL}/token_trending?sort_by=rank&sort_type=asc&offset=0&limit=3`, {
        headers: {
            'X-API-KEY': API_KEY,
            'Accept': 'application/json',
            'x-chain': 'solana'
        }
    });

    if (!response.ok) throw new Error(`Birdeye API error: ${response.status}`);
    const data = await response.json();
    return data.data.tokens;
}

export async function testBirdeyeAPI(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
        if (!API_KEY) return { success: false, error: 'Missing API Key' };
        const tokens = await getTrendingTokens();
        return {
            success: true,
            data: tokens.map((t: any) => `${t.symbol} ($${t.price})`)
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
