import { Box, HStack, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";

const SearchResultSkeleton = () => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        base: "96px minmax(0, 1fr)",
        sm: "132px minmax(0, 1fr)",
      }}
      gap={{ base: 3, md: 5 }}
      p={{ base: 3, md: 3 }}
      minH={{ base: "150px", md: "188px" }}
      borderRadius="9px"
      border="1px solid rgba(165, 183, 226, 0.16)"
      bg="linear-gradient(145deg, rgba(20, 27, 50, 0.88), rgba(13, 20, 39, 0.94))"
      boxShadow="inset 0 1px 0 rgba(255,255,255,0.03), 0 14px 35px rgba(0,0,0,0.12)"
      overflow="hidden"
      position="relative"
    >
      <Skeleton
        w={{ base: "96px", sm: "132px" }}
        h={{ base: "124px", sm: "172px" }}
        borderRadius="8px"
        startColor="rgba(255,255,255,0.04)"
        endColor="rgba(255,255,255,0.08)"
      />

      <Stack gap={{ base: 2, md: 2.5 }} minW={0} pr={{ base: 0, sm: 14 }}>
        <Skeleton
          h="22px"
          w="40px"
          borderRadius="7px"
          startColor="rgba(255,255,255,0.04)"
          endColor="rgba(255,255,255,0.08)"
        />

        <SkeletonText
          noOfLines={1}
          skeletonHeight={{ base: "16px", md: "18px" }}
          w="80%"
          startColor="rgba(255,255,255,0.04)"
          endColor="rgba(255,255,255,0.08)"
        />

        <SkeletonText
          noOfLines={2}
          spacing="2"
          skeletonHeight="14px"
          startColor="rgba(255,255,255,0.04)"
          endColor="rgba(255,255,255,0.08)"
        />

        <HStack gap={2} flexWrap="wrap">
          <Skeleton h="24px" w="60px" borderRadius="999px" startColor="rgba(255,255,255,0.04)" endColor="rgba(255,255,255,0.08)" />
          <Skeleton h="24px" w="70px" borderRadius="999px" startColor="rgba(255,255,255,0.04)" endColor="rgba(255,255,255,0.08)" />
          <Skeleton h="24px" w="50px" borderRadius="999px" startColor="rgba(255,255,255,0.04)" endColor="rgba(255,255,255,0.08)" />
        </HStack>

        <HStack gap={2.5} mt="auto">
          <Skeleton h="16px" w="40px" startColor="rgba(255,255,255,0.04)" endColor="rgba(255,255,255,0.08)" />
          <Skeleton h="16px" w="40px" startColor="rgba(255,255,255,0.04)" endColor="rgba(255,255,255,0.08)" />
        </HStack>
      </Stack>

      <Skeleton
        position="absolute"
        top={{ base: 3, md: 5 }}
        right={{ base: 3, md: 4 }}
        h="20px"
        w="40px"
        startColor="rgba(255,255,255,0.04)"
        endColor="rgba(255,255,255,0.08)"
      />
    </Box>
  );
};

export default SearchResultSkeleton;
