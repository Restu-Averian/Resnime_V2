import {
  CalendarDays,
  CircleCheck,
  ListFilter,
  Monitor,
  Tags,
} from "lucide-react";

export const FILTER_OPTIONS = {
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

export const DEFAULT_FILTERS = {
  genre: "Any",
  type: "Any",
  status: "Any",
  season: "Any",
  order: "Highest Rated",
};

export const ORDER_VALUE_MAP = {
  "Highest Rated": "highest_rated",
  Latest: "latest",
  "Title A-Z": "a_z",
  "Title Z-A": "z_a",
};

export const FILTERS_CONFIG = [
  { name: "genre", label: "Genre", icon: Tags },
  { name: "type", label: "Type", icon: Monitor },
  { name: "status", label: "Status", icon: CircleCheck },
  { name: "season", label: "Season", icon: CalendarDays },
  { name: "order", label: "Order", icon: ListFilter },
];

export const CHIP_FILTERS = ["genre", "type", "status", "season"];

export const LIMIT = 20;
