import { useState } from "react";
import { Box, Container, Flex, Stack } from "@chakra-ui/react";
import AnimeListHeader from "../../components/anime-list/anime-list-header/AnimeListHeader";
import AnimeListSearchInput from "../../components/anime-list/anime-list-search-input/AnimeListSearchInput";
import AnimeFilters from "../../components/anime-list/anime-filter/AnimeFilters";
import AnimeGrid from "../../components/anime-list/anime-grid/AnimeGrid";
import AnimeListTabs from "../../components/anime-list/anime-list-tabs/AnimeListTabs";
import AnimePagination from "../../components/anime-list/anime-pagination/AnimePagination";
import { animeList, defaultFilters } from "./data/anime-list.data";

function AnimeListPage() {
  const [filters, setFilters] = useState(defaultFilters);
  const [page, setPage] = useState(1);

  const updateFilter = (name, value) => {
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const removeFilter = (name) => {
    setFilters((current) => ({ ...current, [name]: "Any" }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: "28", md: "12" }}>
      <Container
        maxW="1440px"
        px={{ base: "4", md: "8", xl: "12" }}
        py={{ base: "7", md: "10" }}
      >
        <Stack gap={{ base: "7", md: "8" }}>
          <Flex
            align={{ base: "stretch", md: "end" }}
            justify="space-between"
            direction={{ base: "column", md: "row" }}
            gap="6"
          >
            <AnimeListHeader />
            <AnimeListSearchInput />
          </Flex>

          <AnimeListTabs />

          <AnimeFilters
            filters={filters}
            onFilterChange={updateFilter}
            onRemoveFilter={removeFilter}
            onClearFilters={clearFilters}
          />

          <AnimeGrid anime={animeList} />

          <AnimePagination page={page} onPageChange={setPage} />
        </Stack>
      </Container>
    </Box>
  );
}

export default AnimeListPage;
