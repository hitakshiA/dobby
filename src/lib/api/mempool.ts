
// Mempool.space API - Bitcoin Data
const BASE_URL = 'https://mempool.space/api/v1';

export async function getFees() {
    const response = await fetch(`${BASE_URL}/fees/recommended`);
    if (!response.ok) throw new Error(`Mempool API error: ${response.status}`);
    return response.json();
}

export async function testMempoolAPI() {
    try {
        const fees = await getFees();
        return { success: true, data: fees };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
