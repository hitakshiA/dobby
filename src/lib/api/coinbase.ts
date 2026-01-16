
// Coinbase API - Spot
const BASE_URL = 'https://api.coinbase.com/v2';

export async function getSpotPrice(pair = 'BTC-USD') {
    const response = await fetch(`${BASE_URL}/prices/${pair}/spot`);
    if (!response.ok) throw new Error(`Coinbase API error: ${response.status}`);
    const data = await response.json();
    return data.data;
}

export async function testCoinbaseAPI() {
    try {
        const price = await getSpotPrice();
        return { success: true, data: price };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
