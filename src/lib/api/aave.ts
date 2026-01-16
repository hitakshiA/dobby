
// AAVE API - Lending Rates (via TheGraph)
const BASE_URL = 'https://aave-api-v2.aave.com';

export async function getReserves() {
    const response = await fetch(`${BASE_URL}/data/rates-history?reserveId=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb480x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e1`);
    if (!response.ok) throw new Error(`AAVE API error: ${response.status}`);
    return response.json();
}

export async function testAaveAPI() {
    try {
        const data = await getReserves();
        return { success: true, data: { records: data.length || 'N/A' } };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
