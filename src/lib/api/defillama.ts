
// DeFiLlama API - TVL & Chaos
const BASE_URL = 'https://api.llama.fi';

export async function getHacks() {
    const response = await fetch(`${BASE_URL}/hacks`);
    if (!response.ok) throw new Error(`DeFiLlama Hacks API error: ${response.status}`);
    return response.json();
}

export async function getChains() {
    const response = await fetch(`${BASE_URL}/v2/chains`);
    if (!response.ok) throw new Error(`DeFiLlama Chains API error: ${response.status}`);
    return response.json();
}

export async function testDeFiLlamaAPI() {
    try {
        const hacks = await getHacks();
        const chains = await getChains();
        return {
            success: true,
            data: {
                hacksCount: hacks.length,
                chainsCount: chains.length,
                topChain: chains[0]?.name
            }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
