import { SimpleGrid, Stack } from "@chakra-ui/react";
import {
  CalendarDays,
  CircleCheck,
  ListFilter,
  Monitor,
  Tags,
} from "lucide-react";
import { filterOptions } from "../../../pages/anime-list/data/anime-list.data";
import ActiveFilters from "./ActiveFilters";
import AnimeFilterItem from "./AnimeFilterItem";

const filtersConfig = [
  { name: "genre", label: "Genre", icon: Tags },
  { name: "type", label: "Type", icon: Monitor },
  { name: "status", label: "Status", icon: CircleCheck },
  { name: "season", label: "Season", icon: CalendarDays },
  { name: "order", label: "Order", icon: ListFilter },
];

function AnimeFilters({
  filters,
  onFilterChange,
  onRemoveFilter,
  onClearFilters,
}) {
  return (
    <Stack gap="4">
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 5 }} gap="3">
        {filtersConfig.map((filter) => (
          <AnimeFilterItem
            key={filter.name}
            {...filter}
            options={filterOptions[filter.name]}
            value={filters[filter.name]}
            onChange={onFilterChange}
          />
        ))}
      </SimpleGrid>

      <ActiveFilters
        filters={filters}
        onRemove={onRemoveFilter}
        onClear={onClearFilters}
      />
    </Stack>
  );
}

export default AnimeFilters;
