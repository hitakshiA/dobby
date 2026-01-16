
// CoinPaprika API - Global Data
const BASE_URL = 'https://api.coinpaprika.com/v1';

export async function getCoin(id = 'btc-bitcoin') {
    const response = await fetch(`${BASE_URL}/tickers/${id}`);
    if (!response.ok) throw new Error(`CoinPaprika API error: ${response.status}`);
    return response.json();
}

export async function testCoinPaprikaAPI() {
    try {
        const coin = await getCoin();
        return {
            success: true,
            data: {
                name: coin.name,
                rank: coin.rank,
                price: coin.quotes.USD.price
            }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
