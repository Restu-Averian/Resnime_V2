import axios from "axios";
import {
  fmtAnimeDetailResponse,
  fmtAnimeListResponse,
  fmtAnimeSortResponse,
  fmtAnimeStreamingDetail,
} from "../adapters/animeMapper.js";
import { ANIPUB_API_BASE_URL } from "../constants/index.js";

const client = axios.create({
  baseURL: ANIPUB_API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
  },
});

const getPage = (searchParams) => {
  const page = Number(searchParams.get("page"));
  return Number.isInteger(page) && page > 0 ? page : 1;
};

const toValidAnimeId = (id) => {
  const animeId = Number(id);
  if (!Number.isInteger(animeId) || animeId < 1) {
    throw new Error("Anime not found.");
  }
  return animeId;
};

const normalizeError = (error, fallbackMessage) => {
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

  if (error?.response?.status === 404) {
    return {
      status: 404,
      message: "Anime not found.",
    };
  }

  return {
    status: error?.response?.status,
    message: fallbackMessage,
  };
};

const fetch = async (url, { signal, params, fallbackMessage }) => {
  try {
    const response = await client.get(url, { signal, params });
    if (!response?.data || typeof response.data !== "object") {
      throw { message: fallbackMessage };
    }
    return response.data;
  } catch (error) {
    throw normalizeError(error, fallbackMessage);
  }
};

const fetchAny = async (url, { signal, params, fallbackMessage }) => {
  try {
    const response = await client.get(url, { signal, params });
    return response.data;
  } catch (error) {
    throw normalizeError(error, fallbackMessage);
  }
};

const toPositiveId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

const getAnimeInfo = async (id, signal) => {
  const animeId = toValidAnimeId(id);
  const data = await fetch(`/api/info/${animeId}`, {
    signal,
    fallbackMessage: "Unable to load anime info.",
  });

  return fmtAnimeDetailResponse(data);
};

export const getHomeBannerAnime = async (signal) => {
  const latestId = toPositiveId(
    await fetchAny("/api/getlast", {
      signal,
      fallbackMessage: "Unable to load featured anime.",
    }),
  );

  if (!latestId) throw new Error("Featured anime not found.");
  return getAnimeInfo(latestId, signal);
};

export const getRecentlyUpdatedAnime = async (page = 1, signal, limit = 8) => {
  const total = toPositiveId(
    await fetchAny("/api/getAll", {
      signal,
      fallbackMessage: "Unable to load recently updated anime.",
    }),
  );

  if (!total) {
    return {
      results: [],
      currentPage: page,
      hasNextPage: false,
      lastPage: null,
    };
  }

  const currentPage = Math.max(Number(page) || 1, 1);
  const startId = total - (currentPage - 1) * limit;
  const ids = Array.from(
    { length: limit + 6 },
    (_, index) => startId - index,
  ).filter((id) => id > 0);

  const results = (
    await Promise.allSettled(ids.map((id) => getAnimeInfo(id, signal)))
  )
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value)
    .slice(0, limit);

  return {
    results,
    currentPage,
    hasNextPage: startId - limit > 0,
    lastPage: Math.ceil(total / limit),
  };
};

const searchAnime = async (query, page = 1, signal) => {
  const q = query?.trim();
  if (!q) {
    return {
      results: [],
      currentPage: page,
      hasNextPage: false,
      lastPage: null,
    };
  }

  const data = await fetch(`/api/searchall/${encodeURIComponent(q)}`, {
    signal,
    params: { page },
    fallbackMessage: "Unable to search anime.",
  });

  return fmtAnimeListResponse(data?.found === false ? [] : data, page);
};

export const sortAnime = async (options = {}, signal) => {
  const page = Number(options.page) || 1;
  const data = await fetchAny("/api/sort", {
    signal,
    params: {
      name: options.name || undefined,
      genre: options.genre || undefined,
      ratefrom: options.ratefrom ?? 0,
      rateto: options.rateto ?? 10,
      page,
    },
    fallbackMessage: "Unable to sort anime.",
  });

  return fmtAnimeSortResponse(data, page);
};

const getAnimeDetail = async (id, signal) => {
  const animeId = toValidAnimeId(id);
  const detail = await fetch(`/anime/api/details/${animeId}`, {
    signal,
    fallbackMessage: "Unable to load anime detail.",
  });

  if (!detail?.local?._id) {
    throw new Error("Anime not found.");
  }

  let streaming = {
    status: "unavailable",
    episodes: [],
    error: "",
  };

  try {
    const streamingData = await fetch(`/v1/api/details/${animeId}`, {
      signal,
      fallbackMessage: "Unable to check streaming availability.",
    });
    streaming = fmtAnimeStreamingDetail(streamingData);
  } catch (error) {
    if (error?.cancelled) throw error;
    if (error?.status === 404) {
      return fmtAnimeDetailResponse(detail, streaming);
    }

    streaming = {
      status: "error",
      episodes: [],
      error: error?.message || "Unable to check streaming availability.",
    };
  }

  return fmtAnimeDetailResponse(detail, streaming);
};

export const getAnimeByPath = (path, signal) => {
  const [pathname, query = ""] = path.split("?");
  const searchParams = new URLSearchParams(query);
  const page = getPage(searchParams);

  if (pathname.startsWith("/anime/")) {
    return getAnimeDetail(pathname.replace("/anime/", ""), signal);
  }

  return searchAnime(
    decodeURIComponent(pathname.replace(/^\//, "")),
    page,
    signal,
  );
};
