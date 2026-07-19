export const compactText = (text = "", limit = 180) => {
  const value = text
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return value.length > limit ? `${value.slice(0, limit).trim()}...` : value;
};

export const animePath = (anime) =>
  anime?.id
    ? `/anime/${anime.id}/${encodeURIComponent(anime.title.romaji)}`
    : "/";
