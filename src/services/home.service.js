import api from "../lib/api";

export async function getHomeData() {
  const response = await api.get("/api/home");
  const body = response.data;

  if (body?.success !== true) {
    throw new Error(
      body?.error?.message ?? "Failed to load home data"
    );
  }

  return body.data;
}
