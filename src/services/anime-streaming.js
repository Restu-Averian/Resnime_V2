import api from "../lib/api";

export async function getAnimeStreamingEpisode(malId, episodeNumber) {
  const response = await api.get(`/api/anime/${malId}/episodes/${episodeNumber}`);
  return response.data;
}
