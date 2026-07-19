<div align="center">
  <img src="public/icon.png" alt="Resnime logo" width="96" />
  <h1>Resnime</h1>
  <p>A responsive anime discovery and streaming frontend built with React.</p>
  <p>
    <a href="https://www.resnime.my.id">Live Website</a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19" />
    <img src="https://img.shields.io/badge/Vite-8-20232A?style=flat-square&logo=vite&logoColor=646CFF" alt="Vite 8" />
    <img src="https://img.shields.io/badge/Chakra%20UI-3-20232A?style=flat-square&logo=chakraui&logoColor=41C89F" alt="Chakra UI 3" />
  </p>
</div>

## Overview

Resnime is a frontend-only anime discovery and streaming web application. It
allows users to browse recently updated anime, search for titles, view anime
details, explore available episodes, and open external streaming players
provided through AniPub.

Resnime does not host anime video files. Anime metadata, poster assets, episode
lists, and playable player URLs depend on AniPub and the external providers
behind those player URLs.

## Live Demo

[https://www.resnime.my.id](https://www.resnime.my.id)

## Features

- Featured anime section on the homepage.
- Recently updated anime list with simple pagination.
- Global anime search with debounced API fetching.
- Search result cards with poster, title, synopsis preview, type, score, genre,
  status, and pagination when available.
- Anime detail pages with poster, cover background, synopsis, genre, score,
  release date, status, studio, season, type, and episode count when provided.
- Episode list with ascending or latest-first sorting.
- Episode player modal using external player URLs returned by AniPub.
- URL-aware episode modal state through the `episode` query parameter.
- Loading, empty, unavailable, retry, and error states for common data-fetching
  paths.
- Responsive dark interface built with Chakra UI.
- Vercel rewrite configuration for direct navigation in the single-page app.

## Tech Stack

| Area              | Technology                             |
| ----------------- | -------------------------------------- |
| Frontend          | React 19, React DOM                    |
| Language          | JavaScript, JSX                        |
| Build tool        | Vite 8 with `@vitejs/plugin-react-swc` |
| UI                | Chakra UI 3, lucide-react, next-themes |
| Routing           | React Router 7                         |
| Data fetching     | Axios                                  |
| Anime provider    | AniPub                                 |
| Package manager   | npm                                    |
| Deployment config | Vercel rewrites                        |

## Architecture

```text
User action
-> React routes and components
-> service layer requests to AniPub
-> adapter layer normalizes AniPub responses
-> UI renders anime lists, detail pages, or external player iframes
```

Resnime is the client application. AniPub supplies anime information and player
URLs. The external player controls video availability, playback behavior,
advertisements, redirects, and region-specific access.

## Getting Started

### Prerequisites

- Node.js 24 or newer
- npm

The repository includes `.nvmrc` with the target Node.js version.

### Installation

```bash
git clone https://github.com/Restu-Averian/Resnime_V2.git
cd Resnime_V2
npm install
cp .env.example .env
npm run start
```

Vite usually serves the app at `http://localhost:5173`.

### Environment

`.env.example` contains the AniPub base URL used by the frontend:

```env
VITE_ANIPUB_API_BASE_URL=https://anipub.xyz
```

The application also falls back to `https://anipub.xyz` when this variable is
not set.

## Available Scripts

| Command                | Description                                                      |
| ---------------------- | ---------------------------------------------------------------- |
| `npm run start`        | Start the Vite development server.                               |
| `npm run build`        | Build the production bundle.                                     |
| `npm run lint`         | Run ESLint with unused-disable checks and zero warnings allowed. |
| `npm run preview`      | Preview the production build locally.                            |
| `npm run format`       | Format repository files with Prettier.                           |
| `npm run format:check` | Check repository formatting with Prettier.                       |

## Environment Variables

| Variable                   | Required        | Description                                                             |
| -------------------------- | --------------- | ----------------------------------------------------------------------- |
| `VITE_ANIPUB_API_BASE_URL` | No, recommended | AniPub base URL used by the frontend. Defaults to `https://anipub.xyz`. |

No server-side secrets are required by the current frontend implementation.

## Project Structure

```text
public/
└── icon.png

src/
├── adapters/      # Normalizes AniPub responses for the UI
├── assets/        # Placeholder and error images
├── components/    # Global, home, and anime-detail UI components
├── constants/     # Shared runtime constants
├── helpers/       # Small formatting utilities
├── hooks/         # Data fetching, document title, and responsive hooks
├── pages/         # Route-level pages
├── services/      # AniPub API and stream URL helpers
└── style/         # Global CSS
```

## Routes

| Route                    | Purpose                                                                 |
| ------------------------ | ----------------------------------------------------------------------- |
| `/`                      | Homepage with featured and recently updated anime.                      |
| `/search?q=title&page=1` | Search results with pagination.                                         |
| `/anime/:id/:anime_name` | Anime detail page with episode, overview, characters, and reviews tabs. |
| `*`                      | Not found page.                                                         |

## External Content and Provider Disclaimer

Resnime is an independent frontend project created for educational and portfolio
purposes. Anime information, artwork paths, episode metadata, and external
player URLs are supplied by AniPub and its upstream sources.

Resnime does not host, store, own, or distribute anime video files. Streaming
availability, advertisements, redirects, region restrictions, and player errors
are controlled by external providers. Anime titles, artwork, and related media
belong to their respective owners.

## Known Limitations

- Streaming availability depends on AniPub and external player URLs.
- Some anime may not have playable episodes.
- External players may include advertisements, redirects, unavailable media, or
  provider-side errors.
- Provider response formats or service availability may change.
- Download support is not implemented in the current app UI.
- Sidebar items such as New Episodes, Genres, Bookmarks, and History currently
  route to search-oriented views rather than dedicated persisted features.
- Characters, recommendations, relations, and reviews may be empty when the
  normalized provider response does not include usable data.

## Development Status

Resnime is a maintained personal project and modernization effort for an older
anime web app. The current focus is keeping the frontend accurate, stable, and
clear about its dependency on the external AniPub provider.

## Author

Restu Averian

- GitHub: [Restu-Averian](https://github.com/Restu-Averian)
