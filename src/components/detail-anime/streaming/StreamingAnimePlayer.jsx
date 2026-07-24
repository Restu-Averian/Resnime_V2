import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { Play, RotateCcw } from "lucide-react";

const StreamingAnimePlayer = ({
  playerRef,
  previewImage,
  streamUrl,
  streamError,
  setStreamError,
  title,
  episodeName,
}) => {
  return (
    <Box
      ref={playerRef}
      tabIndex={-1}
      position="relative"
      overflow="hidden"
      borderRadius="14px"
      border="1px solid rgba(255,255,255,0.11)"
      bg="#050816"
      aspectRatio="16 / 9"
      boxShadow="0 20px 55px rgba(0,0,0,0.45)"
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        bgImage: previewImage
          ? `linear-gradient(180deg, rgba(4,8,20,0.08), rgba(4,8,20,0.48)), url("${previewImage}")`
          : "linear-gradient(135deg, rgba(255,109,143,0.2), rgba(23,33,64,0.95))",
        bgSize: "cover",
        bgPos: "center",
        opacity: streamUrl && !streamError ? 0 : 1,
      }}
    >
      {streamError ? (
        <Stack
          position="absolute"
          inset={0}
          align="center"
          justify="center"
          gap={4}
          px={6}
          textAlign="center"
        >
          <Text color="#ffc0cf" fontWeight="semibold">
            {streamError}
          </Text>
          <Button
            size="sm"
            variant="outline"
            borderColor="rgba(255,255,255,0.18)"
            onClick={() => setStreamError("")}
          >
            <RotateCcw size={16} />
            Retry
          </Button>
        </Stack>
      ) : streamUrl ? (
        <iframe
          key={streamUrl}
          src={streamUrl}
          title={`${title} ${episodeName}`}
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            inset: 0,
            border: 0,
            background: "transparent",
          }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <Stack
          position="absolute"
          inset={0}
          align="center"
          justify="center"
          gap={3}
          color="gray.200"
        >
          <Box
            display="grid"
            placeItems="center"
            boxSize={{ base: "64px", md: "88px" }}
            borderRadius="full"
            bg="rgba(255,255,255,0.18)"
            backdropFilter="blur(12px)"
          >
            <Play size={34} fill="currentColor" />
          </Box>
          <Text>Preparing player...</Text>
        </Stack>
      )}
    </Box>
  );
};

export default StreamingAnimePlayer;
