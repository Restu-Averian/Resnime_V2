import { Button, Center, Stack, Text } from "@chakra-ui/react";
import { ExternalLink } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function AnimeStreamingPlayer({ selectedEmbedUrl, poster }) {
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
        <Stack align="center" gap="4" px="4" textAlign="center">
          <Text color="fg.muted">
            This streaming server blocked playback in the browser.
          </Text>
          <Button as="a" href={selectedEmbedUrl} target="_blank" rel="noreferrer" variant="outline">
            Open server <ExternalLink size={16} />
          </Button>
        </Stack>
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
