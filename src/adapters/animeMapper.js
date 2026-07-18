const titleFallback = "Untitled Anime";

const placeholderImage = "/placeholder.png";

const seasonLabels = {
  winter: "Winter",
  spring: "Spring",
  summer: "Summer",
  fall: "Fall",
};

const getImage = (anime) =>
  anime?.images?.webp?.large_image_url ||
  anime?.images?.jpg?.large_image_url ||
  anime?.images?.jpg?.image_url ||
  placeholderImage;

const getCover = (anime) =>
  anime?.trailer?.images?.maximum_image_url ||
  anime?.trailer?.images?.large_image_url ||
  getImage(anime);

const getYear = (anime) => anime?.year || anime?.aired?.prop?.from?.year || "";

const normalizeSeason = (anime) => {
  const season = seasonLabels[anime?.season] || anime?.season || "";
  return season ? `${season.charAt(0).toUpperCase()}${season.slice(1)}` : "";
};

const normalizeAnime = (anime) => {
  const title = anime?.title || anime?.title_english || titleFallback;
  const image = getImage(anime);

  return {
    id: anime?.mal_id,
    malId: anime?.mal_id,
    title: {
      romaji: title,
      english: anime?.title_english || title,
      native: anime?.title_japanese || null,
    },
    image,
    cover: getCover(anime),
    description: anime?.synopsis || "",
    genres: anime?.genres?.map((genre) => genre?.name).filter(Boolean) || [],
    type: anime?.type || "",
    status: anime?.status || "",
    totalEpisodes: anime?.episodes || "Unknown",
    averageScore: anime?.score || null,
    score: anime?.score || null,
    releaseDate: getYear(anime),
    season: normalizeSeason(anime),
    studios:
      anime?.studios?.map((studio) => studio?.name).filter(Boolean) || [],
    trailer: anime?.trailer?.youtube_id
      ? {
          ...anime.trailer,
          id: anime.trailer.youtube_id,
        }
      : null,
    relations: anime?.relations || [],
    recommendations: [],
    characters: [],
  };
};

export const adaptAnimeListResponse = (rawResponse, fallbackPage = 1) => ({
  results:
    rawResponse?.data
      ?.map((anime) => normalizeAnime(anime))
      .filter((anime) => anime?.id) || [],
  currentPage:
    rawResponse?.pagination?.current_page || Number(fallbackPage) || 1,
  hasNextPage: Boolean(rawResponse?.pagination?.has_next_page),
  lastPage: rawResponse?.pagination?.last_visible_page || null,
});

export const adaptAnimeDetail = (
  rawAnime,
  streaming = {},
  rawRelationAnime = [],
) => {
  const anime = normalizeAnime(rawAnime);
  const cover = getCover(rawAnime);
  const relationAnimeById = new Map(
    rawRelationAnime
      .filter((relationAnime) => relationAnime?.mal_id)
      .map((relationAnime) => [
        relationAnime.mal_id,
        normalizeAnime(relationAnime),
      ]),
  );

  return {
    ...anime,
    cover,
    episodes: Array.isArray(streaming?.episodes) ? streaming.episodes : [],
    streamingStatus: streaming?.status || "unavailable",
    streamingError: streaming?.error || "",
    relations:
      rawAnime?.relations
        ?.flatMap((relation) =>
          relation?.entry?.map((entry) => {
            const hydratedAnime = relationAnimeById.get(entry?.mal_id);

            return {
              id: entry?.mal_id,
              malId: entry?.mal_id,
              title: {
                romaji: entry?.name || titleFallback,
                english: entry?.name || titleFallback,
                native: hydratedAnime?.title?.native || null,
              },
              image: hydratedAnime?.image || placeholderImage,
              cover: hydratedAnime?.cover || placeholderImage,
              description: hydratedAnime?.description || "",
              genres: hydratedAnime?.genres || [],
              type: entry?.type || "",
              status: hydratedAnime?.status || "",
              totalEpisodes: hydratedAnime?.totalEpisodes || "Unknown",
              averageScore: hydratedAnime?.averageScore || null,
              score: hydratedAnime?.score || null,
              releaseDate: hydratedAnime?.releaseDate || "",
              season: hydratedAnime?.season || "",
              studios: hydratedAnime?.studios || [],
              trailer: hydratedAnime?.trailer || null,
              relationType: relation?.relation || "",
              recommendations: [],
              characters: [],
            };
          }),
        )
        .filter((anime) => anime?.id) || [],
    recommendations: [],
    characters: [],
  };
};
