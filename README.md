# Portfolio Travel

[![CI](https://github.com/OmarZambranoDev/portfolio-travel/actions/workflows/ci.yml/badge.svg)](https://github.com/OmarZambranoDev/portfolio-travel/actions/workflows/ci.yml)

AI-powered travel planning app for the portfolio platform. Built with Next.js 16, React 19, and TypeScript, deployed as a standalone SSR application linked from the Vite micro-frontend host.

## Overview

- Destination discovery with category and region filtering
- SSR destination detail pages with live weather and interactive maps
- AI itinerary generator with streaming responses powered by Claude Haiku
- Save and manage trip itineraries with Zustand and localStorage persistence
- Earth-tone theme with shared `@OmarZambranoDev/portfolio-ui` components
- Responsive design with desktop top navbar and mobile bottom navigation
- Server components, dynamic routes, ISR, and metadata API via Next.js App Router
- Unit tests with Vitest, E2E tests with Playwright, Lighthouse CI

## Tech Stack

| Category   | Technology                            |
| ---------- | ------------------------------------- |
| Framework  | Next.js 16 (App Router)               |
| Language   | TypeScript 5                          |
| Styling    | Tailwind CSS 4                        |
| State      | Zustand 5                             |
| AI         | Vercel AI SDK v6 + Claude Haiku 4.5   |
| Maps       | React Leaflet + OpenStreetMap         |
| Icons      | Lucide React                          |
| Shared UI  | `@OmarZambranoDev/portfolio-ui`       |
| Testing    | Vitest + Testing Library + Playwright |
| CI         | GitHub Actions + Lighthouse CI        |

## APIs

| Service         | Usage                              | Cost     |
| --------------- | ---------------------------------- | -------- |
| OpenWeatherMap  | Live weather on destination pages  | Free     |
| Unsplash        | Destination hero and card images   | Free     |
| Anthropic       | AI itinerary streaming generation  | ~$1–3/mo |
| OpenStreetMap   | Interactive maps via React Leaflet | Free     |

## Getting Started

### Prerequisites

- Node.js 18+
- GitHub Packages access for `@OmarZambranoDev/portfolio-ui`

### Install

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```bash
ANTHROPIC_API_KEY=your_key_here
OPENWEATHER_API_KEY=your_key_here
UNSPLASH_ACCESS_KEY=your_key_here
NEXT_PUBLIC_HOST_URL=http://localhost:3000
NEXT_PUBLIC_GITHUB_URL=https://github.com/OmarZambranoDev/portfolio-travel
```

### Development

```bash
npm run dev
```

Runs on **http://localhost:3005**.

### Build

```bash
npm run build
```

Outputs to `.next/` as a production Next.js build.

### Start

```bash
npm run start
```

Starts the production server on **http://localhost:3005**.

### Lint

```bash
npm run lint
```

### Format

```bash
npm run format
```

### Test

Unit tests:

```bash
npm test
```

E2E tests:

```bash
npx playwright test
```

### Lighthouse

```bash
npm run lhci
```

### Fetch Destination Images

One-time script to fetch and cache Unsplash image URLs per destination:

```bash
npm run fetch-images
```

To refresh specific destinations by slug:

```bash
npm run fetch-images -- tokyo paris
```

## Pages

| Route                    | Type          | Description                                      |
| ------------------------ | ------------- | ------------------------------------------------ |
| `/`                      | SSR           | Home page with hero, features, and featured destinations |
| `/destinations`          | SSR           | Filterable destination grid                      |
| `/destinations/[slug]`   | SSR + ISR     | Destination detail with weather, map, highlights |
| `/plan`                  | Client        | AI itinerary generator with streaming            |
| `/trips`                 | Client        | Saved trips with Zustand persistence             |
| `/profile`               | SSR           | Portfolio and GitHub links (mobile)              |

## API Routes

| Route                      | Method | Description                          |
| -------------------------- | ------ | ------------------------------------ |
| `/api/plan`                | POST   | Streams AI itinerary via Claude Haiku |
| `/api/weather/[city]`      | GET    | Live weather, cached 30 min          |

## Project Structure
src/

├── app/

│   ├── layout.tsx

│   ├── page.tsx

│   ├── api/

│   │   ├── plan/route.ts

│   │   └── weather/[city]/route.ts

│   ├── destinations/

│   │   ├── page.tsx

│   │   └── [slug]/

│   │       ├── page.tsx

│   │       ├── loading.tsx

│   │       └── error.tsx

│   ├── plan/page.tsx

│   ├── trips/

│   │   ├── page.tsx

│   │   └── [id]/page.tsx

│   └── profile/page.tsx

├── components/

│   ├── common/

│   ├── destinations/

│   ├── mobile/

│   ├── planner/

│   └── trips/

├── data/

│   ├── destinations.ts

│   ├── destinationImages.json

│   └── mockWeather.ts

├── hooks/

│   └── useIsMobile.ts

├── lib/

├── store/

│   └── tripsStore.ts

├── test/

│   └── unit/

└── types/

## Scripts

| Script          | Description                                   |
| --------------- | --------------------------------------------- |
| `dev`           | Start dev server on port 3005                 |
| `build`         | Next.js production build                      |
| `start`         | Start production server on port 3005          |
| `lint`          | Run ESLint                                    |
| `format`        | Run Prettier on source files                  |
| `format:check`  | Check Prettier formatting                     |
| `test`          | Run Vitest unit tests                         |
| `test:watch`    | Run Vitest in watch mode                      |
| `test:e2e`      | Run Playwright E2E tests                      |
| `lhci`          | Build and run Lighthouse CI audit             |
| `fetch-images`  | Fetch and cache Unsplash destination images   |

## Deployment

Deployed to Vercel via GitHub integration. Environment variables are configured in the Vercel project dashboard.

## License

MIT
