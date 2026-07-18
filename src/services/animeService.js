import {
  adaptAnimeDetail,
  adaptAnimeListResponse,
} from "../adapters/animeMapper.js";
import {
  getAnimeDetail as getJikanAnimeDetail,
  getAnimeSummary,
  getCurrentSeasonAnime,
  getPopularAnime as getJikanPopularAnime,
  getUpcomingAnime as getJikanUpcomingAnime,
  searchAnime as searchJikanAnime,
} from "./jikanApi.js";
import { getAnimoEpisodes } from "./animoService.js";

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

const getRelationIds = (anime) => [
  ...new Set(
    anime?.relations
      ?.flatMap((relation) => relation?.entry?.map((entry) => entry?.mal_id))
      .filter((id) => Number.isInteger(Number(id)) && Number(id) > 0) || [],
  ),
];

const getRelationAnime = async (anime, signal) => {
  const relationIds = getRelationIds(anime);
  if (!relationIds.length) return [];

  const results = await Promise.allSettled(
    relationIds.map((relationId) => getAnimeSummary(relationId, signal)),
  );

  return results
    .map((result) => {
      if (result.status !== "fulfilled") {
        if (result.reason?.cancelled) throw result.reason;
        return null;
      }

      return result.value?.data || null;
    })
    .filter(Boolean);
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

  let streaming = {
    status: "unavailable",
    episodes: [],
    error: "",
  };
  let relations = [];

  try {
    streaming = await getAnimoEpisodes(
      malId,
      anime?.title_english || anime?.title,
      signal,
    );
  } catch (error) {
    if (error?.cancelled) throw error;
    streaming = {
      status: "error",
      episodes: [],
      error: error?.message || "Unable to check streaming availability.",
    };
  }

  try {
    relations = await getRelationAnime(anime, signal);
  } catch (error) {
    if (error?.cancelled) throw error;
  }

  return adaptAnimeDetail(anime, streaming, relations);
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
