import axios from "axios";
import { JIKAN_API_BASE_URL } from "../constants/index.js";

const limit = 24;
const minRequestGapMs = 350;
let nextRequestAt = 0;

const client = axios.create({
  baseURL: JIKAN_API_BASE_URL,
  timeout: 15000,
});

const wait = (ms, signal) =>
  new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject({ cancelled: true, message: "Request cancelled." });
      return;
    }

    const timeoutId = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timeoutId);
        reject({ cancelled: true, message: "Request cancelled." });
      },
      { once: true },
    );
  });

const normalizeJikanError = (error) => {
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
      message: "Unable to load anime data.",
    };
  }

  const status = error?.response?.status;
  const retryAfter = error?.response?.headers?.["retry-after"];

  if (status === 404) {
    return {
      status,
      message: "Anime not found.",
    };
  }

  if (status === 429) {
    return {
      status,
      retryAfter,
      message: "Too many requests. Please try again shortly.",
    };
  }

  if (status >= 500) {
    return {
      status,
      message: "Unable to load anime data.",
    };
  }

  if (status) {
    return {
      status,
      message: "Unable to load anime data.",
    };
  }

  return {
    message: navigator.onLine
      ? "Unable to load anime data."
      : "You appear to be offline.",
  };
};

const request = async (url, config = {}) => {
  const now = Date.now();
  const waitMs = Math.max(0, nextRequestAt - now);
  nextRequestAt = Math.max(now, nextRequestAt) + minRequestGapMs;

  try {
    if (waitMs) {
      await wait(waitMs, config.signal);
    }

    const response = await client.get(url, config);
    return response.data;
  } catch (error) {
    throw normalizeJikanError(error);
  }
};

export const searchAnime = (query, page, signal) =>
  request("/anime", {
    signal,
    params: {
      q: query,
      page,
      limit,
      sfw: true,
    },
  });

export const getCurrentSeasonAnime = (page, signal) =>
  request("/seasons/now", {
    signal,
    params: {
      page,
      limit,
      sfw: true,
    },
  });

export const getPopularAnime = (page, signal) =>
  request("/top/anime", {
    signal,
    params: {
      filter: "bypopularity",
      page,
      limit,
    },
  });

export const getUpcomingAnime = (page, signal) =>
  request("/seasons/upcoming", {
    signal,
    params: {
      page,
      limit,
      sfw: true,
    },
  });

export const getAnimeDetail = (malId, signal) =>
  request(`/anime/${malId}/full`, { signal });

export const getAnimeEpisodes = (malId, page = 1, signal) =>
  request(`/anime/${malId}/episodes`, {
    signal,
    params: {
      page,
    },
  });
