import {
  Box,
  Flex,
  Grid,
  HStack,
  IconButton,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import useChangeDocTitle from "../hooks/useChangeDocTitle";
import {
  getHomeBannerAnime,
  getRecentlyUpdatedAnime,
} from "../services/animeService";
import SectionHeader from "../components/home/SectionHeader";
import HeroBanner from "../components/home/HeroBanner";
import RecentCard from "../components/home/RecentCard";

const Home = () => {
  useChangeDocTitle("Resnime");

  const [banner, setBanner] = useState(null);
  const [recent, setRecent] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    Promise.all([
      getHomeBannerAnime(controller.signal),
      getRecentlyUpdatedAnime(page, controller.signal, 8),
    ])
      .then(([featured, recentlyUpdated]) => {
        if (controller.signal.aborted) return;
        setBanner(featured);
        setRecent(recentlyUpdated.results);
      })
      .catch((err) => {
        if (err?.cancelled || controller.signal.aborted) return;
        setError(err?.message || "Unable to load homepage.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
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
        <SectionHeader
          icon={Flame}
          title="Recently Updated"
          action={
            <HStack gap={2}>
              <IconButton
                aria-label="Previous recent page"
                size="sm"
                borderRadius="10px"
                variant="outline"
                borderColor="rgba(255,255,255,0.14)"
                disabled={page === 1 || loading}
                onClick={() => setPage((value) => Math.max(value - 1, 1))}
              >
                <ChevronLeft />
              </IconButton>
              <Text color="gray.300" minW="70px" textAlign="center">
                Page {page}
              </Text>
              <IconButton
                aria-label="Next recent page"
                size="sm"
                borderRadius="10px"
                variant="outline"
                borderColor="rgba(255,255,255,0.14)"
                disabled={loading}
                onClick={() => setPage((value) => value + 1)}
              >
                <ChevronRight />
              </IconButton>
            </HStack>
          }
        />
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
