import { Box, HStack, Skeleton, Stack } from "@chakra-ui/react";

function HomeHeroBannerSkeleton() {
  return (
    <Box
      as="section"
      layerStyle="panel"
      minH={{ base: "280px", md: "420px", lg: "340px" }}
      overflow="hidden"
      position="relative"
      boxShadow="panel"
    >
      <Stack
        align="flex-start"
        gap={{ base: "0", md: "5" }}
        justify={{ base: "flex-start", md: "center" }}
        minH={{ base: "280px", md: "420px", lg: "340px" }}
        px={{ base: "5", md: "12" }}
        py={{ base: "6", md: "12" }}
      >
        <Stack gap="1" w="full">
          <Skeleton
            h={{ base: "32px", sm: "40px", md: "56px" }}
            maxW={{ base: "80%", md: "45%" }}
            borderRadius="md"
          />
          <HStack gap="3" mt="2">
            <Skeleton h="16px" w="100px" borderRadius="sm" />
            <Skeleton h="16px" w="60px" borderRadius="sm" />
            <Skeleton h="16px" w="80px" borderRadius="sm" />
          </HStack>
        </Stack>

        <Box w="50px" h="1px" bg="whiteAlpha.200" my="3" />

        <Stack gap="2" w="full" mb={5} maxW={{ base: "80%", md: "45%" }}>
          <Skeleton h="16px" w="100%" borderRadius="sm" />
          <Skeleton h="16px" w="80%" borderRadius="sm" />
        </Stack>

        <Skeleton h={{ base: "32px", md: "40px" }} w="120px" borderRadius="md" />
      </Stack>
    </Box>
  );
}

export default HomeHeroBannerSkeleton;
