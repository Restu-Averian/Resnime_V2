import {
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  HStack,
  IconButton,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { RotateCcw, Star, X, Clock3, Monitor, Calendar } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import formatWord from "../../../helpers/formatWord";
import { getStreamOrigin } from "../../../services/stream.js";
import StreamingAnimeAlertClosePlayer from "./StreamingAnimeAlertClosePlayer";
import { useEpisodeAnimeContext } from "../../../context/EpisodesAnimeContextProvider";
import StreamingAnimePlayer from "./StreamingAnimePlayer";
import StreamingAnimeDescription from "./StreamingAnimeDescription";
import StreamingAnimeGenres from "./StreamingAnimeGenres";
import StreamingAnimeAction from "./StreamingAnimeAction";

const StreamingAnime = () => {
  const [isOpenAlert, setisOpenAlert] = useState(false);
  const playerRef = useRef(null);

  const {
    isStreamOpen,
    episodeValParam,
    closeModalVideo,
    selectedEpisode,
    streamUrl,
    streamError,
    setStreamError,
    data,
  } = useEpisodeAnimeContext();

  const episodeName = useMemo(() => {
    return (
      selectedEpisode?.title ||
      formatWord(episodeValParam?.replaceAll("-", " "))
    );
  }, [episodeValParam, selectedEpisode]);

  const title = data?.title?.romaji || "Anime";
  const score = data?.averageScore || data?.score;
  const aired = selectedEpisode?.releaseDate || data?.releaseDate;
  const genres = data?.genres?.slice(0, 3) || [];
  const previewImage = selectedEpisode?.image || data?.cover || data?.image;

  useEffect(() => {
    const streamOrigin = getStreamOrigin();
    const parseData = (data) => {
      if (typeof data !== "string") return data;

      try {
        return JSON.parse(data);
      } catch {
        return {};
      }
    };

    const handleMessage = (event) => {
      if (event.origin !== streamOrigin) return;

      const payload = parseData(event.data);
      if (payload?.type === "error" || payload?.event === "error") {
        setStreamError("This episode could not be played.");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setStreamError]);

  const requestClose = () => setisOpenAlert(true);

  return (
    <Dialog.Root
      placement="center"
      open={isStreamOpen}
      onOpenChange={({ open }) => {
        if (!open) requestClose();
      }}
    >
      <Portal>
        <Dialog.Backdrop
          bg="rgba(1, 5, 15, 0.82)"
          backdropFilter="blur(9px) saturate(0.7)"
        />
        <Dialog.Positioner px={{ base: 3, md: 8 }}>
          <Dialog.Content
            w="min(1120px, calc(100vw - 32px))"
            maxW="none"
            maxH="calc(100vh - 56px)"
            overflowY="auto"
            borderRadius={{ base: "18px", md: "22px" }}
            border="1px solid rgba(255, 87, 145, 0.58)"
            bg="linear-gradient(135deg, rgba(10, 16, 39, 0.98), rgba(8, 13, 32, 0.96))"
            boxShadow="0 26px 90px rgba(0,0,0,0.66), inset 0 1px 0 rgba(255,255,255,0.05)"
            color="white"
            p={0}
            style={{
              width: "min(1120px, calc(100vw - 32px))",
              maxWidth: "none",
            }}
          >
            <Dialog.Body p={{ base: 5, md: 8 }}>
              <IconButton
                aria-label="Close episode player"
                position="absolute"
                top={{ base: 4, md: 6 }}
                right={{ base: 4, md: 6 }}
                size="md"
                borderRadius="12px"
                bg="rgba(255,255,255,0.08)"
                color="white"
                _hover={{ bg: "rgba(255,255,255,0.14)" }}
                _focusVisible={{
                  outline: "2px solid #ff6d8f",
                  outlineOffset: "2px",
                }}
                onClick={requestClose}
              >
                <X size={22} />
              </IconButton>

              <HStack
                gap={4}
                mb={6}
                pr={{ base: 12, md: 16 }}
                align="flex-start"
              >
                <Box color="#ff5f92" mt={1}>
                  <Star size={26} />
                </Box>
                <Stack gap={1}>
                  <Heading
                    as="h3"
                    fontSize={{ base: "2xl", md: "3xl" }}
                    lineHeight={1.15}
                    overflowWrap="anywhere"
                  >
                    Episode {selectedEpisode?.number || episodeValParam || ""}
                  </Heading>
                  <Text color="gray.400" fontSize="md">
                    Episode {selectedEpisode?.number || episodeValParam || ""}{" "}
                    {episodeName && `- ${episodeName}`}
                  </Text>
                </Stack>
              </HStack>

              <Flex
                direction={{ base: "column", lg: "row" }}
                gap={{ base: 6, lg: 8 }}
              >
                <Stack gap={4} flex="1 1 0" minW={0}>
                  <StreamingAnimePlayer
                    playerRef={playerRef}
                    previewImage={previewImage}
                    streamUrl={streamUrl}
                    streamError={streamError}
                    setStreamError={setStreamError}
                    title={title}
                    episodeName={episodeName}
                  />

                  <Stack gap={4} px={{ base: 1, md: 2 }} mt={2}>
                    <HStack
                      gap={{ base: 4, md: 6 }}
                      flexWrap="wrap"
                      color="gray.200"
                    >
                      {score && (
                        <HStack gap={2}>
                          <Star size={18} color="#ffd166" fill="#ffd166" />
                          <Text fontWeight="bold" fontSize="md">
                            {score}
                          </Text>
                        </HStack>
                      )}

                      {data?.status && (
                        <HStack gap={2}>
                          <Clock3 size={18} />
                          <Text fontSize="sm">{data.status}</Text>
                        </HStack>
                      )}

                      {data?.totalEpisodes && (
                        <HStack gap={2}>
                          <Monitor size={18} />
                          <Text fontSize="sm">
                            {data.totalEpisodes} episodes
                          </Text>
                        </HStack>
                      )}

                      {aired && (
                        <HStack gap={2}>
                          <Calendar size={18} />
                          <Text fontSize="sm">Aired {aired}</Text>
                        </HStack>
                      )}
                    </HStack>

                    <StreamingAnimeGenres genres={genres} />

                    {streamError && (
                      <HStack>
                        <Button
                          size="sm"
                          variant="outline"
                          borderRadius="10px"
                          borderColor="rgba(255,255,255,0.15)"
                          onClick={() => setStreamError("")}
                        >
                          <RotateCcw size={16} />
                          Retry
                        </Button>
                      </HStack>
                    )}
                  </Stack>
                </Stack>

                <Stack
                  gap={6}
                  flex={{ base: "1", lg: "0 0 320px" }}
                  pt={{ base: 0, lg: 2 }}
                >
                  <StreamingAnimeDescription
                    data={data}
                    title={title}
                    episodeName={episodeName}
                  />

                  <Box h="1px" bg="rgba(255,255,255,0.11)" />

                  <StreamingAnimeAction
                    streamUrl={streamUrl}
                    streamError={streamError}
                    playerRef={playerRef}
                    requestClose={requestClose}
                  />
                </Stack>
              </Flex>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>

      <StreamingAnimeAlertClosePlayer
        isOpen={isOpenAlert}
        onCancel={() => {
          setisOpenAlert(false);
        }}
        onOk={() => {
          closeModalVideo();
        }}
      />
    </Dialog.Root>
  );
};
export default StreamingAnime;
