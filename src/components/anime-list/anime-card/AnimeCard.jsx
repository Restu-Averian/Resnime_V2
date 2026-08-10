import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { Star } from "lucide-react";

function AnimeCard({ anime }) {
  return (
    <Box
      as="article"
      layerStyle="interactiveSurface"
      overflow="hidden"
      boxShadow="media"
      transition="transform 0.2s ease, border-color 0.2s ease"
      _hover={{
        transform: "translateY(-2px)",
        borderColor: "border.interactive",
      }}
    >
      <Box aspectRatio="1.55" overflow="hidden">
        <Image
          src={anime.photo}
          alt={anime.title_en}
          w="full"
          h="full"
          objectFit="cover"
          objectPosition="center top"
          filter="saturate(0.9) contrast(1.05)"
        />
      </Box>

      <Flex
        direction="column"
        justify="center"
        minH="92px"
        gap="3"
        px="4"
        py="4"
      >
        <Text
          textStyle="cardTitle"
          color="fg.heading"
          fontSize={{ base: "lg", xl: "xl" }}
          lineClamp="1"
        >
          {anime.title_en}
        </Text>

        <HStack gap="2" color="fg.muted" fontSize="sm">
          <Star
            size={15}
            fill="var(--resnime-colors-rating-default)"
            color="var(--resnime-colors-rating-default)"
            strokeWidth={1.4}
          />
          <Text>{anime.rating.toFixed(1)}</Text>
          <Text color="accent.warmMuted">•</Text>
          <Text>{anime.type}</Text>
        </HStack>
      </Flex>
    </Box>
  );
}

export default AnimeCard;
