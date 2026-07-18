# API Used

## 1. Anime Metadata

Resnime uses Jikan REST API v4 for anime metadata.

- Search: `/anime?q={query}&page={page}&limit={limit}&sfw=true`
- Trending: `/seasons/now?page={page}&limit={limit}&sfw=true`
- Popular: `/top/anime?filter=bypopularity&page={page}&limit={limit}`
- Upcoming: `/seasons/upcoming?page={page}&limit={limit}&sfw=true`
- Detail: `/anime/{malId}/full`
- Episodes: `/anime/{malId}/episodes?page=1`

Required environment variables are listed in `.env.example`.

## 2. Streaming

Episode playback uses the 4Animo iframe provider:

`/embed/{server}/mal/{malId}/{episodeNumber}/{audioType}?k=1`

Direct download URLs are unavailable with the iframe provider.
