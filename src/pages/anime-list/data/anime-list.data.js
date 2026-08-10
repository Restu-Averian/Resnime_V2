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
  order: ["Highest Rated", "Latest", "Title A-Z", "Title Z-A"],
};

export const defaultFilters = {
  genre: "Any",
  type: "Any",
  status: "Any",
  season: "Any",
  order: "Highest Rated",
};

export const orderValueMap = {
  "Highest Rated": "highest_rated",
  Latest: "latest",
  "Title A-Z": "a_z",
  "Title Z-A": "z_a",
};
