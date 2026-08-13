import { Flex, HStack, Skeleton } from "@chakra-ui/react";

function AnimeListPaginationSkeleton() {
  return (
    <Flex
      align={{ base: "flex-start", md: "center" }}
      justify="space-between"
      direction={{ base: "column", md: "row" }}
      gap="4"
      pt="1"
    >
      <Skeleton height="5" width="200px" />

      <HStack gap="2">
        <Skeleton height="8" width="90px" borderRadius="md" />
        <Skeleton height="8" width="38px" borderRadius="md" />
        <Skeleton height="8" width="38px" borderRadius="md" />
        <Skeleton height="8" width="38px" borderRadius="md" />
        <Skeleton height="8" width="80px" borderRadius="md" />
      </HStack>
    </Flex>
  );
}

export default AnimeListPaginationSkeleton;
