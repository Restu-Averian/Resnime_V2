import {
  Box,
  Container,
  Flex,
  Grid,
  HStack,
  Skeleton,
  Stack,
} from "@chakra-ui/react";

function AnimeDetailsSkeleton() {
  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: "28", md: "12" }}>
      <Box borderBottom="1px solid" borderColor="border.subtle">
        <Flex
          maxW="1440px"
          mx="auto"
          px={{ base: "4", md: "8", xl: "12" }}
          py={{ base: "8", md: "14" }}
          gap={{ base: "7", md: "10", xl: "14" }}
          direction={{ base: "column", md: "row" }}
        >
          <Skeleton
            w={{ base: "190px", md: "250px", xl: "292px" }}
            aspectRatio="2 / 3"
            borderRadius="media"
          />

          <Stack flex="1" gap="5" py={{ base: "0", md: "6" }}>
            <Skeleton h="68px" maxW="680px" />
            <Skeleton h="20px" maxW="460px" />
            <Skeleton h="20px" maxW="360px" />
            <Stack gap="2" maxW="700px">
              <Skeleton h="18px" />
              <Skeleton h="18px" />
              <Skeleton h="18px" w="70%" />
            </Stack>
            <HStack gap="3">
              <Skeleton h="52px" w="160px" />
              <Skeleton h="52px" w="160px" />
            </HStack>
          </Stack>
        </Flex>
      </Box>

      <Container maxW="1440px" px={{ base: "4", md: "8", xl: "12" }} py="10">
        <Stack gap="10">
          <Grid
            templateColumns={{ base: "1fr", lg: "minmax(0, 1fr) 360px" }}
            gap="6"
          >
            <Skeleton h="260px" borderRadius="panel" />
            <Skeleton h="260px" borderRadius="panel" />
          </Grid>

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
        </Stack>
      </Container>
    </Box>
  );
}

export default AnimeDetailsSkeleton;
