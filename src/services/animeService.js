import axios from "axios";
import {
  adaptAnimeDetail,
  adaptAnimeListResponse,
  adaptStreamingDetail,
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

const request = async (url, { signal, params, fallbackMessage }) => {
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

export const searchAnime = async (query, page = 1, signal) => {
  const q = query?.trim();
  if (!q) {
    return {
      results: [],
      currentPage: page,
      hasNextPage: false,
      lastPage: null,
    };
  }

  const data = await request(`/api/searchall/${encodeURIComponent(q)}`, {
    signal,
    params: { page },
    fallbackMessage: "Unable to search anime.",
  });

  return adaptAnimeListResponse(data?.found === false ? [] : data, page);
};

export const getAnimeStreaming = async (id, signal) => {
  const animeId = toValidAnimeId(id);
  const data = await request(`/v1/api/details/${animeId}`, {
    signal,
    fallbackMessage: "Unable to check streaming availability.",
  });

  return adaptStreamingDetail(data);
};

export const getAnimeDetail = async (id, signal) => {
  const animeId = toValidAnimeId(id);
  const detail = await request(`/anime/api/details/${animeId}`, {
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
    streaming = await getAnimeStreaming(animeId, signal);
  } catch (error) {
    if (error?.cancelled) throw error;
    if (error?.status === 404) {
      return adaptAnimeDetail(detail, streaming);
    }

    streaming = {
      status: "error",
      episodes: [],
      error: error?.message || "Unable to check streaming availability.",
    };
  }

  return adaptAnimeDetail(detail, streaming);
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
