
// Polymarket API - Prediction Markets
// Docs: https://docs.polymarket.com/
// Verified Endpoint: Gamma API

const BASE_URL = 'https://gamma-api.polymarket.com';

export async function getEvents(limit = 3) {
    // Verified params: active=true, closed=false
    const response = await fetch(`${BASE_URL}/events?limit=${limit}&active=true&closed=false`);
    if (!response.ok) throw new Error(`Polymarket API error: ${response.status}`);
    return response.json();
}

export async function testPolymarketAPI(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
        const events = await getEvents();
        return {
            success: true,
            data: events.slice(0, 3).map((e: any) => ({
                title: e.title,
                volume: `$${(e.volume / 1e6).toFixed(1)}M`,
                slug: e.slug
            }))
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
