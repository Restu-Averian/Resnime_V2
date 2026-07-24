import { Button, Stack } from "@chakra-ui/react";
import { Play } from "lucide-react";

const StreamingAnimeAction = ({ streamUrl, streamError, playerRef, requestClose }) => {
  return (
    <Stack gap={3}>
      <Button
        h="56px"
        borderRadius="10px"
        bg="#ff5f92"
        color="white"
        fontWeight="bold"
        _hover={{ bg: "#ff759f" }}
        _focusVisible={{
          outline: "2px solid #ffd1dc",
          outlineOffset: "2px",
        }}
        disabled={!streamUrl || Boolean(streamError)}
        onClick={() => playerRef.current?.focus?.()}
      >
        <Play size={18} fill="currentColor" />
        Watch Episode
      </Button>
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
        Close
      </Button>
    </Stack>
  );
};

export default StreamingAnimeAction;
