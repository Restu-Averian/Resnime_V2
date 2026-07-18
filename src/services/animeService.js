import {
  adaptAnimeDetail,
  adaptAnimeListResponse,
} from "../adapters/animeMapper.js";
import {
  getAnimeDetail as getJikanAnimeDetail,
  getAnimeEpisodes,
  getCurrentSeasonAnime,
  getPopularAnime as getJikanPopularAnime,
  getUpcomingAnime as getJikanUpcomingAnime,
  searchAnime as searchJikanAnime,
} from "./jikanApi.js";

const getPage = (searchParams) => {
  const page = Number(searchParams.get("page"));
  return Number.isInteger(page) && page > 0 ? page : 1;
};

const toValidMalId = (id) => {
  const malId = Number(id);
  if (!Number.isInteger(malId) || malId < 1) {
    throw new Error("Anime not found.");
  }
  return malId;
};

export const getTrendingAnime = async (page, signal) => {
  const data = await getCurrentSeasonAnime(page, signal);
  return adaptAnimeListResponse(data, page);
};

export const getPopularAnime = async (page, signal) => {
  const data = await getJikanPopularAnime(page, signal);
  return adaptAnimeListResponse(data, page);
};

export const getUpcomingAnime = async (page, signal) => {
  const data = await getJikanUpcomingAnime(page, signal);
  return adaptAnimeListResponse(data, page);
};

export const searchAnime = async (query, page, signal) => {
  const q = query?.trim();
  if (!q) {
    return {
      results: [],
      currentPage: page,
      hasNextPage: false,
      lastPage: null,
    };
  }

  const data = await searchJikanAnime(q, page, signal);
  return adaptAnimeListResponse(data, page);
};

export const getAnimeDetail = async (id, signal) => {
  const malId = toValidMalId(id);
  const detail = await getJikanAnimeDetail(malId, signal);
  const anime = detail?.data;

  if (!anime?.mal_id) {
    throw new Error("Anime not found.");
  }

  let episodes = null;
  if (Number(anime?.episodes) > 0) {
    try {
      episodes = await getAnimeEpisodes(malId, 1, signal);
    } catch (error) {
      if (error?.cancelled) throw error;
    }
  }

  return adaptAnimeDetail(anime, episodes);
};

export const getAnimeByPath = (path, signal) => {
  const [pathname, query = ""] = path.split("?");
  const searchParams = new URLSearchParams(query);
  const page = getPage(searchParams);

  if (pathname === "/trending") return getTrendingAnime(page, signal);
  if (pathname === "/popular") return getPopularAnime(page, signal);
  if (pathname === "/upcoming") return getUpcomingAnime(page, signal);
  if (pathname.startsWith("/anime/")) {
    return getAnimeDetail(pathname.replace("/anime/", ""), signal);
  }

  return searchAnime(
    decodeURIComponent(pathname.replace(/^\//, "")),
    page,
    signal,
  );
};
