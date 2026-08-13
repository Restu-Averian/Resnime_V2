import { SimpleGrid, Stack } from "@chakra-ui/react";
import AnimeListFiltersItems from "./AnimeListFiltersItems";
import { Select } from "../../ui/select";
import { FILTER_OPTIONS, FILTERS_CONFIG } from "../../../constants/anime-list";

function AnimeListFilters({
  filters,
  onFilterChange,
  onRemoveFilter,
  onClearFilters,
}) {
  return (
    <Stack gap="4">
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 5 }} gap="3">
        {FILTERS_CONFIG?.map((filter) => (
          <Select
            key={filter.name}
            prefixIcon={filter.icon}
            prefixLabel={filter.label}
            name={filter.name}
            options={FILTER_OPTIONS[filter.name]}
            value={filters[filter.name]}
            onChange={onFilterChange}
          />
        ))}
      </SimpleGrid>

      <AnimeListFiltersItems
        filters={filters}
        onRemove={onRemoveFilter}
        onClear={onClearFilters}
      />
    </Stack>
  );
}

export default AnimeListFilters;
