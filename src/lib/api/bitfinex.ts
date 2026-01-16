
// Bitfinex API - Spot
const BASE_URL = 'https://api-pub.bitfinex.com/v2';

export async function getTicker(symbol = 'tBTCUSD') {
    const response = await fetch(`${BASE_URL}/ticker/${symbol}`);
    if (!response.ok) throw new Error(`Bitfinex API error: ${response.status}`);
    const data = await response.json();
    // [BID, BID_SIZE, ASK, ASK_SIZE, DAILY_CHANGE, DAILY_CHANGE_REL, LAST_PRICE, VOLUME, HIGH, LOW]
    return {
        last: data[6],
        volume: data[7],
        dailyChange: `${(data[5] * 100).toFixed(2)}%`
    };
}

export async function testBitfinexAPI() {
    try {
        const data = await getTicker();
        return { success: true, data };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
