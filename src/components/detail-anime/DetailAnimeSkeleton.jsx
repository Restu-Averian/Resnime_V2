import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

const DetailAnimeSkeleton = () => {
  return (
    <Stack direction="column" gap={7} maxW="1680px" mx="auto" w="100%">
      {/* Banner Hero Skeleton */}
      <Box
        minH={{ base: "680px", md: "500px" }}
        borderRadius="16px"
        overflow="hidden"
        border="1px solid rgba(255,255,255,0.12)"
        bg="rgba(13, 20, 39, 0.6)"
        boxShadow="0 24px 80px rgba(0,0,0,0.38)"
        position="relative"
      >
        <Flex
          minH={{ base: "680px", md: "500px" }}
          align="center"
          gap={{ base: 6, lg: 9 }}
          direction={{ base: "column", md: "row" }}
          px={{ base: 5, md: 10, xl: 14 }}
          py={{ base: 8, md: 10 }}
        >
          <Skeleton
            w={{ base: "210px", md: "240px" }}
            h={{ base: "315px", md: "360px" }}
            aspectRatio="2 / 3"
            borderRadius="16px"
            startColor="rgba(255,255,255,0.04)"
            endColor="rgba(255,255,255,0.08)"
          />

          <Stack
            gap={4}
            flex={1}
            w="100%"
            align={{ base: "center", md: "flex-start" }}
          >
            <HStack gap={2}>
              <Skeleton
                h="24px"
                w="70px"
                borderRadius="full"
                startColor="rgba(255,255,255,0.04)"
                endColor="rgba(255,255,255,0.08)"
              />
              <Skeleton
                h="24px"
                w="90px"
                borderRadius="full"
                startColor="rgba(255,255,255,0.04)"
                endColor="rgba(255,255,255,0.08)"
              />
            </HStack>

            <Skeleton
              h={{ base: "32px", md: "48px" }}
              w={{ base: "80%", md: "60%" }}
              borderRadius="8px"
              startColor="rgba(255,255,255,0.04)"
              endColor="rgba(255,255,255,0.08)"
            />

            <SkeletonText
              noOfLines={3}
              spacing="3"
              skeletonHeight="16px"
              w="100%"
              startColor="rgba(255,255,255,0.04)"
              endColor="rgba(255,255,255,0.08)"
            />

            <HStack gap={3} pt={2}>
              <Skeleton
                h="44px"
                w="140px"
                borderRadius="12px"
                startColor="rgba(255,255,255,0.04)"
                endColor="rgba(255,255,255,0.08)"
              />
            </HStack>
          </Stack>
        </Flex>
      </Box>

      {/* Tabs Header Skeleton */}
      <Box>
        <Flex
          align="center"
          justify="space-between"
          borderBottom="1px solid rgba(255,255,255,0.1)"
          mb={5}
          pb={2}
        >
          <HStack gap={{ base: 2, md: 5 }}>
            <Skeleton
              h="36px"
              w="100px"
              borderRadius="6px"
              startColor="rgba(255,255,255,0.04)"
              endColor="rgba(255,255,255,0.08)"
            />
            <Skeleton
              h="36px"
              w="100px"
              borderRadius="6px"
              startColor="rgba(255,255,255,0.04)"
              endColor="rgba(255,255,255,0.08)"
            />
            <Skeleton
              h="36px"
              w="100px"
              borderRadius="6px"
              startColor="rgba(255,255,255,0.04)"
              endColor="rgba(255,255,255,0.08)"
            />
          </HStack>
        </Flex>

        {/* Episode Cards Grid Skeleton */}
        <SimpleGrid
          columns={{ base: 2, lg: 3, xl: 4, "2xl": 6 }}
          gap={{ base: 4, md: 5 }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              key={i}
              minH={{ base: "128px", md: "146px" }}
              borderRadius="10px"
              startColor="rgba(255,255,255,0.04)"
              endColor="rgba(255,255,255,0.08)"
            />
          ))}
        </SimpleGrid>
      </Box>
    </Stack>
  );
};

export default DetailAnimeSkeleton;
