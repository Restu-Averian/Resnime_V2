import { ANIPUB_API_BASE_URL } from "../constants/index.js";

export const normalizePlayerUrl = (value) => {
  if (typeof value !== "string") return null;

  const normalized = value.startsWith("src=") ? value.slice(4) : value;
  if (!/^https?:\/\//.test(normalized) && !normalized.startsWith("/")) {
    return null;
  }

  const baseUrl = new URL(ANIPUB_API_BASE_URL);

  try {
    const url = new URL(normalized, baseUrl);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
};

export const getStreamOrigin = () => new URL(ANIPUB_API_BASE_URL).origin;
