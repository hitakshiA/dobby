
// Etherscan API - Gas Oracle
// Note: Using V2 Endpoint if generic, or standard params.
const BASE_URL = 'https://api.etherscan.io/api';
const API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY || 'YourApiKeyToken'; // Fallback works for free tier often

export async function getGasOracle() {
    const response = await fetch(`${BASE_URL}?module=gastracker&action=gasoracle&apikey=${API_KEY}`);
    if (!response.ok) throw new Error(`Etherscan API error: ${response.status}`);
    const data = await response.json();
    if (data.status !== '1') throw new Error(`Etherscan Error: ${data.message}`);
    return data.result;
}

export async function testEtherscanAPI() {
    try {
        const gas = await getGasOracle();
        return {
            success: true,
            data: {
                safe: gas.SafeGasPrice,
                fast: gas.FastGasPrice
            }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
