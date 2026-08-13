import { useState, useCallback } from "react";
import { Box, Container, Flex, Stack, Text, Center } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import AnimeListHeader from "../components/anime-list/AnimeListHeader";
import AnimeListSearchInput from "../components/anime-list/AnimeListSearchInput";
import AnimeListFilters from "../components/anime-list/anime-list-filters/AnimeListFilters";
import AnimeListFiltersSkeleton from "../components/skeletons/anime-list/AnimeListFiltersSkeleton";
import AnimeListDatas from "../components/anime-list/anime-list-datas";
import AnimeListDatasSkeleton from "../components/skeletons/anime-list/AnimeListDatasSkeleton";
import AnimeListPagination from "../components/anime-list/AnimeListPagination";
import AnimeListPaginationSkeleton from "../components/skeletons/anime-list/AnimeListPaginationSkeleton";
import {
  DEFAULT_FILTERS,
  ORDER_VALUE_MAP,
  LIMIT,
} from "../constants/anime-list";
import { getAnimeList } from "../services/anime-list.service";

function AnimeListPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const handleSearchChange = useCallback((value) => {
    setSearch(value);
    setPage(1);
  }, []);

  const updateFilter = useCallback((name, value) => {
    setFilters((current) => ({ ...current, [name]: value }));
    setPage(1);
  }, []);

  const removeFilter = useCallback((name) => {
    setFilters((current) => ({ ...current, [name]: "Any" }));
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const params = {
    search: search || undefined,
    genre: filters.genre === "Any" ? undefined : filters.genre,
    type: filters.type === "Any" ? undefined : filters.type,
    status: filters.status === "Any" ? undefined : filters.status,
    season: filters.season === "Any" ? undefined : filters.season,
    order: ORDER_VALUE_MAP[filters.order] ?? "highest_rated",
    page,
    limit: LIMIT,
  };

  const {
    data: animeData,
    isPending: isLoadingAnimeList,
    isError,
    error,
  } = useQuery({
    queryKey: ["anime-list", params],
    queryFn: () => getAnimeList(params),
  });

  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: "28", md: "12" }}>
      <Container
        maxW="1440px"
        px={{ base: "4", md: "8", xl: "12" }}
        py={{ base: "7", md: "10" }}
      >
        <Stack gap={{ base: "7", md: "8" }}>
          <Stack
            position="sticky"
            top="75"
            zIndex="10"
            bg="bg.canvas"
            gap={{ base: "7", md: "8" }}
            pb="2"
          >
            <Flex
              align={{ base: "stretch", md: "end" }}
              justify="space-between"
              direction={{ base: "column", md: "row" }}
              gap="6"
            >
              <AnimeListHeader />

              <AnimeListSearchInput onSearchChange={handleSearchChange} />
            </Flex>

            {isLoadingAnimeList ? (
              <AnimeListFiltersSkeleton />
            ) : (
              <AnimeListFilters
                filters={filters}
                onFilterChange={updateFilter}
                onRemoveFilter={removeFilter}
                onClearFilters={clearFilters}
              />
            )}
          </Stack>

          {isError ? (
            <Center py="20">
              <Text color="fg.error">
                {error?.response?.data?.error?.message ||
                  "Failed to load anime."}
              </Text>
            </Center>
          ) : isLoadingAnimeList ? (
            <>
              <AnimeListDatasSkeleton />

              <AnimeListPaginationSkeleton />
            </>
          ) : animeData?.items?.length === 0 ? (
            <Center py="20">
              <Text color="fg.muted">No anime found.</Text>
            </Center>
          ) : (
            <>
              <AnimeListDatas anime={animeData?.items ?? []} />

              <AnimeListPagination
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
