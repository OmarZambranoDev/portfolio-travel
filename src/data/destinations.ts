export type Region = 'europe' | 'asia' | 'americas' | 'africa' | 'oceania';

export type Category = 'beach' | 'city' | 'nature' | 'culture' | 'adventure';

export interface Destination {
  slug: string;
  name: string;
  country: string;
  region: Region;
  categories: Category[];
  tagline: string;
  description: string;
  weatherCity: string; // city name sent to OpenWeatherMap
  coordinates: { lat: number; lng: number };
  bestMonths: string;
  avgDailyCostUSD: number;
  currency: string;
  language: string;
  timezone: string;
  unsplashQuery: string; // search term sent to Unsplash
  highlights: string[]; // shown as attraction chips
  featured: boolean;
}

const destinations: Destination[] = [
  {
    slug: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    region: 'asia',
    categories: ['city', 'culture'],
    tagline: 'Where ancient tradition meets neon-lit modernity',
    description:
      'Tokyo is a city of contrasts — centuries-old temples sit beside towering skyscrapers, and quiet backstreets hide Michelin-starred restaurants. It is one of the most dynamic and livable cities on earth.',
    weatherCity: 'Tokyo',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    bestMonths: 'Mar–May, Sep–Nov',
    avgDailyCostUSD: 120,
    currency: 'JPY',
    language: 'Japanese',
    timezone: 'JST (UTC+9)',
    unsplashQuery: 'Tokyo Japan city',
    highlights: ['Shibuya Crossing', 'Senso-ji Temple', 'Shinjuku', 'Tsukiji Market', 'Harajuku'],
    featured: true,
  },
  {
    slug: 'paris',
    name: 'Paris',
    country: 'France',
    region: 'europe',
    categories: ['city', 'culture'],
    tagline: 'The city of light, love, and legendary cuisine',
    description:
      'Paris needs little introduction. From the Eiffel Tower to the Louvre, world-class art and architecture line every boulevard. The café culture, fashion, and food make it endlessly worth returning to.',
    weatherCity: 'Paris',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    bestMonths: 'Apr–Jun, Sep–Oct',
    avgDailyCostUSD: 150,
    currency: 'EUR',
    language: 'French',
    timezone: 'CET (UTC+1)',
    unsplashQuery: 'Paris France Eiffel Tower',
    highlights: ['Eiffel Tower', 'The Louvre', 'Montmartre', 'Notre-Dame', 'Versailles'],
    featured: true,
  },
  {
    slug: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    region: 'asia',
    categories: ['beach', 'culture', 'nature'],
    tagline: 'Sacred temples, lush rice terraces, and warm surf',
    description:
      'Bali blends spiritual culture with natural beauty unlike anywhere else. Ancient Hindu temples emerge from jungle cliffs, terraced rice paddies glow emerald green, and the surf breaks are world-renowned.',
    weatherCity: 'Denpasar',
    coordinates: { lat: -8.3405, lng: 115.0920 },
    bestMonths: 'Apr–Oct',
    avgDailyCostUSD: 65,
    currency: 'IDR',
    language: 'Balinese, Indonesian',
    timezone: 'WITA (UTC+8)',
    unsplashQuery: 'Bali Indonesia temple rice terrace',
    highlights: ['Ubud', 'Tanah Lot', 'Seminyak Beach', 'Mount Batur', 'Tegallalang'],
    featured: true,
  },
  {
    slug: 'new-york',
    name: 'New York City',
    country: 'United States',
    region: 'americas',
    categories: ['city', 'culture'],
    tagline: 'The city that never sleeps and never stops surprising',
    description:
      'New York City is the cultural capital of the world. Five boroughs, hundreds of neighborhoods, world-class museums, Broadway, and a food scene that spans every cuisine on earth.',
    weatherCity: 'New York',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    bestMonths: 'Apr–Jun, Sep–Nov',
    avgDailyCostUSD: 180,
    currency: 'USD',
    language: 'English',
    timezone: 'EST (UTC-5)',
    unsplashQuery: 'New York City skyline Manhattan',
    highlights: ['Central Park', 'Times Square', 'Brooklyn Bridge', 'The Met', 'High Line'],
    featured: true,
  },
  {
    slug: 'cape-town',
    name: 'Cape Town',
    country: 'South Africa',
    region: 'africa',
    categories: ['nature', 'beach', 'adventure'],
    tagline: 'Mountains, ocean, vineyards, and wild coastline',
    description:
      'Framed by Table Mountain and the Atlantic Ocean, Cape Town is one of the most dramatically beautiful cities on earth. Wine country, penguin beaches, and stunning hikes are all within an hour of the city center.',
    weatherCity: 'Cape Town',
    coordinates: { lat: -33.9249, lng: 18.4241 },
    bestMonths: 'Nov–Mar',
    avgDailyCostUSD: 85,
    currency: 'ZAR',
    language: 'English, Afrikaans, Xhosa',
    timezone: 'SAST (UTC+2)',
    unsplashQuery: 'Cape Town South Africa Table Mountain',
    highlights: ['Table Mountain', 'Boulders Beach', 'Cape Point', 'V&A Waterfront', 'Stellenbosch'],
    featured: false,
  },
  {
    slug: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    region: 'asia',
    categories: ['culture', 'nature'],
    tagline: 'Japan\'s ancient capital and spiritual heartland',
    description:
      'Kyoto preserves the soul of old Japan. Over a thousand temples and shrines, geisha districts, bamboo groves, and some of the finest traditional cuisine in the world.',
    weatherCity: 'Kyoto',
    coordinates: { lat: 35.0116, lng: 135.7681 },
    bestMonths: 'Mar–May, Oct–Nov',
    avgDailyCostUSD: 110,
    currency: 'JPY',
    language: 'Japanese',
    timezone: 'JST (UTC+9)',
    unsplashQuery: 'Kyoto Japan temple geisha',
    highlights: ['Fushimi Inari', 'Arashiyama Bamboo', 'Kinkaku-ji', 'Gion District', 'Nishiki Market'],
    featured: false,
  },
  {
    slug: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    region: 'europe',
    categories: ['city', 'beach', 'culture'],
    tagline: 'Gaudí, tapas, beaches, and endless summer energy',
    description:
      'Barcelona is a city built for living well. Modernist architecture by Gaudí, a Mediterranean coastline, world-famous food markets, and a nightlife that starts after midnight.',
    weatherCity: 'Barcelona',
    coordinates: { lat: 41.3851, lng: 2.1734 },
    bestMonths: 'May–Jun, Sep–Oct',
    avgDailyCostUSD: 130,
    currency: 'EUR',
    language: 'Spanish, Catalan',
    timezone: 'CET (UTC+1)',
    unsplashQuery: 'Barcelona Spain Sagrada Familia',
    highlights: ['Sagrada Família', 'Park Güell', 'La Boqueria', 'Gothic Quarter', 'Barceloneta Beach'],
    featured: true,
  },
  {
    slug: 'machu-picchu',
    name: 'Machu Picchu',
    country: 'Peru',
    region: 'americas',
    categories: ['adventure', 'culture', 'nature'],
    tagline: 'The lost city of the Inca, hidden in the clouds',
    description:
      'Machu Picchu is one of the most awe-inspiring places on earth. Perched on a ridge above the Sacred Valley, this 15th-century Inca citadel draws hikers, historians, and dreamers from every corner of the world.',
    weatherCity: 'Cusco',
    coordinates: { lat: -13.1631, lng: -72.5450 },
    bestMonths: 'May–Sep',
    avgDailyCostUSD: 75,
    currency: 'PEN',
    language: 'Spanish, Quechua',
    timezone: 'PET (UTC-5)',
    unsplashQuery: 'Machu Picchu Peru Inca ruins',
    highlights: ['Sun Gate', 'Inca Trail', 'Huayna Picchu', 'Sacred Valley', 'Cusco'],
    featured: false,
  },
  {
    slug: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    region: 'europe',
    categories: ['beach', 'culture'],
    tagline: 'Whitewashed cliffs, blue domes, and Aegean sunsets',
    description:
      'Santorini is the Greek island that lives up to every photograph. Volcanic caldera views, iconic blue-domed churches, black sand beaches, and sunsets that stop time.',
    weatherCity: 'Santorini',
    coordinates: { lat: 36.3932, lng: 25.4615 },
    bestMonths: 'May–Oct',
    avgDailyCostUSD: 160,
    currency: 'EUR',
    language: 'Greek',
    timezone: 'EET (UTC+2)',
    unsplashQuery: 'Santorini Greece blue dome white buildings',
    highlights: ['Oia Sunset', 'Fira', 'Red Beach', 'Akrotiri Ruins', 'Caldera Hike'],
    featured: true,
  },
  {
    slug: 'new-zealand-south-island',
    name: 'South Island',
    country: 'New Zealand',
    region: 'oceania',
    categories: ['adventure', 'nature'],
    tagline: 'Fjords, glaciers, and Middle-earth landscapes',
    description:
      'New Zealand\'s South Island is the adventure capital of the world. Milford Sound, the Southern Alps, Franz Josef Glacier, and Queenstown offer some of the most dramatic scenery and outdoor activities on the planet.',
    weatherCity: 'Queenstown',
    coordinates: { lat: -45.0312, lng: 168.6626 },
    bestMonths: 'Dec–Feb, Jun–Aug',
    avgDailyCostUSD: 140,
    currency: 'NZD',
    language: 'English, Māori',
    timezone: 'NZST (UTC+12)',
    unsplashQuery: 'New Zealand South Island Milford Sound fjord',
    highlights: ['Milford Sound', 'Queenstown', 'Franz Josef Glacier', 'Abel Tasman', 'Aoraki'],
    featured: false,
  },
  {
    slug: 'marrakech',
    name: 'Marrakech',
    country: 'Morocco',
    region: 'africa',
    categories: ['culture', 'adventure'],
    tagline: 'Ancient medinas, spice markets, and Saharan magic',
    description:
      'Marrakech is a city that overwhelms the senses in the best way. The winding souks of the medina, Djemaa el-Fna square, hammams, riads, and the gateway to the Sahara all within reach.',
    weatherCity: 'Marrakech',
    coordinates: { lat: 31.6295, lng: -7.9811 },
    bestMonths: 'Mar–May, Sep–Nov',
    avgDailyCostUSD: 60,
    currency: 'MAD',
    language: 'Arabic, Berber, French',
    timezone: 'WET (UTC+0)',
    unsplashQuery: 'Marrakech Morocco medina souk',
    highlights: ['Djemaa el-Fna', 'Majorelle Garden', 'Bahia Palace', 'Souks', 'Atlas Mountains'],
    featured: false,
  },
  {
    slug: 'iceland',
    name: 'Iceland',
    country: 'Iceland',
    region: 'europe',
    categories: ['adventure', 'nature'],
    tagline: 'Northern lights, volcanoes, geysers, and midnight sun',
    description:
      'Iceland is like no other place on earth. Active volcanoes, geothermal hot springs, black sand beaches, towering waterfalls, and the aurora borealis make it a destination for nature lovers and adventurers.',
    weatherCity: 'Reykjavik',
    coordinates: { lat: 64.9631, lng: -19.0208 },
    bestMonths: 'Jun–Aug, Dec–Feb',
    avgDailyCostUSD: 180,
    currency: 'ISK',
    language: 'Icelandic',
    timezone: 'GMT (UTC+0)',
    unsplashQuery: 'Iceland northern lights aurora landscape',
    highlights: ['Northern Lights', 'Blue Lagoon', 'Golden Circle', 'Jökulsárlón', 'Skógafoss'],
    featured: false,
  },
  {
    slug: 'bangkok',
    name: 'Bangkok',
    country: 'Thailand',
    region: 'asia',
    categories: ['city', 'culture'],
    tagline: 'Street food, temples, and a city that never stands still',
    description:
      'Bangkok is chaotic, vibrant, and completely addictive. World-class street food on every corner, ornate temples alongside rooftop bars, and a Chao Phraya river that connects it all.',
    weatherCity: 'Bangkok',
    coordinates: { lat: 13.7563, lng: 100.5018 },
    bestMonths: 'Nov–Feb',
    avgDailyCostUSD: 55,
    currency: 'THB',
    language: 'Thai',
    timezone: 'ICT (UTC+7)',
    unsplashQuery: 'Bangkok Thailand temple river city',
    highlights: ['Grand Palace', 'Wat Pho', 'Chatuchak Market', 'Chao Phraya', 'Khao San Road'],
    featured: false,
  },
  {
    slug: 'amalfi-coast',
    name: 'Amalfi Coast',
    country: 'Italy',
    region: 'europe',
    categories: ['beach', 'culture'],
    tagline: 'Clifftop villages, turquoise water, and limoncello',
    description:
      'The Amalfi Coast is one of Italy\'s most breathtaking stretches of coastline. Pastel-colored villages cling to steep cliffs above impossibly blue water, connected by winding roads and hiking trails.',
    weatherCity: 'Salerno',
    coordinates: { lat: 40.6340, lng: 14.6027 },
    bestMonths: 'May–Jun, Sep–Oct',
    avgDailyCostUSD: 165,
    currency: 'EUR',
    language: 'Italian',
    timezone: 'CET (UTC+1)',
    unsplashQuery: 'Amalfi Coast Italy village cliff sea',
    highlights: ['Positano', 'Ravello', 'Path of the Gods', 'Capri', 'Atrani'],
    featured: false,
  },
  {
    slug: 'patagonia',
    name: 'Patagonia',
    country: 'Argentina / Chile',
    region: 'americas',
    categories: ['adventure', 'nature'],
    tagline: 'The end of the world, where glaciers meet the sky',
    description:
      'Patagonia is raw, wild, and humbling. The Torres del Paine massif, Perito Moreno Glacier, and the windswept steppe at the tip of South America attract trekkers and explorers seeking something truly untamed.',
    weatherCity: 'Punta Arenas',
    coordinates: { lat: -51.7203, lng: -72.5169 },
    bestMonths: 'Nov–Mar',
    avgDailyCostUSD: 95,
    currency: 'ARS / CLP',
    language: 'Spanish',
    timezone: 'ART (UTC-3)',
    unsplashQuery: 'Patagonia Torres del Paine glacier mountains',
    highlights: ['Torres del Paine', 'Perito Moreno', 'Fitz Roy', 'Beagle Channel', 'El Chaltén'],
    featured: false,
  },
];

export default destinations;

export const featuredDestinations = destinations.filter((d) => d.featured);

export const getDestinationBySlug = (slug: string): Destination | undefined =>
  destinations.find((d) => d.slug === slug);

export const getDestinationsByRegion = (region: Region): Destination[] =>
  destinations.filter((d) => d.region === region);

export const getDestinationsByCategory = (category: Category): Destination[] =>
  destinations.filter((d) => d.categories.includes(category));
