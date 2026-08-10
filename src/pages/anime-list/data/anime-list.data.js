const thumbnail =
  "https://i.pinimg.com/736x/de/e2/9c/dee29c95c114eec8c2f4bd12b9f51d8a.jpg";

export const tabs = ["All Anime", "New Episodes", "Recently Added"];

export const filterOptions = {
  genre: [
    "Any",
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Supernatural",
  ],
  type: ["Any", "TV", "Movie", "OVA", "ONA", "Special"],
  status: ["Any", "Ongoing", "Finished"],
  season: ["Any", "Winter", "Spring", "Summer", "Fall"],
  order: ["Latest", "Highest Rated", "Title A-Z", "Title Z-A", "Oldest"],
};

export const defaultFilters = {
  genre: "Any",
  type: "Any",
  status: "Any",
  season: "Any",
  order: "Latest",
};

export const animeList = [
  {
    id: 1,
    title: "Whispers in Daylight",
    rating: 8.6,
    type: "TV",
    image: thumbnail,
  },
  {
    id: 2,
    title: "The Hollow Gate",
    rating: 8.4,
    type: "TV",
    image: thumbnail,
  },
  {
    id: 3,
    title: "Moonlit Reverie",
    rating: 8.7,
    type: "TV",
    image: thumbnail,
  },
  { id: 4, title: "Dawnflower", rating: 8.5, type: "TV", image: thumbnail },
  {
    id: 5,
    title: "Clockwork Memoirs",
    rating: 8.3,
    type: "TV",
    image: thumbnail,
  },
  { id: 6, title: "Azure Eclipse", rating: 8.2, type: "TV", image: thumbnail },
  {
    id: 7,
    title: "Echoes of Eldoria",
    rating: 8.1,
    type: "TV",
    image: thumbnail,
  },
  {
    id: 8,
    title: "Runes of the North",
    rating: 8.0,
    type: "TV",
    image: thumbnail,
  },
  {
    id: 9,
    title: "Starlit Horizon",
    rating: 7.9,
    type: "TV",
    image: thumbnail,
  },
  { id: 10, title: "Silent Grove", rating: 7.8, type: "TV", image: thumbnail },
];
