import assert from "node:assert/strict";
import {
  adaptAnimeDetail,
  adaptAnimeListResponse,
  adaptStreamingDetail,
} from "../adapters/animeMapper.js";
import { normalizePlayerUrl } from "./stream.js";

const searchList = adaptAnimeListResponse(
  {
    currentPage: 2,
    AniData: [
      {
        _id: 81,
        Name: "Naruto: Shippuden",
        ImagePath: "https://example.com/naruto.jpg",
        MALScore: "8.15",
        DescripTion: "Ninja story",
        finder: "naruto-shippuden",
      },
      {
        _id: null,
        Name: "Broken",
      },
    ],
  },
  1,
);

assert.equal(searchList.currentPage, 2);
assert.equal(searchList.hasNextPage, false);
assert.equal(searchList.results.length, 1);
assert.equal(searchList.results[0].id, 81);
assert.equal(searchList.results[0].title.romaji, "Naruto: Shippuden");
assert.equal(searchList.results[0].image, "https://example.com/naruto.jpg");
assert.equal(searchList.results[0].score, 8.15);

const quickSearchList = adaptAnimeListResponse(
  [
    {
      Id: 15,
      Name: "One Piece Film Red",
      Image: "https://example.com/film-red.jpg",
      finder: "one-piece-film-red",
    },
  ],
  1,
);

assert.equal(quickSearchList.results[0].id, 15);
assert.equal(
  quickSearchList.results[0].image,
  "https://example.com/film-red.jpg",
);

const detail = adaptAnimeDetail({
  local: {
    _id: 1443,
    Name: "Frieren: Beyond Journey's End Season 2",
    ImagePath: "https://example.com/frieren.jpg",
    Cover: "https://example.com/frieren-cover.jpg",
    Synonyms: "Sousou no Frieren 2",
    Aired: "Jan 16, 2026 to ?",
    Premiered: "Winter 2026",
    Duration: "24m",
    Status: "Ongoing",
    MALScore: "?",
    Genres: ["Adventure", "Drama"],
    Studios: "Madhouse",
    DescripTion: "Second season.",
    epCount: 4,
  },
});

assert.equal(detail.id, 1443);
assert.equal(detail.title.romaji, "Frieren: Beyond Journey's End Season 2");
assert.equal(detail.cover, "https://example.com/frieren-cover.jpg");
assert.deepEqual(detail.genres, ["Adventure", "Drama"]);
assert.equal(detail.status, "Ongoing");
assert.equal(detail.totalEpisodes, 4);
assert.equal(detail.releaseDate, "Jan 16, 2026 to ?");
assert.equal(detail.season, "Winter 2026");
assert.deepEqual(detail.studios, ["Madhouse"]);
assert.equal(detail.description, "Second season.");
assert.equal(detail.relations.length, 0);
assert.equal(detail.characters.length, 0);
assert.equal(detail.recommendations.length, 0);

assert.equal(
  normalizePlayerUrl("src=https://anipub.xyz/video/163517/sub"),
  "https://anipub.xyz/video/163517/sub",
);
assert.equal(
  normalizePlayerUrl("/video/163518/sub"),
  "https://anipub.xyz/video/163518/sub",
);
assert.equal(normalizePlayerUrl(null), null);
assert.equal(normalizePlayerUrl("not a url"), null);

const streaming = adaptStreamingDetail({
  local: {
    _id: 1443,
    name: "Episode 1",
    link: "src=https://anipub.xyz/video/163517/sub",
    poster: "https://example.com/frieren.jpg",
    ep: [
      { link: "src=https://anipub.xyz/video/163518/sub" },
      { link: "src=https://anipub.xyz/video/163518/sub" },
      { link: "" },
      { link: "/video/163519/sub" },
    ],
  },
});

assert.equal(streaming.status, "available");
assert.equal(streaming.episodes.length, 3);
assert.deepEqual(
  streaming.episodes.map((episode) => episode.number),
  [1, 2, 3],
);
assert.equal(
  streaming.episodes[0].playerUrl,
  "https://anipub.xyz/video/163517/sub",
);
assert.equal(
  streaming.episodes[1].playerUrl,
  "https://anipub.xyz/video/163518/sub",
);
assert.equal(
  streaming.episodes[2].playerUrl,
  "https://anipub.xyz/video/163519/sub",
);

const unavailableStreaming = adaptStreamingDetail({
  local: {
    ep: [{ link: "" }],
  },
});

assert.equal(unavailableStreaming.status, "unavailable");
assert.equal(unavailableStreaming.episodes.length, 0);

console.log("anime service checks passed");
