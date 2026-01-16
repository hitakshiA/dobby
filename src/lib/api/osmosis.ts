
// Osmosis LCD API
const BASE_URL = 'https://lcd.osmosis.zone';

export async function getLatestBlock() {
    const response = await fetch(`${BASE_URL}/cosmos/base/tendermint/v1beta1/blocks/latest`);
    if (!response.ok) throw new Error(`Osmosis API error: ${response.status}`);
    return response.json();
}

export async function testOsmosisAPI() {
    try {
        const block = await getLatestBlock();
        return {
            success: true,
            data: {
                height: block.block.header.height,
                time: block.block.header.time
            }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
