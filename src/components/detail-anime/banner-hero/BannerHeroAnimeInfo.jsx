import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Bookmark, Play, Star } from "lucide-react";
import { useState } from "react";

const getTitle = (data, fallback) => data?.title?.romaji || decodeURI(fallback);

/**
 * Banner hero info section containing title, rating, stats, description, genres, and actions.
 * @param {Object} props
 * @param {Object} props.data
 * @param {String} props.animeName
 * @param {Function} props.onWatch
 */
const BannerHeroAnimeInfo = ({ data, animeName, onWatch }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(true);

  const handleToggle = () => {
    if (isExpanded) {
      setIsExpanded(false);
      setTimeout(() => setIsClamped(true), 350);
    } else {
      setIsClamped(false);
      setIsExpanded(true);
    }
  };

  const title = getTitle(data, animeName);
  const genres = data?.genres?.slice(0, 5) || [];

  return (
    <Stack
      gap={4}
      w="full"
      maxW={{ base: "300px", md: "680px" }}
      minW={0}
      align={{ base: "center", md: "flex-start" }}
    >
      <Stack gap={2} w="full" textAlign={{ base: "center", md: "left" }}>
        <Heading
          as="h1"
          fontSize={{ base: "3xl", md: "5xl" }}
          lineHeight={1.05}
          maxW="full"
          overflowWrap="anywhere"
        >
          {title}
        </Heading>

        <Stack
          direction={{ base: "column", md: "row" }}
          gap={3}
          color="gray.200"
          align={{ base: "center", md: "flex-start" }}
          maxW="full"
        >
          {data?.averageScore && (
            <HStack gap={1} color="#ffd166">
              <Star size={18} fill="currentColor" />
              <Text fontWeight="bold">{data.averageScore}</Text>
            </HStack>
          )}

          {data?.releaseDate && <Text>{data.releaseDate}</Text>}

          {data?.totalEpisodes && <Text>{data.totalEpisodes} Episodes</Text>}

          {data?.type && <Text>{data.type}</Text>}
        </Stack>
      </Stack>

      <Stack
        direction={{ base: "column", md: "row" }}
        gap={5}
        color="gray.300"
        fontSize="sm"
        align={{ base: "center", md: "flex-start" }}
        textAlign={{ base: "center", md: "left" }}
        maxW="full"
      >
        {data?.status && <Text>Status {data.status}</Text>}
        {data?.season && <Text>Season {data.season}</Text>}
        {data?.studios?.length > 0 && (
          <Text>Studio {data.studios.join(", ")}</Text>
        )}
      </Stack>

      <Stack gap={1} align={{ base: "center", md: "flex-start" }} w="full">
        <Box
          overflow="hidden"
          transition="max-height 0.4s ease-in-out"
          maxH={isExpanded ? "1000px" : "96px"}
          w="full"
        >
          <Text
            color="gray.200"
            lineClamp={isClamped ? 4 : "none"}
            maxW="full"
            textAlign={{ base: "center", md: "left" }}
            overflowWrap="anywhere"
          >
            {data?.description}
          </Text>
        </Box>
        {data?.description && data.description.length > 200 && (
          <Button
            variant="plain"
            size="sm"
            color="#ff5f92"
            onClick={handleToggle}
            _hover={{ bg: "transparent", color: "#ff84ab" }}
            p={0}
            h="auto"
            fontWeight="bold"
            cursor="pointer"
          >
            {isExpanded ? "Show less" : "Read more"}
          </Button>
        )}
      </Stack>

      <HStack
        gap={2}
        wrap="wrap"
        justify={{ base: "center", md: "flex-start" }}
        maxW="full"
      >
        {genres.map((genre) => (
          <Badge
            key={genre}
            px={3}
            py={1}
            borderRadius="full"
            bg="rgba(255,255,255,0.09)"
            color="gray.100"
            border="1px solid rgba(255,255,255,0.13)"
          >
            {genre}
          </Badge>
        ))}
      </HStack>

      <HStack
        gap={3}
        pt={2}
        wrap="wrap"
        justify={{ base: "center", md: "flex-start" }}
        maxW="full"
      >
        <Button
          onClick={onWatch}
          disabled={!data?.episodes?.length}
          bg="#ff6d8f"
          color="white"
          borderRadius="12px"
          px={7}
          _hover={{ bg: "#ff7fa0" }}
        >
          <Play size={18} fill="currentColor" />
          Watch Now
        </Button>

        <Button
          variant="outline"
          borderRadius="12px"
          color="white"
          borderColor="rgba(255,109,143,0.5)"
        >
          <Bookmark size={18} />
          Bookmark
        </Button>
      </HStack>
    </Stack>
  );
};

export default BannerHeroAnimeInfo;
