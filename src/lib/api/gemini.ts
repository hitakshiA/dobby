
// Gemini API - Spot
const BASE_URL = 'https://api.gemini.com/v1';

export async function getTicker(pair = 'btcusd') {
    const response = await fetch(`${BASE_URL}/pubticker/${pair}`);
    if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);
    return response.json();
}

export async function testGeminiAPI() {
    try {
        const ticker = await getTicker();
        return {
            success: true,
            data: {
                bid: ticker.bid,
                ask: ticker.ask,
                last: ticker.last
            }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
