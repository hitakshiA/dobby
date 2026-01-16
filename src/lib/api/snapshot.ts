
// Snapshot API - Governance (GraphQL)
const BASE_URL = 'https://hub.snapshot.org/graphql';

const QUERY = `
query {
  proposals(
    first: 3,
    skip: 0,
    where: {
      state: "active"
    },
    orderBy: "created",
    orderDirection: desc
  ) {
    id
    title
    body
    choices
  }
}
`;

export async function getProposals() {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: QUERY })
    });
    if (!response.ok) throw new Error(`Snapshot API error: ${response.status}`);
    const data = await response.json();
    return data.data.proposals;
}

export async function testSnapshotAPI() {
    try {
        const proposals = await getProposals();
        return {
            success: true,
            data: proposals.map((p: any) => p.title)
        };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
