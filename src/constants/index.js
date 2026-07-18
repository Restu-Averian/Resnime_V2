export const JIKAN_API_BASE_URL =
  import.meta.env?.VITE_JIKAN_API_BASE_URL || "https://api.jikan.moe/v4";

export const ANIMO_API_BASE_URL =
  import.meta.env?.VITE_ANIMO_API_BASE_URL || "https://cdnanimo.xyz";

export const STREAM_BASE_URL =
  import.meta.env?.VITE_STREAM_BASE_URL || "https://cdn.4animo.xyz";

export const ROLES = {
  MAIN: "teal",
  SUPPORTING: "yellow",
};
