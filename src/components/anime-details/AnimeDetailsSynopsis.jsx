import { Box, Stack, Text } from "@chakra-ui/react";

function AnimeDetailsSynopsis({ synopsis }) {
  return (
    <Box as="section" layerStyle="panel" p={{ base: "5", md: "7" }}>
      <Stack gap="4">
        <Text as="h2" textStyle="sectionTitle" color="fg.heading">
          Synopsis
        </Text>
        <Text
          color="fg.default"
          lineHeight="1.9"
          whiteSpace="pre-line"
          fontSize={{ base: "md", md: "lg" }}
        >
          {synopsis || "No synopsis available."}
        </Text>
      </Stack>
    </Box>
  );
}

export default AnimeDetailsSynopsis;
