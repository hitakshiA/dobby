
// CoinGecko API - Trending & Global
const BASE_URL = 'https://api.coingecko.com/api/v3';

export async function getTrending() {
    const response = await fetch(`${BASE_URL}/search/trending`);
    if (!response.ok) throw new Error(`CoinGecko API error: ${response.status}`);
    return response.json();
}

export async function getGlobal() {
    const response = await fetch(`${BASE_URL}/global`);
    if (!response.ok) throw new Error(`CoinGecko API error: ${response.status}`);
    return response.json();
}

export async function testCoinGeckoAPI() {
    try {
        const trending = await getTrending();
        return {
            success: true,
            data: trending.coins.slice(0, 3).map((c: any) => c.item.name)
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
