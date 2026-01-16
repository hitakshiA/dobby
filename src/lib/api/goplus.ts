
// GoPlus API - Security
const BASE_URL = 'https://api.gopluslabs.io/api/v1';

export async function checkMaliciousAddress(address: string, chainId = '1') {
    const response = await fetch(`${BASE_URL}/address_security/${address}?chain_id=${chainId}`);
    if (!response.ok) throw new Error(`GoPlus API error: ${response.status}`);
    const data = await response.json();
    return data.result;
}

export async function testGoPlusAPI() {
    try {
        // Phishing address for test
        const result = await checkMaliciousAddress('0x2f523F1142F6ae755A8174457D279930Ec031846');
        return {
            success: true,
            data: {
                malicious: result.malicious_address === 1,
                display: result.malicious_address === 1 ? 'MALICIOUS' : 'SAFE'
            }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
