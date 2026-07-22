import { Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { Sparkles } from "lucide-react";

/**
 * Header section for anime overview tab.
 */
const OverviewAnimeHeader = () => {
  return (
    <Stack gap={1}>
      <HStack gap={2}>
        <Sparkles size={20} color="#ff6d8f" fill="rgba(255,109,143,0.28)" />
        <Heading
          as="h2"
          fontSize={{ base: "2xl", md: "3xl" }}
          lineHeight={1.1}
        >
          Overview
        </Heading>
      </HStack>
      <Text color="gray.400" fontSize={{ base: "sm", md: "md" }}>
        Learn more about the story, world, and production.
      </Text>
    </Stack>
  );
};

export default OverviewAnimeHeader;
