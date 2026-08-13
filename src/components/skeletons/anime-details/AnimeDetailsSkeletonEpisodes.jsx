import { HStack, Skeleton, Stack } from "@chakra-ui/react";

function AnimeDetailsSkeletonEpisodes() {
  return (
    <Stack gap="4">
      <Skeleton h="30px" w="160px" />
      <HStack gap="4" overflow="hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            h="185px"
            flex="0 0 214px"
            borderRadius="control"
          />
        ))}
      </HStack>
    </Stack>
  );
}

export default AnimeDetailsSkeletonEpisodes;
