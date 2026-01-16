
// Alternative.me - Fear & Greed
const BASE_URL = 'https://api.alternative.me/fng';

export async function getFNG() {
    const response = await fetch(`${BASE_URL}/?limit=1`);
    if (!response.ok) throw new Error(`FNG API error: ${response.status}`);
    const data = await response.json();
    return data.data[0];
}

export async function testAlternativeAPI() {
    try {
        const fng = await getFNG();
        return { success: true, data: { value: fng.value, classification: fng.value_classification } };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
