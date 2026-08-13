import { Star } from "lucide-react";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function HomePickCardItem({ pick, variant = "desktop" }) {
  const isMobile = variant === "mobile";
  const navigate = useNavigate();

  return (
    <Flex
      layerStyle="interactiveSurface"
      direction={isMobile ? "column" : "row"}
      overflow="hidden"
      w={isMobile ? "150px" : "auto"}
      h={isMobile ? "214px" : { base: "168px", md: "160px", xl: "168px" }}
      align="stretch"
      boxShadow="media"
      cursor="pointer"
      onClick={() => navigate(`/anime/${pick?.id}`)}
      transition="transform 0.2s ease, box-shadow 0.2s ease"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "mediaHover",
      }}
    >
      <Box
        flex={isMobile ? "0 0 130px" : "0 0 54%"}
        maxW={isMobile ? "none" : "220px"}
        minW={isMobile ? "0" : "150px"}
        overflow="hidden"
      >
        <Image
          src={pick?.photo}
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
        gap={isMobile ? "2" : "6"}
        px={isMobile ? "3" : "5"}
        py={isMobile ? "3" : "4"}
        minW="0"
        flex="1"
      >
        <Text
          textStyle="cardTitle"
          color="fg.heading"
          fontSize={isMobile ? "sm" : { base: "md", lg: "lg", xl: "xl" }}
          noOfLines={2}
          lineHeight="1.3"
        >
          {pick?.title_en}
        </Text>

        <HStack
          gap="1.5"
          color="fg.muted"
          fontSize={isMobile ? "xs" : { base: "xs", xl: "sm" }}
        >
          <Star
            size={isMobile ? 12 : 16}
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

export default HomePickCardItem;
