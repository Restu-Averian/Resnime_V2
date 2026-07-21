import { Grid, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ErrorPage from "../components/global/ErrorPage";
import Pagination from "../components/global/Pagination";
import SearchHeader from "../components/search/SearchHeader";
import SearchResultItem from "../components/search/SearchResultItem";
import SearchResultSkeleton from "../components/search/SearchResultSkeleton";
import imageError from "../assets/image_error.png";
import useChangeDocTitle from "../hooks/useChangeDocTitle";
import useFetchData from "../hooks/useFetchData";

const Search = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  const { searchVal, pageValue, path } = useMemo(() => {
    const q = searchParam?.get("q") || "";
    const page = searchParam?.get("page");
    return {
      searchVal: q,
      pageValue: page,
      path: `/${encodeURIComponent(q)}${page ? `?page=${page}` : ""}`,
    };
  }, [searchParam]);

  const { data, loading, error, refetch } = useFetchData(path);

  const results = data?.results || [];

  const currentPage = Number(data?.currentPage || pageValue || 1);

  const handleSetPage = (nextPage) => {
    setSearchParam((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", String(nextPage));
      return params;
    });
  };

  useChangeDocTitle(searchVal ? `Resnime | ${searchVal}` : "Resnime | Search");

  return (
    <Stack
      minH="calc(100vh - 88px)"
      gap={6}
      pt={{ base: 4, md: 7 }}
      px={{ base: 0, md: 0 }}
      color="#f5f7ff"
    >
      <SearchHeader
        searchVal={searchVal}
        loading={loading}
        totalResults={results.length}
      />

      {error ? (
        <ErrorPage
          btnAction={{
            onClick: refetch,
            text: "Refresh",
          }}
          title="Error"
          subTitle={error}
          src={imageError}
        />
      ) : loading ? (
        <Stack gap={3}>
          <SimpleGrid columns={{ base: 1, xl: 2 }} gap={3.5}>
            {Array.from({ length: 10 }).map((_, i) => (
              <SearchResultSkeleton key={i} />
            ))}
          </SimpleGrid>
        </Stack>
      ) : results.length ? (
        <Stack gap={3}>
          <SimpleGrid columns={{ base: 1, xl: 2 }} gap={3.5}>
            {results.map((anime) => (
              <SearchResultItem anime={anime} key={anime.id} />
            ))}
          </SimpleGrid>

          <Pagination
            page={currentPage}
            hasNextPage={data?.hasNextPage}
            loading={loading}
            onPrev={() => handleSetPage(currentPage - 1)}
            onNext={() => handleSetPage(currentPage + 1)}
            justify="flex-end"
            pt={1}
          />
        </Stack>
      ) : (
        <Grid
          minH="320px"
          placeItems="center"
          border="1px solid rgba(165, 183, 226, 0.14)"
          borderRadius="10px"
          bg="rgba(255,255,255,0.035)"
          color="#b8c0d2"
        >
          <Text>No results found</Text>
        </Grid>
      )}
    </Stack>
  );
};

export default Search;
