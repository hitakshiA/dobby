
// OpenOcean API - Aggregator
const BASE_URL = 'https://open-api.openocean.finance/v3/eth';

export async function getQuote(inToken = '0xEeeeeEeeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', outToken = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', amount = '1') {
    const response = await fetch(`${BASE_URL}/quote?inTokenAddress=${inToken}&outTokenAddress=${outToken}&amount=${amount}&gasPrice=50&slippage=1`);
    if (!response.ok) throw new Error(`OpenOcean API error: ${response.status}`);
    const data = await response.json();
    return data.data;
}

export async function testOpenOceanAPI() {
    try {
        const quote = await getQuote();
        return {
            success: true,
            data: {
                outAmount: quote.outAmount,
                estGas: quote.estimatedGas
            }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
