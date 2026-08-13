import { HStack, Skeleton, Stack } from "@chakra-ui/react";

function AnimeDetailsSkeletonCharacters() {
  return (
    <Stack gap="4">
      <Skeleton h="30px" w="260px" />
      <HStack gap="4" overflow="hidden">
        {Array.from({ length: 7 }).map((_, index) => (
          <Stack key={index} flex="0 0 150px" align="center" gap="3">
            <Skeleton
              w={{ base: "96px", md: "112px" }}
              h={{ base: "96px", md: "112px" }}
              borderRadius="full"
            />
            <Skeleton h="18px" w="120px" />
            <Skeleton h="16px" w="92px" />
          </Stack>
        ))}
      </HStack>
    </Stack>
  );
}

export default AnimeDetailsSkeletonCharacters;
