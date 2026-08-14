import { Center, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

function AnimeStreamingPlayer({
  selectedEmbedUrl,
  poster,
  episodeNumber,
}) {
  const { mal_id: malId } = useParams();
  const [hasPlaybackError, setHasPlaybackError] = useState(false);

  const isDirectVideoUrl = useMemo(() => {
    if (!selectedEmbedUrl) return false;

    try {
      return /\.(mp4|webm|ogg|m3u8)$/i.test(new URL(selectedEmbedUrl).pathname);
    } catch {
      return false;
    }
  }, [selectedEmbedUrl]);

  useEffect(() => {
    setHasPlaybackError(false);
  }, [selectedEmbedUrl]);

  return (
    <Center
      aspectRatio="16 / 9"
      w="full"
      overflow="hidden"
      bg="bg.subtle"
      border="1px solid"
      borderColor="border.emphasized"
      borderRadius="media"
      boxShadow="media"
    >
      {!selectedEmbedUrl ? (
        <Text color="fg.muted" px="4" textAlign="center">
          No streaming server is available for this episode.
        </Text>
      ) : hasPlaybackError ? (
        <iframe
          src={`https://megaplay.buzz/stream/mal/${malId}/${episodeNumber}/sub`}
          width="100%"
          height="100%"
          allowFullScreen
          title="Anime Player Fallback"
        />
      ) : isDirectVideoUrl ? (
        <video
          key={selectedEmbedUrl}
          src={selectedEmbedUrl}
          poster={poster || undefined}
          controls
          playsInline
          preload="metadata"
          referrerPolicy="no-referrer"
          onError={() => setHasPlaybackError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            background: "black",
          }}
        />
      ) : (
        <iframe
          key={selectedEmbedUrl}
          src={selectedEmbedUrl}
          title="Anime Player"
          allowFullScreen
          referrerPolicy="no-referrer"
          onError={() => setHasPlaybackError(true)}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            background: "black",
          }}
        />
      )}
    </Center>
  );
}

export default AnimeStreamingPlayer;
