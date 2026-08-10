import { Heading, Stack, Text } from "@chakra-ui/react";

function AnimeListHeader() {
  return (
    <Stack gap="3">
      <Heading
        as="h1"
        textStyle="display"
        color="fg.heading"
        fontSize={{ base: "4xl", md: "6xl" }}
      >
        Anime List
      </Heading>
      <Stack
        gap="1"
        color="fg.muted"
        fontSize={{ base: "sm", md: "md" }}
        lineHeight="1.65"
      >
        <Text>Explore every anime available in Resnime.</Text>
        <Text>Find something familiar or discover something new.</Text>
      </Stack>
    </Stack>
  );
}

export default AnimeListHeader;
