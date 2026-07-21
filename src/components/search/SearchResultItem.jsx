import { useMemo } from "react";
import { Badge, Box, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { PlaySquare, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Image from "../global/Image";
import { animePath, compactText } from "../home/utils";

const SearchResultItem = ({ anime }) => {
  const genres = anime?.genres?.slice(0, 3) || [];
  const extraGenres = Math.max((anime?.genres?.length || 0) - genres.length, 0);

  const score = useMemo(() => {
    const score = anime?.score;
    return typeof score === "number" && Number.isFinite(score)
      ? score?.toFixed(2)
      : null;
  }, [anime?.score]);

  const animeType = useMemo(() => {
    const title = anime?.title?.romaji || "";
    const type = anime?.type?.trim();

    if (type) return type.toUpperCase();
    if (/ova/i.test(title)) return "OVA";
    if (/movie/i.test(title)) return "MOVIE";
    return "TV";
  }, [anime?.title?.romaji, anime?.type]);

  const parts = useMemo(() => {
    return [
      anime?.totalEpisodes
        ? `${anime.totalEpisodes} ${Number(anime.totalEpisodes) === 1 ? "Episode" : "Episodes"}`
        : animeType,
      anime?.releaseDate || anime?.season || null,
      anime?.status || null,
    ].filter(Boolean);
  }, [
    anime?.totalEpisodes,
    anime?.releaseDate,
    anime?.season,
    anime?.status,
    animeType,
  ]);

  return (
    <Box
      as={Link}
      to={animePath(anime)}
      display="grid"
      gridTemplateColumns={{
        base: "96px minmax(0, 1fr)",
        sm: "132px minmax(0, 1fr)",
      }}
      gap={{ base: 3, md: 5 }}
      p={{ base: 3, md: 3 }}
      minH={{ base: "150px", md: "188px" }}
      borderRadius="9px"
      border="1px solid rgba(165, 183, 226, 0.16)"
      bg="linear-gradient(145deg, rgba(20, 27, 50, 0.88), rgba(13, 20, 39, 0.94))"
      boxShadow="inset 0 1px 0 rgba(255,255,255,0.03), 0 14px 35px rgba(0,0,0,0.12)"
      overflow="hidden"
      position="relative"
      _hover={{
        borderColor: "rgba(255, 109, 143, 0.42)",
        bg: "linear-gradient(145deg, rgba(27, 34, 60, 0.9), rgba(15, 23, 43, 0.96))",
        textDecoration: "none",
      }}
    >
      <Image
        src={anime?.image}
        alt={anime?.title?.romaji || "Anime poster"}
        w={{ base: "96px", sm: "132px" }}
        h={{ base: "124px", sm: "172px" }}
        borderRadius="8px"
        objectFit="cover"
      />

      <Stack gap={{ base: 2, md: 2.5 }} minW={0} pr={{ base: 0, sm: 14 }}>
        <Badge
          alignSelf="flex-start"
          bg="#ec5f9a"
          color="white"
          borderRadius="7px"
          px={2}
          h="22px"
          fontSize="xs"
          fontWeight="bold"
          lineHeight="22px"
          boxShadow="0 0 16px rgba(236, 95, 154, 0.22)"
        >
          {animeType}
        </Badge>

        <Text
          as="h3"
          color="#f5f7ff"
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="800"
          lineHeight="1.16"
          overflowWrap="anywhere"
        >
          {anime?.title?.romaji || "Untitled Anime"}
        </Text>

        <Text
          color="#c3cadb"
          fontSize={{ base: "sm", md: "sm" }}
          lineHeight="1.35"
        >
          {compactText(anime?.description || "No synopsis available yet.", 108)}
        </Text>

        <HStack gap={2} flexWrap="wrap">
          {genres.map((genre) => (
            <Badge
              key={genre}
              color="#d8dcec"
              bg="rgba(255,255,255,0.055)"
              border="1px solid rgba(255,255,255,0.08)"
              borderRadius="999px"
              px={3}
              py={1}
              fontSize="xs"
              fontWeight="medium"
            >
              {genre}
            </Badge>
          ))}
          {extraGenres > 0 && (
            <Badge
              color="#d8dcec"
              bg="rgba(255,255,255,0.055)"
              border="1px solid rgba(255,255,255,0.08)"
              borderRadius="999px"
              px={3}
              py={1}
              fontSize="xs"
              fontWeight="medium"
            >
              +{extraGenres}
            </Badge>
          )}
        </HStack>

        <HStack
          color="#b8c0d2"
          fontSize={{ base: "xs", md: "sm" }}
          gap={2.5}
          flexWrap="wrap"
          mt="auto"
        >
          <Icon as={PlaySquare} boxSize={3.5} color="#ff7da1" />
          {parts.map((part, index) => (
            <HStack key={`${part}-${index}`} gap={2.5}>
              {index > 0 && <Text color="#737b92">•</Text>}
              <Text color={part === "Recently Updated" ? "#ff73a0" : "inherit"}>
                {part}
              </Text>
            </HStack>
          ))}
        </HStack>
      </Stack>

      {score && (
        <HStack
          position="absolute"
          top={{ base: 3, md: 5 }}
          right={{ base: 3, md: 4 }}
          gap={1}
          color="#ffd43b"
          fontSize={{ base: "sm", md: "md" }}
        >
          <Star size={16} fill="currentColor" />
          <Text color="#dce2f0">{score}</Text>
        </HStack>
      )}
    </Box>
  );
};

export default SearchResultItem;
