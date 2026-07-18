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

const buildGeneratedEpisodes = (anime, cover) => {
  const total = Number(anime?.episodes);
  if (!Number.isInteger(total) || total < 1) return [];

  return Array.from({ length: total }, (_, index) => {
    const number = index + 1;
    return {
      id: `${anime.mal_id}-${number}`,
      number,
      title: `Episode ${number}`,
      image: cover,
    };
  });
};

export const adaptEpisode = (episode, anime, cover) => {
  const number = Number(episode?.mal_id);
  if (!Number.isInteger(number) || number < 1) return null;

  return {
    id: `${anime?.mal_id}-${number}`,
    number,
    title: episode?.title || `Episode ${number}`,
    titleJapanese: episode?.title_japanese || null,
    titleRomanji: episode?.title_romanji || null,
    aired: episode?.aired || null,
    filler: episode?.filler || false,
    recap: episode?.recap || false,
    image: cover,
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

export const adaptAnimeDetail = (rawAnime, rawEpisodes) => {
  const anime = normalizeAnime(rawAnime);
  const cover = getCover(rawAnime);
  const fetchedEpisodes =
    rawEpisodes?.data
      ?.map((episode) => adaptEpisode(episode, rawAnime, cover))
      .filter(Boolean) || [];

  return {
    ...anime,
    cover,
    episodes: fetchedEpisodes.length
      ? fetchedEpisodes
      : buildGeneratedEpisodes(rawAnime, cover),
    relations:
      rawAnime?.relations
        ?.flatMap((relation) =>
          relation?.entry?.map((entry) => ({
            id: entry?.mal_id,
            malId: entry?.mal_id,
            title: {
              romaji: entry?.name || titleFallback,
              english: entry?.name || titleFallback,
              native: null,
            },
            image: placeholderImage,
            cover: placeholderImage,
            description: "",
            genres: [],
            type: entry?.type || "",
            status: "",
            totalEpisodes: "Unknown",
            averageScore: null,
            score: null,
            releaseDate: "",
            season: "",
            studios: [],
            trailer: null,
            relationType: relation?.relation || "",
            recommendations: [],
            characters: [],
          })),
        )
        .filter((anime) => anime?.id) || [],
    recommendations: [],
    characters: [],
  };
};
