import { Badge, Box, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import Image from "../global/Image";
import { animePath } from "./utils";

const RecentCard = ({ anime }) => (
  <Box
    as={Link}
    to={animePath(anime)}
    display="grid"
    gridTemplateColumns="112px 1fr"
    gap={4}
    p={3}
    minH="132px"
    borderRadius="10px"
    border="1px solid rgba(255,255,255,0.1)"
    bg="rgba(255,255,255,0.045)"
    _hover={{ bg: "rgba(255,255,255,0.075)", textDecoration: "none" }}
  >
    <Image
      src={anime.image}
      alt={anime.title.romaji}
      w="112px"
      h="108px"
      borderRadius="8px"
      objectFit="cover"
    />
    <Stack gap={2} minW={0}>
      <HStack gap={2} justify="space-between" align="start">
        <Badge bg="#ff6d8f" color="white" borderRadius="8px" px={2}>
          EP {anime.totalEpisodes || "?"}
        </Badge>
        {anime.score && (
          <HStack gap={1} color="yellow.300" fontSize="sm">
            <Star size={15} fill="currentColor" />
            <Text color="gray.100">{anime.score.toFixed(2)}</Text>
          </HStack>
        )}
      </HStack>
      <Heading as="h3" size="sm" lineHeight={1.25} overflowWrap="break-word">
        {anime.title.romaji}
      </Heading>
      <Text color="gray.400" fontSize="sm">
        {anime.status || "Recently updated"}
      </Text>
    </Stack>
  </Box>
);

export default RecentCard;
