import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import formatWord from "../../../helpers/formatWord";
import { useEpisodeAnimeContext } from "./EpisodesAnimeContextProvider";
import { useEffect, useMemo, useState } from "react";
import AlertDialog from "../../global/AlertDialog";
import Modal from "../../global/Modal";
import Select from "../../global/Select";
import { getStreamOrigin } from "../../../services/stream.js";

const EpisodesAnimeStreamingModal = () => {
  const [isOpenAlert, setisOpenAlert] = useState(false);

  const {
    isStreamOpen,
    episodeValParam,
    closeModalVideo,
    selectedEpisode,
    streamUrl,
    serverOptions,
    audioOptions,
    audioType,
    server,
    setAudioType,
    setServer,
    streamError,
    setStreamError,
    data,
  } = useEpisodeAnimeContext();

  console.log("streamUrl", streamUrl);

  const listServers = useMemo(
    () =>
      serverOptions?.map((option) => ({
        label: option.label,
        value: option.value,
      })),
    [serverOptions],
  );

  const listAudioTypes = useMemo(
    () =>
      audioOptions?.map((option) => ({
        label: option === "dub" ? "Dub" : "Sub",
        value: option,
      })),
    [audioOptions],
  );

  const episodeName = useMemo(() => {
    return (
      selectedEpisode?.title ||
      formatWord(episodeValParam?.replaceAll("-", " "))
    );
  }, [episodeValParam, selectedEpisode]);

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
        setStreamError("This server could not play the episode.");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setStreamError]);

  return (
    <Modal
      header={
        <Heading as="h3" fontSize="xl" textAlign="center">
          {episodeName}
        </Heading>
      }
      isOpen={isStreamOpen}
      onClose={() => {
        setisOpenAlert(true);
      }}
      size="xl"
    >
      <Stack direction="column" spacing={5}>
        {streamError ? (
          <Stack direction="column" spacing={3}>
            <Text color="red.300">{streamError}</Text>
            <Text>Try another server.</Text>
            <Stack direction="row" spacing={3}>
              <Button
                size="sm"
                onClick={() => {
                  setStreamError("");
                }}
              >
                Retry current server
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  const currentIndex = serverOptions.findIndex(
                    (option) => option.value === server,
                  );
                  const nextIndex =
                    currentIndex === -1
                      ? 0
                      : (currentIndex + 1) % serverOptions.length;
                  setServer(serverOptions[nextIndex]?.value || "hd-1");
                }}
              >
                Try next server
              </Button>
            </Stack>
          </Stack>
        ) : streamUrl ? (
          <iframe
            key={`${selectedEpisode?.embedId}-${server}-${audioType}`}
            src={streamUrl}
            title={`${data?.title?.romaji || "Anime"} ${episodeName} - ${server}`}
            width="100%"
            style={{ aspectRatio: "16 / 9", border: 0 }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <Text>Preparing player...</Text>
        )}
        <Stack direction="row" spacing={5}>
          {listAudioTypes?.length > 1 && (
            <Select
              placeholder="Audio"
              listOptions={listAudioTypes}
              value={audioType}
              onChange={setAudioType}
            />
          )}
          {listServers?.length > 1 && (
            <Select
              placeholder="Server"
              listOptions={listServers}
              value={server}
              onChange={setServer}
            />
          )}
        </Stack>
        <Text fontSize="sm">Download is currently unavailable.</Text>
      </Stack>

      <AlertDialog
        isOpen={isOpenAlert}
        onCancel={() => {
          setisOpenAlert(false);
        }}
        onOk={() => {
          closeModalVideo();
        }}
      />
    </Modal>
  );
};
export default EpisodesAnimeStreamingModal;
