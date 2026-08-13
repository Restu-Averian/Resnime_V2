import { Box, Container, HStack, SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";

function AnimeStreamingSkeleton() {
  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: "28", md: "12" }}>
      <Container maxW="1440px" px={{ base: "4", md: "8", xl: "12" }} py="7">
        <Stack gap="6">
          <Stack gap="3">
            <Skeleton h="22px" w="190px" />
            <Skeleton h="54px" maxW="620px" />
            <Skeleton h="22px" w="140px" />
          </Stack>

          <Skeleton aspectRatio="16 / 9" borderRadius="media" />
          <Skeleton h="74px" />
          <HStack justify="center">
            <Skeleton h="36px" w="90px" />
            <Skeleton h="36px" w="116px" />
            <Skeleton h="36px" w="116px" />
          </HStack>
          <Skeleton h="1px" />
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 6 }} gap="4">
            {Array.from({ length: 12 }).map((_, index) => (
              <Skeleton key={index} h="158px" borderRadius="control" />
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}

export default AnimeStreamingSkeleton;
