import { Box, HStack, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";

const RecentCardSkeleton = () => (
  <Box
    display="grid"
    gridTemplateColumns="112px 1fr"
    gap={4}
    p={3}
    minH="132px"
    borderRadius="10px"
    border="1px solid rgba(255,255,255,0.1)"
    bg="rgba(255,255,255,0.045)"
  >
    <Skeleton
      w="112px"
      h="108px"
      borderRadius="8px"
      startColor="rgba(255,255,255,0.04)"
      endColor="rgba(255,255,255,0.08)"
    />
    <Stack gap={2} minW={0}>
      <HStack gap={2} justify="space-between" align="start">
        <Skeleton
          w="40px"
          h="20px"
          borderRadius="8px"
          startColor="rgba(255,255,255,0.04)"
          endColor="rgba(255,255,255,0.08)"
        />
        <Skeleton
          w="40px"
          h="20px"
          startColor="rgba(255,255,255,0.04)"
          endColor="rgba(255,255,255,0.08)"
        />
      </HStack>
      <SkeletonText
        noOfLines={2}
        spacing="2"
        skeletonHeight="16px"
        mt={1}
        startColor="rgba(255,255,255,0.04)"
        endColor="rgba(255,255,255,0.08)"
      />
      <Skeleton
        w="70%"
        h="14px"
        mt="auto"
        startColor="rgba(255,255,255,0.04)"
        endColor="rgba(255,255,255,0.08)"
      />
    </Stack>
  </Box>
);

export default RecentCardSkeleton;
