
// Token Unlocks API
const BASE_URL = 'https://token.unlocks.app/api';

export async function getUnlocks() {
    const response = await fetch(`${BASE_URL}/v1/unlocks`);
    if (!response.ok) throw new Error(`TokenUnlocks API error: ${response.status}`);
    return response.json();
}

export async function testTokenUnlocksAPI() {
    try {
        const data = await getUnlocks();
        return { success: true, data: { events: data.length || 'N/A' } };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
