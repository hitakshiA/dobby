import { NextResponse } from 'next/server';

// Proxy for Deribit Options Open Interest
// Calculates Total Notional OI for BTC and ETH Options
export async function GET() {
    try {
        const [btcResponse, ethResponse] = await Promise.all([
            fetch('https://www.deribit.com/api/v2/public/get_book_summary_by_currency?currency=BTC&kind=option', { next: { revalidate: 60 } }),
            fetch('https://www.deribit.com/api/v2/public/get_book_summary_by_currency?currency=ETH&kind=option', { next: { revalidate: 60 } })
        ]);

        const btcData = await btcResponse.json();
        const ethData = await ethResponse.json();

        // Helper to calculate Open Interest in Coins (Since 1 Contract = 1 Coin)
        const calculateOI = (result: any[]) => {
            if (!result || !Array.isArray(result)) return { coins: 0, index: 0 };

            // Sum all open interest
            const totalCoins = result.reduce((acc, item) => acc + (item.open_interest || 0), 0);

            // Get Index Price from first valid item
            const indexPrice = result.find(item => item.estimated_delivery_price)?.estimated_delivery_price || 0;

            return { coins: totalCoins, index: indexPrice };
        };

        const btc = calculateOI(btcData.result);
        const eth = calculateOI(ethData.result);

        const btcH24 = btcData.result?.reduce((acc: number, item: any) => acc + (item.volume || 0), 0) || 0;
        const ethH24 = ethData.result?.reduce((acc: number, item: any) => acc + (item.volume || 0), 0) || 0;

        return NextResponse.json({
            btc: {
                coins: btc.coins,
                usd: btc.coins * btc.index,
                price: btc.index,
                volume24h: btcH24 * btc.index
            },
            eth: {
                coins: eth.coins,
                usd: eth.coins * eth.index,
                price: eth.index,
                volume24h: ethH24 * eth.index
            },
            totalUsd: (btc.coins * btc.index) + (eth.coins * eth.index)
        });

    } catch (error: any) {
        console.error('Deribit proxy error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
