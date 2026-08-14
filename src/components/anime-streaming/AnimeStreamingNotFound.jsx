import { Button, Center, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function AnimeStreamingNotFound() {
  return (
    <Center minH="70vh" bg="bg.canvas" px="4">
      <Stack layerStyle="panel" p="7" gap="5" align="center">
        <Text as="h1" textStyle="sectionTitle" color="fg.heading">
          Episode not found
        </Text>
        <Text color="fg.muted">
          MAL ID and episode number must be positive numbers.
        </Text>
        <Button as={RouterLink} to="/anime">
          Back to Anime List
        </Button>
      </Stack>
    </Center>
  );
}

export default AnimeStreamingNotFound;
