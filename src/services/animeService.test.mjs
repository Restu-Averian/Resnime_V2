import assert from "node:assert/strict";
import {
  adaptAnimeDetail,
  adaptAnimeListResponse,
} from "../adapters/animeMapper.js";
import { buildStreamUrl } from "./stream.js";

const rawAnime = {
  mal_id: 21,
  title: "One Piece",
  title_english: "One Piece",
  title_japanese: "ワンピース",
  images: {
    webp: {
      large_image_url: "https://example.com/one-piece.webp",
    },
    jpg: {
      large_image_url: "https://example.com/one-piece.jpg",
      image_url: "https://example.com/one-piece-small.jpg",
    },
  },
  trailer: {
    youtube_id: "abc123",
    images: {
      maximum_image_url: "https://example.com/trailer-cover.jpg",
      large_image_url: "https://example.com/trailer-large.jpg",
    },
  },
  synopsis: "Pirates\nAdventure",
  type: "TV",
  status: "Currently Airing",
  episodes: 2,
  score: 8.73,
  year: 1999,
  season: "fall",
  aired: {
    prop: {
      from: {
        year: 1999,
      },
    },
  },
  genres: [
    {
      mal_id: 1,
      name: "Action",
    },
  ],
  studios: [
    {
      mal_id: 18,
      name: "Toei Animation",
    },
  ],
  relations: [
    {
      relation: "Side story",
      entry: [
        {
          mal_id: 22,
          name: "One Piece Movie",
          type: "anime",
        },
      ],
    },
  ],
};

const list = adaptAnimeListResponse(
  {
    data: [rawAnime],
    pagination: {
      current_page: 3,
      has_next_page: true,
      last_visible_page: 9,
    },
  },
  1,
);

assert.equal(list.currentPage, 3);
assert.equal(list.hasNextPage, true);
assert.equal(list.lastPage, 9);
assert.equal(list.results[0].id, 21);
assert.equal(list.results[0].malId, 21);
assert.equal(list.results[0].title.romaji, "One Piece");
assert.equal(list.results[0].image, "https://example.com/one-piece.webp");
assert.equal(list.results[0].cover, "https://example.com/trailer-cover.jpg");
assert.equal(list.results[0].type, "TV");
assert.equal(list.results[0].status, "Currently Airing");
assert.deepEqual(list.results[0].genres, ["Action"]);

const detail = adaptAnimeDetail(rawAnime);

assert.equal(detail.cover, "https://example.com/trailer-cover.jpg");
assert.deepEqual(detail.studios, ["Toei Animation"]);
assert.equal(detail.season, "Fall");
assert.equal(detail.episodes.length, 2);
assert.deepEqual(detail.episodes[0], {
  id: "21-1",
  number: 1,
  title: "Episode 1",
  image: "https://example.com/trailer-cover.jpg",
});
assert.equal(detail.relations[0].relationType, "Side story");
assert.equal(detail.recommendations.length, 0);
assert.equal(detail.characters.length, 0);

assert.equal(
  buildStreamUrl({
    malId: 21,
    episodeNumber: 1,
  }),
  "https://cdn.4animo.xyz/embed/hd-1/mal/21/1/sub?k=1",
);

assert.throws(() => buildStreamUrl({ malId: "x", episodeNumber: 1 }));
assert.throws(() => buildStreamUrl({ malId: 21, episodeNumber: 0 }));
assert.throws(() =>
  buildStreamUrl({ malId: 21, episodeNumber: 1, audioType: "raw" }),
);
assert.throws(() =>
  buildStreamUrl({ malId: 21, episodeNumber: 1, server: "hd-2" }),
);

console.log("anime service checks passed");
