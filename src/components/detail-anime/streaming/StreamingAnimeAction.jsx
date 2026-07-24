import { Button, Stack, Text, HStack, Box } from "@chakra-ui/react";
import { useEpisodeAnimeContext } from "../../../context/EpisodesAnimeContextProvider";

const StreamingAnimeAction = ({ requestClose }) => {
  const { data, episodeValParam, openModalVideo } = useEpisodeAnimeContext();

  const episodes = data?.episodes || [];
  const currentIndex = episodes.findIndex((ep) => ep.id === episodeValParam);
  const totalEpisodes = episodes.length;

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex !== -1 && currentIndex < totalEpisodes - 1;
  const currentEpisodeNum = currentIndex !== -1 ? currentIndex + 1 : 0;

  const handlePrev = (e) => {
    if (hasPrev) {
      openModalVideo(e, episodes[currentIndex - 1].id);
    }
  };

  const handleNext = (e) => {
    if (hasNext) {
      openModalVideo(e, episodes[currentIndex + 1].id);
    }
  };

  const handleSelect = (e) => {
    openModalVideo(null, e.target.value);
  };

  return (
    <Stack gap={4}>
      <Stack gap={3}>
        <Text color="#ff5f92" fontSize="sm" fontWeight="bold">
          Episode Navigation
        </Text>

        <HStack gap={3} w="100%">
          <Button
            flex="1"
            h="40px"
            borderRadius="8px"
            variant="outline"
            borderColor="rgba(255, 104, 152, 0.5)"
            color="#ff5f92"
            fontSize="sm"
            _hover={{ bg: "rgba(255, 95, 146, 0.1)" }}
            disabled={!hasPrev}
            onClick={handlePrev}
          >
            &lt; Prev
          </Button>

          <Box flex="1" position="relative">
            <Box
              as="select"
              value={episodeValParam || ""}
              onChange={handleSelect}
              w="100%"
              h="40px"
              borderRadius="8px"
              bg="transparent"
              border="1px solid rgba(255, 104, 152, 0.5)"
              color="white"
              px={3}
              fontSize="sm"
              outline="none"
              cursor="pointer"
              appearance="none"
              _focusVisible={{
                outline: "2px solid #ff6d8f",
                outlineOffset: "2px",
              }}
            >
              {episodes?.map((ep, idx) => (
                <option
                  key={ep.id}
                  value={ep.id}
                  style={{ backgroundColor: "#0a1027", color: "white" }}
                >
                  Episode {ep.number || idx + 1}
                </option>
              ))}
            </Box>
            <Box
              position="absolute"
              right="12px"
              top="50%"
              transform="translateY(-50%)"
              pointerEvents="none"
              color="white"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Box>
          </Box>

          <Button
            flex="1"
            h="40px"
            borderRadius="8px"
            variant="outline"
            borderColor="rgba(255, 104, 152, 0.5)"
            color="#ff5f92"
            fontSize="sm"
            _hover={{ bg: "rgba(255, 95, 146, 0.1)" }}
            disabled={!hasNext}
            onClick={handleNext}
          >
            Next &gt;
          </Button>
        </HStack>

        {totalEpisodes > 0 && (
          <Stack gap={1} mt={1}>
            <Text color="gray.400" fontSize="xs" textAlign="center">
              {currentEpisodeNum} of {totalEpisodes} episodes
            </Text>
            <Text color="gray.400" fontSize="10px" textAlign="center">
              Jump between episodes without leaving the player.
            </Text>
          </Stack>
        )}
      </Stack>

      <Button
        h="56px"
        borderRadius="10px"
        variant="outline"
        borderColor="rgba(255, 104, 152, 0.74)"
        color="white"
        _hover={{ bg: "rgba(255,255,255,0.06)" }}
        _focusVisible={{
          outline: "2px solid #ff6d8f",
          outlineOffset: "2px",
        }}
        onClick={requestClose}
      >
        Close Player
      </Button>
    </Stack>
  );
};

export default StreamingAnimeAction;
