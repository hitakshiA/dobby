
// Deribit API - Options
const BASE_URL = 'https://www.deribit.com/api/v2';

export async function getBookSummary(currency = 'BTC') {
    const response = await fetch(`${BASE_URL}/public/get_book_summary_by_currency?currency=${currency}&kind=option`);
    if (!response.ok) throw new Error(`Deribit API error: ${response.status}`);
    const data = await response.json();
    return data.result;
}

export async function testDeribitAPI() {
    try {
        const summary = await getBookSummary();
        // Sum open interest
        const totalOI = summary.reduce((acc: number, item: any) => acc + item.open_interest, 0);
        return {
            success: true,
            data: {
                contracts: summary.length,
                totalOI: totalOI.toFixed(2)
            }
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
