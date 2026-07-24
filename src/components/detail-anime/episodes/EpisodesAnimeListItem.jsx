import { Box as ChakraBox, Icon, Stack, Text } from "@chakra-ui/react";
import { PlayCircle } from "lucide-react";

const EpisodesAnimeListItem = ({ episode, isActive, openModalVideo }) => {
  return (
    <ChakraBox
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
};

export default EpisodesAnimeListItem;
