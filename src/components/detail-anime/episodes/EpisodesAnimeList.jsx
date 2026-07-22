import {
  Box as ChakraBox,
  Flex,
  Heading,
  HStack,
  Icon,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PlayCircle } from "lucide-react";
import { useEpisodeAnimeContext } from "./EpisodesAnimeContextProvider";

const episodeLabel = (count) =>
  `${count} Episode${Number(count) === 1 ? "" : "s"}`;

const EpisodesAnimeList = ({ sortMode, setSortMode }) => {
  const { data, openModalVideo, episodeValParam } = useEpisodeAnimeContext();
  const episodes = data?.episodes || [];

  return (
    <ChakraBox
      border="1px solid rgba(255,255,255,0.12)"
      borderRadius="14px"
      bg="rgba(8, 13, 30, 0.72)"
      boxShadow="inset 0 1px 0 rgba(255,255,255,0.05), 0 22px 70px rgba(0,0,0,0.28)"
      px={{ base: 4, md: 7 }}
      py={{ base: 5, md: 6 }}
    >
      <Flex
        align={{ base: "flex-start", md: "center" }}
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        gap={4}
        mb={{ base: 5, md: 8 }}
      >
        <HStack gap={3}>
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }}>
            Episodes
          </Heading>
          <Text
            px={3}
            py={1}
            borderRadius="8px"
            bg="rgba(255,109,143,0.18)"
            color="#ff9ab5"
            fontSize={{ base: "sm", md: "md" }}
            lineHeight={1.2}
          >
            {episodeLabel(episodes.length)}
          </Text>
        </HStack>

        <HStack gap={3} color="gray.300">
          <Text fontSize="sm">Order:</Text>
          <Select.Root
            size="sm"
            value={[sortMode || "episode-asc"]}
            onValueChange={({ value }) => {
              setSortMode?.(value?.[0] || "episode-asc");
            }}
          >
            <Select.HiddenSelect aria-label="Order episodes" />
            <Select.Control
              minW={{ base: "160px", md: "178px" }}
              border="1px solid rgba(255,255,255,0.13)"
              borderRadius="12px"
              bg="rgba(255,255,255,0.035)"
            >
              <Select.Trigger border="0" px={4}>
                <Select.ValueText placeholder="Ascending" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Select.Positioner>
              <Select.Content bg="#08101f" borderColor="rgba(255,255,255,0.14)">
                <Select.Item item="episode-asc">
                  Ascending
                  <Select.ItemIndicator />
                </Select.Item>
                <Select.Item item="episode-desc">
                  Descending
                  <Select.ItemIndicator />
                </Select.Item>
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
        </HStack>
      </Flex>

      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 3, xl: 4, "2xl": 6 }}
        gap={{ base: 4, md: 5 }}
      >
        {episodes.map((episode) => {
          const isActive = episode?.id === episodeValParam;

          return (
            <ChakraBox
              key={episode?.id}
              as="button"
              type="button"
              cursor="pointer"
              textAlign="center"
              minH={{ base: "128px", md: "146px" }}
              display="grid"
              placeItems="center"
              border={
                isActive
                  ? "1px solid rgba(255,109,143,0.85)"
                  : "1px solid rgba(255,109,143,0.34)"
              }
              borderRadius="10px"
              overflow="hidden"
              bg={
                isActive
                  ? "linear-gradient(145deg, #ff3f73 0%, #bd1e54 100%)"
                  : "rgba(255,255,255,0.025)"
              }
              color="white"
              boxShadow={
                isActive
                  ? "0 16px 42px rgba(255,55,104,0.26), inset 0 1px 0 rgba(255,255,255,0.2)"
                  : "inset 0 1px 0 rgba(255,255,255,0.04)"
              }
              transition="180ms ease"
              _hover={{
                transform: "translateY(-2px)",
                borderColor: "rgba(255,109,143,0.85)",
                bg: "linear-gradient(145deg, #ff4d7e 0%, #ca245c 100%)",
                boxShadow:
                  "0 16px 42px rgba(255,55,104,0.26), inset 0 1px 0 rgba(255,255,255,0.2)",
                "& .episode-label": {
                  color: "white",
                },
                "& .episode-play-icon": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              }}
              _focusVisible={{
                outline: "2px solid #ff6d8f",
                outlineOffset: "3px",
              }}
              onClick={(e) => {
                openModalVideo(e, episode?.id);
              }}
            >
              <Stack gap={2} align="center">
                <Text
                  className="episode-label"
                  color={isActive ? "white" : "gray.300"}
                  fontSize={{ base: "sm", md: "md" }}
                  lineHeight={1}
                  transition="180ms ease"
                >
                  Episode
                </Text>
                <Text
                  fontSize={{ base: "4xl", md: "5xl" }}
                  fontWeight="bold"
                  lineHeight={1}
                >
                  {episode?.number}
                </Text>

                <Icon
                  className="episode-play-icon"
                  as={PlayCircle}
                  boxSize={6}
                  opacity={isActive ? 1 : 0}
                  transform={isActive ? "translateY(0)" : "translateY(4px)"}
                  transition="180ms ease"
                />
              </Stack>
            </ChakraBox>
          );
        })}
      </SimpleGrid>
    </ChakraBox>
  );
};
export default EpisodesAnimeList;
