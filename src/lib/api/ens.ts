
// ENS API - Domain Lookup
const BASE_URL = 'https://api.ensideas.com/ens/resolve';

export async function resolveName(name = 'vitalik.eth') {
    const response = await fetch(`${BASE_URL}/${name}`);
    if (!response.ok) throw new Error(`ENS API error: ${response.status}`);
    return response.json();
}

export async function testEnsAPI() {
    try {
        const data = await resolveName();
        return { success: true, data: { address: data.address, avatar: data.avatar } };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
