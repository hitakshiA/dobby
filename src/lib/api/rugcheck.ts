
// RugCheck API - Solana Token Safety
// Docs: https://rugcheck.xyz/api

const BASE_URL = 'https://api.rugcheck.xyz/v1';

export async function checkToken(mint: string) {
    const response = await fetch(`${BASE_URL}/tokens/${mint}/report`);
    if (!response.ok) throw new Error(`RugCheck API error: ${response.status}`);
    return response.json();
}

export async function testRugCheckAPI(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
        // Test with BONK
        const report = await checkToken('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263');
        return {
            success: true,
            data: {
                score: report.score,
                risk: report.score > 2000 ? 'High' : (report.score > 500 ? 'Medium' : 'Low'),
                risks_count: report.risks?.length || 0
            }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
