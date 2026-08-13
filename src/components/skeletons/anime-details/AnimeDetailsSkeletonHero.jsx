import { Box, Flex, HStack, Skeleton, Stack } from "@chakra-ui/react";

function AnimeDetailsSkeletonHero() {
  return (
    <Box borderBottom="1px solid" borderColor="border.subtle">
      <Flex
        maxW="1440px"
        mx="auto"
        px={{ base: "4", md: "8", xl: "12" }}
        py={{ base: "8", md: "14" }}
        gap={{ base: "7", md: "10", xl: "14" }}
        direction={{ base: "column", md: "row" }}
      >
        <Skeleton
          w={{ base: "190px", md: "250px", xl: "292px" }}
          aspectRatio="2 / 3"
          borderRadius="media"
        />

        <Stack flex="1" gap="5" py={{ base: "0", md: "6" }}>
          <Skeleton h="68px" maxW="680px" />
          <Skeleton h="20px" maxW="460px" />
          <Skeleton h="20px" maxW="360px" />
          <Stack gap="2" maxW="700px">
            <Skeleton h="18px" />
            <Skeleton h="18px" />
            <Skeleton h="18px" w="70%" />
          </Stack>
          <HStack gap="3">
            <Skeleton h="52px" w="160px" />
            <Skeleton h="52px" w="160px" />
          </HStack>
        </Stack>
      </Flex>
    </Box>
  );
}

export default AnimeDetailsSkeletonHero;
