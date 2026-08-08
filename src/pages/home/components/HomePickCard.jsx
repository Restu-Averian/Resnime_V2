import { Star } from "lucide-react";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";

function HomePickCard({ pick, imageUrl, variant = "default" }) {
  const isMobile = variant === "mobile";

  return (
    <Flex
      layerStyle="interactiveSurface"
      direction={isMobile ? "column" : "row"}
      overflow="hidden"
      w={isMobile ? "212px" : "auto"}
      h={isMobile ? "330px" : { base: "168px", md: "160px", xl: "168px" }}
      align="stretch"
      boxShadow="media"
    >
      <Box
        flex={isMobile ? "0 0 178px" : "0 0 54%"}
        maxW={isMobile ? "none" : "220px"}
        minW={isMobile ? "0" : "150px"}
        overflow="hidden"
      >
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

      <Flex
        direction="column"
        justify={isMobile ? "space-between" : "center"}
        gap={isMobile ? "3" : "6"}
        px={isMobile ? "5" : "5"}
        py={isMobile ? "4" : "4"}
        minW="0"
        flex="1"
      >
        <Text
          textStyle="cardTitle"
          color="fg.heading"
          fontSize={isMobile ? "2xl" : { base: "lg", xl: "xl" }}
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
