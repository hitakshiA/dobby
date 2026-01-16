
// Kalshi API - Regulated Prediction Markets
// Docs: https://kalshi.com/docs/api
// Verified Endpoint: Public Trade API v2

const BASE_URL = 'https://api.elections.kalshi.com/trade-api/v2';

export async function getPublicMarkets(limit = 5) {
    // Verified params: limit only (status=active caused 400)
    const response = await fetch(`${BASE_URL}/markets?limit=${limit}`);
    if (!response.ok) throw new Error(`Kalshi API error: ${response.status}`);
    const data = await response.json();
    return data.markets;
}

export async function testKalshiAPI(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
        const markets = await getPublicMarkets();
        return {
            success: true,
            data: markets.slice(0, 3).map((m: any) => ({
                ticker: m.ticker,
                title: m.title,
                volume: m.volume
            }))
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
