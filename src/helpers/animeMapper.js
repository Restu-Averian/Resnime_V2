import { normalizePlayerUrl } from "../services/stream.js";
import { ANIPUB_API_BASE_URL } from "../constants/index.js";
import placeholderImage from "../assets/placeholder.png";

const titleFallback = "Untitled Anime";

const getImage = (anime) =>
  toAssetUrl(anime?.ImagePath || anime?.Image || anime?.poster);

const getCover = (anime) =>
  anime?.Cover ? toAssetUrl(anime.Cover) : getImage(anime);

const toAssetUrl = (path) => {
  if (!path) return placeholderImage;
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path.replace(/^\/+/, ""), `${ANIPUB_API_BASE_URL}/`).href;
};

const toScore = (value) => {
  const score = Number(value);
  return Number.isFinite(score) ? score : null;
};

const getAnimePayload = (rawAnime) => rawAnime?.local || rawAnime || {};

const getId = (anime) => anime?._id || anime?.Id;

const getTitle = (anime) => anime?.Name || anime?.name || anime?.title;

const getGenres = (anime) =>
  Array.isArray(anime?.Genres) ? anime.Genres.filter(Boolean) : [];

const getStudios = (anime) =>
  typeof anime?.Studios === "string" && anime.Studios.trim()
    ? anime.Studios.split(",")
        .map((studio) => studio.trim())
        .filter(Boolean)
    : [];

const normalizeAnime = (anime) => {
  const title = getTitle(anime) || titleFallback;
  const image = getImage(anime);
  const score = toScore(anime?.MALScore);

  return {
    id: getId(anime),
    malId: anime?.MALID || anime?.MALId || null,
    title: {
      romaji: title,
      english: title,
      native: anime?.Synonyms || null,
    },
    image,
    cover: getCover(anime),
    description: anime?.DescripTion || "",
    genres: getGenres(anime),
    type: anime?.whatType || "",
    status: anime?.Status || "",
    totalEpisodes: anime?.epCount || "",
    averageScore: score,
    score,
    ratingsCount: Number(anime?.RatingsNum) || 0,
    releaseDate: anime?.Aired || "",
    season: anime?.Premiered || "",
    studios: getStudios(anime),
    trailer: null,
    relations: anime?.relations || [],
    recommendations: [],
    characters: [],
  };
};

export const fmtEpisodeResponse = (entry, fallbackNumber, fallbackImage) => {
  const playerUrl = normalizePlayerUrl(entry?.link);
  if (!playerUrl) return null;

  return {
    id: String(entry?.id || entry?._id || playerUrl),
    number: fallbackNumber,
    title: entry?.name || entry?.title || `Episode ${fallbackNumber}`,
    image: entry?.poster || fallbackImage || placeholderImage,
    playerUrl,
  };
};

export const fmtAnimeListResponse = (rawResponse, fallbackPage = 1) => ({
  results:
    (Array.isArray(rawResponse) ? rawResponse : rawResponse?.AniData)
      ?.map((anime) => normalizeAnime(anime))
      .filter((anime) => anime?.id) || [],
  currentPage: rawResponse?.currentPage || Number(fallbackPage) || 1,
  hasNextPage: Boolean(rawResponse?.AniData?.length >= 20),
  lastPage: null,
});

export const fmtAnimeGenreResponse = (rawResponse, fallbackPage = 1) => {
  const rawResults = Array.isArray(rawResponse?.wholePage)
    ? rawResponse.wholePage
    : [];

  return {
    results: rawResults
      .filter((anime) => anime?._id && anime?.Name && anime?.ImagePath)
      .map((anime) => normalizeAnime(anime)),
    currentPage: rawResponse?.currentPage || Number(fallbackPage) || 1,
    hasNextPage: rawResults.length >= 20,
    lastPage: null,
  };
};

export const fmtAnimeSortResponse = (rawResponse, fallbackPage = 1) => ({
  results: (Array.isArray(rawResponse?.[1]) ? rawResponse[1] : [])
    .map((anime) => normalizeAnime(anime))
    .filter((anime) => anime?.id),
  currentPage: Number(fallbackPage) || 1,
  hasNextPage: Number(rawResponse?.[0]) > Number(fallbackPage),
  lastPage: Number(rawResponse?.[0]) || null,
});

export const fmtAnimeStreamingDetail = (rawStreaming) => {
  const local = rawStreaming?.local || {};
  const entries = [
    local?.link ? { ...local, name: local?.name || "Episode 1" } : null,
    ...(Array.isArray(local?.ep) ? local.ep : []),
  ].filter(Boolean);
  const usedUrls = new Set();
  const episodes = [];

  entries.forEach((entry) => {
    const episode = fmtEpisodeResponse(
      entry,
      episodes.length + 1,
      local?.poster,
    );
    if (!episode || usedUrls.has(episode.playerUrl)) return;

    usedUrls.add(episode.playerUrl);
    episodes.push(episode);
  });

  return {
    status: episodes.length ? "available" : "unavailable",
    episodes,
  };
};

export const fmtJikanCharacter = (item) => {
  const char = item?.character;
  const role = item?.role ? String(item.role).toUpperCase() : "SUPPORTING";

  const voiceActors = Array.isArray(item?.voice_actors)
    ? item.voice_actors.map((va) => ({
        id: va?.person?.mal_id,
        name: {
          full: va?.person?.name || "",
        },
        image:
          va?.person?.images?.jpg?.image_url ||
          va?.person?.images?.webp?.image_url ||
          placeholderImage,
        language: va?.language || "",
      }))
    : [];

  return {
    id: char?.mal_id,
    name: {
      full: char?.name || "",
    },
    image:
      char?.images?.jpg?.image_url ||
      char?.images?.webp?.image_url ||
      placeholderImage,
    role,
    voiceActors,
  };
};

export const fmtAnimeCharactersResponse = (rawList) => {
  if (!Array.isArray(rawList)) return [];
  return rawList.map(fmtJikanCharacter).filter((char) => char?.id);
};

export const fmtAnimeDetailResponse = (
  rawAnime,
  streaming = {},
  characters = [],
) => {
  const local = getAnimePayload(rawAnime);
  const anime = normalizeAnime(local);
  const episodeFallbackImage =
    anime.image !== placeholderImage ? anime.image : anime.cover;
  const episodes = Array.isArray(streaming?.episodes)
    ? streaming.episodes.map((episode) => ({
        ...episode,
        image:
          episode?.image && episode.image !== placeholderImage
            ? episode.image
            : episodeFallbackImage,
      }))
    : [];

  return {
    ...anime,
    episodes,
    streamingStatus: streaming?.status || "unavailable",
    streamingError: streaming?.error || "",
    relations: [],
    recommendations: [],
    characters: Array.isArray(characters) ? characters : [],
  };
};
