
// Coinglass API - Liquidations & Funding
const BASE_URL = 'https://open-api.coinglass.com/public/v2';

export async function getLiquidations() {
    const response = await fetch(`${BASE_URL}/liquidation_chart?symbol=BTC&time_type=h1`);
    if (!response.ok) throw new Error(`Coinglass API error: ${response.status}`);
    return response.json();
}

export async function getFundingRates() {
    const response = await fetch(`${BASE_URL}/funding`);
    if (!response.ok) throw new Error(`Coinglass API error: ${response.status}`);
    return response.json();
}

export async function testCoinglassAPI() {
    try {
        const data = await getFundingRates();
        return { success: true, data: { count: data.data?.length || 'N/A' } };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
