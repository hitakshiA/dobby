
// Thorchain Midgard API
const BASE_URL = 'https://midgard.ninerealms.com/v2';

export async function getNetwork() {
    const response = await fetch(`${BASE_URL}/network`);
    if (!response.ok) throw new Error(`Thorchain API error: ${response.status}`);
    return response.json();
}

export async function testThorchainAPI() {
    try {
        const net = await getNetwork();
        return {
            success: true,
            data: {
                bondClout: net.bondMetrics?.totalActiveBond,
                nodes: net.activeNodeCount
            }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
