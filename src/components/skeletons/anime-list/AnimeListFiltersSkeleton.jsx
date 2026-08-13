import { SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";

function AnimeListFiltersSkeleton() {
  return (
    <Stack gap="4">
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 5 }} gap="3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} h="40px" w="100%" borderRadius="md" />
        ))}
      </SimpleGrid>
      <Skeleton h="24px" w="120px" borderRadius="md" />
    </Stack>
  );
}

export default AnimeListFiltersSkeleton;
