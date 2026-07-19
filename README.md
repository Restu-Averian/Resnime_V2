# API Used

Resnime uses AniPub as its only anime API provider.

## Anime

- Search: `/api/searchall/{query}?page={page}`
- Detail: `/anime/api/details/{id}`
- Episodes and player URLs: `/v1/api/details/{id}`

Sections that AniPub does not expose are hidden in the app.

Required environment variables are listed in `.env.example`.

## Streaming

Episode playback uses the player URLs returned by AniPub.

Direct download URLs are unavailable unless AniPub returns one.
