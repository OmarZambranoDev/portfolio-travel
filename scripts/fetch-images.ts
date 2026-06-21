import { config } from 'dotenv';
config({ path: '.env.local' });

import destinations from '../src/data/destinations';
import { writeFileSync, readFileSync } from 'fs';

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

if (!ACCESS_KEY) {
  console.error('UNSPLASH_ACCESS_KEY not set in .env.local');
  process.exit(1);
}

async function fetchImage(query: string): Promise<string | null> {
  const res = await fetch(
    `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${ACCESS_KEY}`
  );
  if (!res.ok) {
    console.error(`Failed for "${query}": ${res.status}`);
    return null;
  }
  const data = await res.json();
  return data.urls?.regular ?? null;
}

async function main() {
  const targetSlugs = process.argv.slice(2);
  const destinationsToFetch = targetSlugs.length
    ? destinations.filter((d) => targetSlugs.includes(d.slug))
    : destinations;

  if (targetSlugs.length && destinationsToFetch.length === 0) {
    console.error(`No matching slugs found for: ${targetSlugs.join(', ')}`);
    process.exit(1);
  }

  const existing: Record<string, string> = JSON.parse(
    readFileSync('src/data/destinationImages.json', 'utf-8')
  );

  for (const d of destinationsToFetch) {
    console.log(`Fetching image for ${d.name}...`);
    const url = await fetchImage(d.unsplashQuery);
    if (url) existing[d.slug] = url;
    await new Promise((r) => setTimeout(r, 1100));
  }

  writeFileSync(
    'src/data/destinationImages.json',
    JSON.stringify(existing, null, 2)
  );
  console.log('Done. Saved to src/data/destinationImages.json');
}

main();
