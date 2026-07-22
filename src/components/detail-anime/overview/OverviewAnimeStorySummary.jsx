import {
  Box as ChakraBox,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BookOpen, Flame, Heart, Zap } from "lucide-react";

const cleanDescription = (description) =>
  description?.replace(/<[^>]*>/g, "").trim() || "No story summary available.";

/**
 * Story summary card with story badges for anime overview tab.
 * @param {Object} props
 * @param {Object} props.data
 */
const OverviewAnimeStorySummary = ({ data }) => {
  const description = cleanDescription(data?.description);

  const episodeLabel =
    data?.totalEpisodes &&
    `${data.totalEpisodes} Episode${Number(data.totalEpisodes) === 1 ? "" : "s"}`;

  const storyBadges = [
    { label: data?.type, icon: BookOpen },
    { label: data?.status, icon: Zap },
    { label: data?.genres?.[0], icon: Flame },
    { label: episodeLabel, icon: Heart },
  ].filter(({ label }) => label);

  return (
    <ChakraBox
      minH="310px"
      border="1px solid rgba(255,109,143,0.22)"
      borderRadius="14px"
      bgImage={`linear-gradient(90deg, rgba(10, 14, 33, 0.96) 0%, rgba(4, 6, 17, 0.85) 75%, rgba(2, 3, 10, 0.74) 100%), url(${data?.cover || data?.image})`}
      bgSize="cover"
      bgPos="center"
      boxShadow="inset 0 1px 0 rgba(255,255,255,0.05), 0 18px 55px rgba(0,0,0,0.24)"
      overflow="hidden"
      px={{ base: 5, md: 6 }}
      py={{ base: 5, md: 6 }}
    >
      <Stack gap={5} h="full" justify="space-between">
        <Stack gap={4}>
          <HStack gap={3} color="#ff8daf">
            <BookOpen size={23} />

            <Heading as="h3" fontSize={{ base: "lg", md: "xl" }}>
              Story Summary
            </Heading>
          </HStack>

          <Text
            color="gray.100"
            fontSize={{ base: "sm", md: "md" }}
            lineHeight="1.75"
            maxW="760px"
            whiteSpace="pre-line"
            lineClamp={8}
          >
            {description}
          </Text>
        </Stack>

        <HStack gap={2} wrap="wrap">
          {storyBadges.map(({ label, icon }) => (
            <HStack
              key={label}
              gap={2}
              px={3}
              py={2}
              borderRadius="9px"
              border="1px solid rgba(255,109,143,0.18)"
              bg="rgba(255,255,255,0.045)"
              color="gray.100"
              fontSize="sm"
            >
              <Icon as={icon} boxSize={4} color="#ff6d8f" />

              <Text>{label}</Text>
            </HStack>
          ))}
        </HStack>
      </Stack>
    </ChakraBox>
  );
};

export default OverviewAnimeStorySummary;
