import axios from "axios";
import { ANIMO_API_BASE_URL } from "../constants/index.js";

const client = axios.create({
  baseURL: ANIMO_API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
  },
});

const episodeCache = new Map();

const toPositiveInteger = (value, label) => {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 1) {
    throw new Error(`Invalid ${label}.`);
  }
  return number;
};

const normalizeAnimoError = (error) => {
  if (
    error?.cancelled ||
    axios.isCancel(error) ||
    error?.code === "ERR_CANCELED"
  ) {
    return {
      cancelled: true,
      message: "Request cancelled.",
    };
  }

  if (error?.code === "ECONNABORTED") {
    return {
      message: "Unable to check streaming availability.",
    };
  }

  const status = error?.response?.status;
  if (status === 404) {
    return {
      status,
      message: "Streaming is currently unavailable for this anime.",
    };
  }

  if (status === 429 || status >= 500) {
    return {
      status,
      message: "Unable to check streaming availability.",
    };
  }

  if (status) {
    return {
      status,
      message: "Unable to check streaming availability.",
    };
  }

  return {
    message:
      typeof navigator !== "undefined" && !navigator.onLine
        ? "You appear to be offline."
        : "Unable to check streaming availability.",
  };
};

const request = async (url, config = {}) => {
  try {
    const response = await client.get(url, config);
    if (!response?.data || typeof response.data !== "object") {
      throw { message: "Unable to check streaming availability." };
    }
    return response.data;
  } catch (error) {
    throw normalizeAnimoError(error);
  }
};

export const mapAnimoEpisode = (episode) => {
  const embedId = toPositiveInteger(episode?.embed_id, "embed ID");
  const number = toPositiveInteger(episode?.number, "episode number");
  const title = episode?.titles?.en || `Episode ${number}`;

  return {
    id: String(embedId),
    embedId,
    number,
    title,
    filler: Boolean(episode?.filler),
    malId: episode?.mal || null,
    anilistId: episode?.ani || null,
    sub: Boolean(episode?.sub),
    dub: Boolean(episode?.dub),
    image: episode?.image || episode?.thumbnail || "",
  };
};

const mapAnimoEpisodes = (episodes) => {
  const usedNumbers = new Set();
  const usedEmbedIds = new Set();

  return episodes
    .map((episode) => {
      try {
        return mapAnimoEpisode(episode);
      } catch {
        return null;
      }
    })
    .filter((episode) => {
      if (!episode) return false;
      if (
        usedNumbers.has(episode.number) ||
        usedEmbedIds.has(episode.embedId)
      ) {
        return false;
      }

      usedNumbers.add(episode.number);
      usedEmbedIds.add(episode.embedId);
      return true;
    })
    .sort((a, b) => a.number - b.number);
};

export const getAnimoAnimeByMalId = async (malId, keyword, signal) => {
  const validMalId = toPositiveInteger(malId, "MAL anime ID");
  const q = keyword?.trim();

  if (!q) {
    return null;
  }

  const response = await request("/anime/search", {
    signal,
    params: {
      keyword: q,
    },
  });

  const matches = Array.isArray(response?.data) ? response.data : [];
  return matches.find((anime) => Number(anime?.mal_id) === validMalId) || null;
};

export const getAnimoEpisodes = async (malId, keyword, signal) => {
  const validMalId = toPositiveInteger(malId, "MAL anime ID");
  const cacheKey = `${validMalId}:${keyword || ""}`;

  if (episodeCache.has(cacheKey)) {
    return episodeCache.get(cacheKey);
  }

  const anime = await getAnimoAnimeByMalId(validMalId, keyword, signal);
  if (!anime?.id) {
    const empty = { status: "unavailable", episodes: [] };
    episodeCache.set(cacheKey, empty);
    return empty;
  }

  const response = await request(`/anime/${anime.id}/episodes`, { signal });
  const rawEpisodes = Array.isArray(response?.data) ? response.data : [];
  const episodes = mapAnimoEpisodes(rawEpisodes);
  const result = {
    status: episodes.length ? "available" : "unavailable",
    episodes,
  };

  episodeCache.set(cacheKey, result);
  return result;
};
