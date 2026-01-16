
// Lido API - Staking Stats
const BASE_URL = 'https://stake.lido.fi/api';

export async function getStats() {
    const response = await fetch(`${BASE_URL}/stats`);
    if (!response.ok) throw new Error(`Lido API error: ${response.status}`);
    return response.json();
}

export async function testLidoAPI() {
    try {
        const data = await getStats();
        return { success: true, data };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
