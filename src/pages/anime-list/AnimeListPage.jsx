import { useState } from "react";
import {
  Box,
  Container,
  Flex,
  Stack,
  Text,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import AnimeListHeader from "../../components/anime-list/anime-list-header/AnimeListHeader";
import AnimeListSearchInput from "../../components/anime-list/anime-list-search-input/AnimeListSearchInput";
import AnimeFilters from "../../components/anime-list/anime-filter/AnimeFilters";
import AnimeGrid from "../../components/anime-list/anime-grid/AnimeGrid";
import AnimeListTabs from "../../components/anime-list/anime-list-tabs/AnimeListTabs";
import AnimePagination from "../../components/anime-list/anime-pagination/AnimePagination";
import { defaultFilters, tabs, orderValueMap } from "./data/anime-list.data";
import { getAnimeList } from "./services/anime-list.service";

const LIMIT = 20;

function AnimeListPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [page, setPage] = useState(1);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const updateFilter = (name, value) => {
    setFilters((current) => ({ ...current, [name]: value }));
    setPage(1);
  };

  const removeFilter = (name) => {
    setFilters((current) => ({ ...current, [name]: "Any" }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    setPage(1);
  };

  const params = {
    tab: activeTab === "All Anime" ? "all" : "all", // only 'all' is supported
    search: search || undefined,
    genre: filters.genre === "Any" ? undefined : filters.genre,
    type: filters.type === "Any" ? undefined : filters.type,
    status: filters.status === "Any" ? undefined : filters.status,
    season: filters.season === "Any" ? undefined : filters.season,
    order: orderValueMap[filters.order] ?? "highest_rated",
    page,
    limit: LIMIT,
  };

  const {
    data: animeData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["anime-list", params],
    queryFn: () => getAnimeList(params),
    placeholderData: keepPreviousData,
  });

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

            <AnimeListSearchInput onSearchChange={handleSearchChange} />
          </Flex>

          <AnimeListTabs activeTab={activeTab} onTabChange={handleTabChange} />

          <AnimeFilters
            filters={filters}
            onFilterChange={updateFilter}
            onRemoveFilter={removeFilter}
            onClearFilters={clearFilters}
          />

          {isError ? (
            <Center py="20">
              <Text color="fg.error">
                {error?.response?.data?.error?.message ||
                  "Failed to load anime."}
              </Text>
            </Center>
          ) : isPending ? (
            <Center py="20">
              <Spinner size="xl" color="accent.primary" />
            </Center>
          ) : animeData?.items?.length === 0 ? (
            <Center py="20">
              <Text color="fg.muted">No anime found.</Text>
            </Center>
          ) : (
            <>
              <AnimeGrid anime={animeData?.items ?? []} />
              <AnimePagination
                pagination={animeData?.pagination}
                onPageChange={setPage}
              />
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default AnimeListPage;
