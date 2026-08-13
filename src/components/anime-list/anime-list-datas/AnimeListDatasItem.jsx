import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { Star } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

function AnimeListDatasItem({ anime }) {
  return (
    <Box
      as={RouterLink}
      to={`/anime/${anime.id}`}
      display="block"
      w="full"
      textAlign="left"
      layerStyle="interactiveSurface"
      overflow="hidden"
      boxShadow="media"
      cursor="pointer"
    >
      <Box aspectRatio="1.2" overflow="hidden">
        <Image
          src={anime.photo}
          alt={anime.title_en}
          w="full"
          h="full"
          objectFit="cover"
          objectPosition="center"
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
          lineClamp="2"
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

export default AnimeListDatasItem;
