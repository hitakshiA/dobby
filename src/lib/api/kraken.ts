
// Kraken API - Spot
const BASE_URL = 'https://api.kraken.com/0/public';

export async function getTicker(pair = 'XBTUSDT') {
    const response = await fetch(`${BASE_URL}/Ticker?pair=${pair}`);
    if (!response.ok) throw new Error(`Kraken API error: ${response.status}`);
    const data = await response.json();
    return data.result[pair] || data.result[Object.keys(data.result)[0]];
}

export async function testKrakenAPI() {
    try {
        const ticker = await getTicker();
        // a = ask, b = bid, c = close
        return {
            success: true,
            data: {
                price: ticker.c[0],
                low: ticker.l[0],
                high: ticker.h[0]
            }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
