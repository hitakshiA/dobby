import { NextResponse } from 'next/server';

// Proxy for Trending NFTs (CoinGecko)
// Free, reliable, volume-sorted
export async function GET() {
    try {
        const response = await fetch(
            'https://api.coingecko.com/api/v3/nfts/markets?order=h24_volume_native_desc&per_page=10&page=1',
            { next: { revalidate: 300 } } // Cache 5 min
        );

        if (!response.ok) {
            throw new Error(`CoinGecko NFT error: ${response.status}`);
        }

        const data = await response.json();

        // Map to simpler format
        const trending = data.map((c: any) => ({
            id: c.id,
            name: c.name,
            symbol: c.symbol,
            floor_price: c.floor_price_in_native_currency,
            floor_change: c.floor_price_24h_percentage_change,
            volume_24h: c.volume_24h_native_currency,
            image: c.image.small // URL
        }));

        return NextResponse.json(trending);

    } catch (error: any) {
        console.error('NFT Proxy error:', error);
        // Mock Data Fallback
        return NextResponse.json([
            { id: 'bored-ape-yacht-club', name: 'Bored Ape YC', symbol: 'BAYC', floor_price: 12.5, floor_change: 2.4, volume_24h: 450, image: 'https://assets.coingecko.com/nft_contracts/images/359/small/bayc.png' },
            { id: 'mutant-ape-yacht-club', name: 'Mutant Ape YC', symbol: 'MAYC', floor_price: 2.1, floor_change: -1.2, volume_24h: 120, image: 'https://assets.coingecko.com/nft_contracts/images/362/small/mayc.png' },
            { id: 'pudgy-penguins', name: 'Pudgy Penguins', symbol: 'PPG', floor_price: 9.8, floor_change: 5.1, volume_24h: 300, image: 'https://assets.coingecko.com/nft_contracts/images/456/small/pudgy.png' },
            { id: 'azuki', name: 'Azuki', symbol: 'AZUKI', floor_price: 4.5, floor_change: 0.5, volume_24h: 200, image: 'https://assets.coingecko.com/nft_contracts/images/403/small/azuki.png' },
            { id: 'milady', name: 'Milady Maker', symbol: 'MILADY', floor_price: 3.2, floor_change: 8.4, volume_24h: 150, image: 'https://assets.coingecko.com/nft_contracts/images/848/small/milady.png' },
        ]);
    }
}
