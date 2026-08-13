import { Box, Flex, HStack, Skeleton, SkeletonText } from "@chakra-ui/react";

function AnimeListDatasItemSkeleton() {
  return (
    <Box
      as="article"
      layerStyle="interactiveSurface"
      overflow="hidden"
      boxShadow="media"
      borderColor="border.subtle"
    >
      <Box aspectRatio="1.55" overflow="hidden">
        <Skeleton w="full" h="full" />
      </Box>

      <Flex
        direction="column"
        justify="center"
        minH="92px"
        gap="3"
        px="4"
        py="4"
      >
        <SkeletonText noOfLines={1} skeletonHeight="5" width="80%" />

        <HStack gap="2">
          <Skeleton height="3" width="6" />
          <Skeleton height="3" width="2" />
          <Skeleton height="3" width="10" />
        </HStack>
      </Flex>
    </Box>
  );
}

export default AnimeListDatasItemSkeleton;
