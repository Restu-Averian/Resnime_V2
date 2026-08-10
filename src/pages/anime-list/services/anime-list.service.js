import api from "../../../lib/api";

export async function getAnimeList(params) {
  const response = await api.get("/api/anime", {
    params,
  });

  return response.data;
}
