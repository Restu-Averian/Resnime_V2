import { Heading, Stack, Text } from "@chakra-ui/react";
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
    setServer,
    streamError,
    setStreamError,
    data,
  } = useEpisodeAnimeContext();

  const listServers = useMemo(
    () =>
      serverOptions?.map((option) => ({
        label: option.toUpperCase(),
        value: option,
      })),
    [serverOptions],
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
        setStreamError("The selected stream failed to play.");
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
          <Text color="red.300">{streamError}</Text>
        ) : streamUrl ? (
          <iframe
            src={streamUrl}
            title={`${data?.title?.romaji || "Anime"} ${episodeName}`}
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
          {listServers?.length > 1 && (
            <Select
              placeholder="Server"
              listOptions={listServers}
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
