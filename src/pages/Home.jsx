import { Box, Flex, Grid, Skeleton, Stack } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import useChangeDocTitle from "../hooks/useChangeDocTitle";
import {
  getHomeBannerAnime,
  getRecentlyUpdatedAnime,
} from "../services/animeService";
import HomeSectionHeader from "../components/home/HomeSectionHeader";
import HeroBanner from "../components/home/HeroBanner";
import RecentCard from "../components/home/RecentCard";

const Home = () => {
  useChangeDocTitle("Resnime");

  const [banner, setBanner] = useState(null);
  const [recent, setRecent] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const controllerRef = useRef(null);

  const fetchData = async () => {
    const signal = controllerRef.current?.signal;
    if (!signal) return;

    try {
      const featured = await getHomeBannerAnime(signal);
      if (!signal.aborted) setBanner(featured);
    } catch {
      // Abaikan error banner agar page tetap lanjut load
    }

    try {
      const recentlyUpdated = await getRecentlyUpdatedAnime(page, signal, 8);
      if (!signal.aborted) setRecent(recentlyUpdated.results);
    } catch (err) {
      if (!err?.cancelled && !signal.aborted) {
        setError(err?.message || "Unable to load homepage.");
      }
    } finally {
      if (!signal.aborted) setLoading(false);
    }
  };

  useEffect(() => {
    controllerRef.current = new AbortController();
    setLoading(true);
    setError("");

    fetchData();

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [page]);

  return (
    <Stack gap={6} maxW="1680px" mx="auto">
      <HeroBanner anime={banner} loading={loading} />

      {error && (
        <Box
          p={4}
          borderRadius="10px"
          border="1px solid rgba(255,109,143,0.35)"
          bg="rgba(255,109,143,0.1)"
          color="#ffb3c4"
        >
          {error}
        </Box>
      )}

      <Stack gap={3}>
        <HomeSectionHeader page={page} setPage={setPage} loading={loading} />

        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gap={4}
        >
          {loading
            ? Array.from({ length: 8 }, (_, index) => (
                <Skeleton key={index} h="132px" borderRadius="10px" />
              ))
            : recent.map((anime) => (
                <RecentCard key={anime.id} anime={anime} />
              ))}
        </Grid>

        {!loading && !recent.length && (
          <Flex
            minH="140px"
            align="center"
            justify="center"
            borderRadius="10px"
            border="1px solid rgba(255,255,255,0.1)"
            color="gray.400"
          >
            No recent updates found.
          </Flex>
        )}
      </Stack>
    </Stack>
  );
};

export default Home;
