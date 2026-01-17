import { NextResponse } from 'next/server';

const SNAPSHOT_GRAPHQL_URL = 'https://hub.snapshot.org/graphql';

// Cache for 5 minutes
export const revalidate = 300;

const QUERY = `
query Proposals {
  proposals(
    first: 6,
    skip: 0,
    where: {
      space_in: ["aave.eth", "uniswap", "ens.eth", "gitcoindao.eth"],
      state: "active"
    },
    orderBy: "created",
    orderDirection: desc
  ) {
    id
    title
    body
    start
    end
    state
    author
    space {
      id
      name
      avatar
    }
  }
}
`;

export async function GET() {
    try {
        const res = await fetch(SNAPSHOT_GRAPHQL_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'DobbyDashboard/1.0'
            },
            body: JSON.stringify({ query: QUERY }),
        });

        if (!res.ok) {
            throw new Error(`Snapshot GraphAPI Error: ${res.status}`);
        }

        const json = await res.json();
        return NextResponse.json(json.data);

    } catch (error) {
        console.error('Snapshot Proxy Error:', error);
        return NextResponse.json({ proposals: [] }, { status: 500 });
    }
}
