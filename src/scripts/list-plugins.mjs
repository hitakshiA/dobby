
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const API_KEY = process.env.NEXT_PUBLIC_ONDEMAND_API_KEY;
const LIST_URL = 'https://api.on-demand.io/plugin/v1/list';

async function listPlugins() {
    console.log('--- Listing Agents/Plugins ---');
    try {
        const res = await fetch(`${LIST_URL}?limit=20&page=1`, {
            method: 'GET',
            headers: { 'apikey': API_KEY }
        });

        if (!res.ok) {
            console.log('Error:', await res.text());
            return;
        }

        const json = await res.json();
        console.log(`Found ${json.data?.length || 0} plugins.`);

        if (json.data) {
            json.data.forEach(p => {
                console.log(`[${p.id}] ${p.name} (${p.status || 'active'}) - ${p.description || ''}`);
            });
        }
    } catch (e) {
        console.error(e);
    }
}

listPlugins();
