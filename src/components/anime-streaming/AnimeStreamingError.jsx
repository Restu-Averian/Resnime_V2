import { Button, Center, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";

function AnimeStreamingError({ error }) {
  const { mal_id: malId } = useParams();
  const errorCode = error?.response?.data?.error?.code;
  const backPath =
    errorCode === "ANIME_NOT_FOUND" ? "/anime" : `/anime/${malId}`;

  return (
    <Center minH="70vh" bg="bg.canvas" px="4">
      <Stack layerStyle="panel" p="7" gap="5" align="center" maxW="480px">
        <Text as="h1" textStyle="sectionTitle" color="fg.heading">
          Failed to load episode
        </Text>
        <Text color="fg.muted" textAlign="center">
          {error?.response?.data?.error?.message ||
            "Failed to load streaming episode."}
        </Text>
        <Button as={RouterLink} to={backPath}>
          Go back
        </Button>
      </Stack>
    </Center>
  );
}

export default AnimeStreamingError;
