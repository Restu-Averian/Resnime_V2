import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  IconButton,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Info,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { compactText, animePath } from "./utils";

const HeroBanner = ({ anime, loading }) => {
  const genres = anime?.genres?.slice(0, 4) || [];

  if (loading) {
    return <Skeleton h={{ base: "420px", md: "340px" }} borderRadius="14px" />;
  }

  if (!anime) return null;

  return (
    <Box
      w="full"
      maxW="100%"
      minH={{ base: "420px", md: "340px" }}
      borderRadius="14px"
      overflow="hidden"
      border="1px solid rgba(255,255,255,0.12)"
      bgImage={`linear-gradient(90deg, rgba(9, 13, 30, 0.98) 0%, rgba(14, 16, 38, 0.88) 36%, rgba(14, 16, 38, 0.32) 100%), url(${anime.cover || anime.image})`}
      bgSize="cover"
      bgPos="center"
      boxShadow="0 24px 80px rgba(0,0,0,0.35)"
      position="relative"
    >
      <IconButton
        aria-label="Previous featured anime"
        position="absolute"
        left={4}
        top="50%"
        transform="translateY(-50%)"
        display={{ base: "none", md: "inline-flex" }}
        borderRadius="full"
        bg="rgba(255,255,255,0.12)"
        color="white"
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        aria-label="Next featured anime"
        position="absolute"
        right={4}
        top="50%"
        transform="translateY(-50%)"
        display={{ base: "none", md: "inline-flex" }}
        borderRadius="full"
        bg="rgba(255,255,255,0.12)"
        color="white"
      >
        <ChevronRight />
      </IconButton>

      <Stack
        w="full"
        maxW={{ base: "calc(100vw - 80px)", md: "620px" }}
        h="full"
        minH={{ base: "420px", md: "340px" }}
        justify="center"
        gap={4}
        px={{ base: 6, md: 24 }}
        py={8}
      >
        <Badge
          w="fit-content"
          px={3}
          py={1}
          borderRadius="full"
          color="#ffb3c4"
          bg="rgba(255,109,143,0.2)"
          border="1px solid rgba(255,109,143,0.36)"
        >
          <HStack gap={1}>
            <Icon as={Sparkles} boxSize={3.5} />
            <Text>Featured</Text>
          </HStack>
        </Badge>
        <Heading
          as="h1"
          fontSize={{ base: "2xl", md: "4xl" }}
          lineHeight={1.08}
          w="full"
          maxW={{ base: "310px", md: "100%" }}
          overflowWrap="break-word"
        >
          {anime.title.romaji}
        </Heading>
        <Text
          color="gray.200"
          fontSize={{ base: "sm", md: "md" }}
          w="full"
          maxW={{ base: "310px", md: "100%" }}
          overflowWrap="break-word"
        >
          {compactText(anime.description, 210) ||
            "Latest anime update on Resnime."}
        </Text>
        <HStack gap={2} wrap="wrap">
          {genres.map((genre) => (
            <Badge
              key={genre}
              px={3}
              py={1}
              borderRadius="full"
              bg="rgba(255,255,255,0.08)"
              color="gray.100"
              border="1px solid rgba(255,255,255,0.14)"
            >
              {genre}
            </Badge>
          ))}
        </HStack>
        <HStack gap={3} pt={2} wrap="wrap">
          <Button
            as={Link}
            to={animePath(anime)}
            bg="#ff6d8f"
            color="white"
            borderRadius="14px"
            px={6}
            _hover={{ bg: "#ff7fa0" }}
          >
            <PlayCircle size={18} />
            Watch Now
          </Button>
          <Button
            as={Link}
            to={animePath(anime)}
            variant="outline"
            borderRadius="14px"
            color="white"
            borderColor="rgba(255,255,255,0.26)"
          >
            <Info size={18} />
            More Info
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
};

export default HeroBanner;
