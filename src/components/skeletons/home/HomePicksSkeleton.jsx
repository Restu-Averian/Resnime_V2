import { Box, Flex, HStack, SimpleGrid, Skeleton, Stack, useBreakpointValue } from "@chakra-ui/react";
import { Sparkles, Star } from "lucide-react";
import HomeSectionHeader from "../../home/HomeSectionHeader";

function HomePicksSkeleton() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Stack as="section" gap="3">
      <HomeSectionHeader icon={Sparkles} title="Tonight’s Picks" />

      {isMobile ? (
        <HStack gap="4" overflowX="hidden" pb="2">
          {[1, 2].map((i) => (
            <Flex
              key={i}
              layerStyle="interactiveSurface"
              direction="column"
              overflow="hidden"
              w="150px"
              h="214px"
              align="stretch"
              boxShadow="media"
            >
              <Box flex="0 0 130px" w="100%" overflow="hidden">
                <Skeleton w="100%" h="100%" />
              </Box>
              <Flex direction="column" justify="space-between" gap="2" px="3" py="3" flex="1">
                <Stack gap="2">
                  <Skeleton h="14px" w="100%" borderRadius="sm" />
                  <Skeleton h="14px" w="70%" borderRadius="sm" />
                </Stack>
                <HStack gap="1.5">
                  <Star size={12} color="var(--chakra-colors-fg-muted)" />
                  <Skeleton h="10px" w="20px" borderRadius="sm" />
                  <Skeleton h="10px" w="20px" borderRadius="sm" />
                </HStack>
              </Flex>
            </Flex>
          ))}
        </HStack>
      ) : (
        <SimpleGrid columns={{ md: 2, xl: 4 }} gap="4">
          {[1, 2, 3, 4].map((i) => (
            <Flex
              key={i}
              layerStyle="interactiveSurface"
              direction="row"
              overflow="hidden"
              h={{ base: "168px", md: "160px", xl: "168px" }}
              align="stretch"
              boxShadow="media"
            >
              <Box flex="0 0 54%" maxW="220px" minW="150px" overflow="hidden">
                <Skeleton w="100%" h="100%" />
              </Box>
              <Flex direction="column" justify="center" gap="6" px="5" py="4" flex="1">
                <Stack gap="3">
                  <Skeleton h="16px" w="100%" borderRadius="sm" />
                  <Skeleton h="16px" w="70%" borderRadius="sm" />
                </Stack>
                <HStack gap="1.5">
                  <Star size={16} color="var(--chakra-colors-fg-muted)" />
                  <Skeleton h="12px" w="30px" borderRadius="sm" />
                  <Skeleton h="12px" w="30px" borderRadius="sm" />
                </HStack>
              </Flex>
            </Flex>
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
}

export default HomePicksSkeleton;
