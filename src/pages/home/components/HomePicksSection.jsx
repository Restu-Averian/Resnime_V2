import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Box, Flex, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import HomePickCard from "./HomePickCard";
import SectionHeader from "./global/SectionHeader";

function HomePicksSection({ picks, imageUrl }) {
  return (
    <Stack as="section" gap="3">
      <SectionHeader icon={Sparkles} title="Tonight’s Picks" />

      <SimpleGrid
        display={{ base: "none", md: "grid" }}
        columns={{ md: 2, xl: 4 }}
        gap="4"
      >
        {picks.map((pick) => (
          <HomePickCard key={pick.title} pick={pick} imageUrl={imageUrl} />
        ))}
      </SimpleGrid>

      <Box
        display={{ base: "block", md: "none" }}
        overflowX="auto"
        pb="1"
        css={{
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <HStack align="stretch" gap="4" w="max-content" pr="4">
          {picks.map((pick) => (
            <HomePickCard
              key={pick.title}
              pick={pick}
              imageUrl={imageUrl}
              variant="mobile"
            />
          ))}
        </HStack>
      </Box>

      <Stack
        display={{ base: "flex", md: "none" }}
        align="center"
        gap="3"
        pt="2"
      >
        <HStack gap="4">
          {picks.map((pick, index) => (
            <Box
              key={pick.title}
              w="2"
              h="2"
              borderRadius="999px"
              bg={index === 0 ? "accent.primary" : "fg.subtle"}
            />
          ))}
        </HStack>

        <Flex align="center" justify="center" gap="6" color="fg.muted">
          <ArrowLeft size={21} strokeWidth={1.4} />
          <Text fontSize="md">Swipe to explore</Text>
          <ArrowRight size={21} strokeWidth={1.4} />
        </Flex>
      </Stack>
    </Stack>
  );
}

export default HomePicksSection;
