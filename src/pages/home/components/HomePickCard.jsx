import { Star } from "lucide-react";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";

function HomePickCard({ pick, imageUrl }) {
  return (
    <Flex
      layerStyle="interactiveSurface"
      overflow="hidden"
      h={{ base: "168px", md: "160px", xl: "168px" }}
      align="stretch"
      boxShadow="media"
    >
      <Box flex="0 0 54%" maxW="220px" minW="150px" overflow="hidden">
        <Image
          src={imageUrl}
          alt=""
          w="100%"
          h="100%"
          objectFit="cover"
          objectPosition="center top"
          filter="saturate(0.92) contrast(1.05)"
        />
      </Box>

      <Flex direction="column" justify="center" gap="6" px="5" py="4" minW="0">
        <Text
          textStyle="cardTitle"
          color="fg.heading"
          fontSize={{ base: "lg", xl: "xl" }}
          noOfLines={2}
        >
          {pick.title}
        </Text>

        <HStack gap="2" color="fg.muted" fontSize="sm">
          <Star
            size={16}
            fill="var(--resnime-colors-rating-default)"
            color="var(--resnime-colors-rating-default)"
            strokeWidth={1.3}
          />
          <Text>{pick.rating}</Text>
          <Text color="accent.warmMuted">•</Text>
          <Text>{pick.type}</Text>
        </HStack>
      </Flex>
    </Flex>
  );
}

export default HomePickCard;
