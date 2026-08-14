import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import AnimeDetailsHeaderSection from "./AnimeDetailsHeaderSection";
import {
  ANIME_DETAILS_STATUS_LABELS,
  ANIME_DETAILS_TYPE_LABELS,
} from "../../constants/anime-details";
import { formatDate } from "../../lib/formatDate";

function AnimeDetailsOverview({ anime }) {

  const formatAired = (from, to) => {
    const fromLabel = formatDate(from);
    const toLabel = formatDate(to);

    if (fromLabel === "—" && toLabel === "—") return "—";
    if (toLabel === "—") return fromLabel;

    return `${fromLabel} - ${toLabel}`;
  };

  const rows = {
    Type: ANIME_DETAILS_TYPE_LABELS[anime.type] ?? anime.type ?? "—",
    Status: ANIME_DETAILS_STATUS_LABELS[anime.status] ?? anime.status ?? "—",
    Episodes: anime.episodes_count ?? "—",
    Season: [anime.season, anime.year].filter(Boolean).join(" ") || "—",
    Aired: formatAired(anime.aired_from, anime.aired_to),
    Studio: anime.studio || "—",
    Score:
      anime.score !== null && anime.score !== undefined
        ? Number(anime.score).toFixed(1)
        : "—",
  };

  return (
    <Box as="aside" layerStyle="panelElevated" p={{ base: "5", md: "6" }}>
      <Stack gap="5">
        <AnimeDetailsHeaderSection title="Overview" />

        <Stack gap="3.5">
          {Object.keys(rows).map((label) => (
            <Flex key={label} justify="space-between" gap="5">
              <Text color="fg.subtle" fontSize="sm">
                {label}
              </Text>

              <Text color="fg.heading" textAlign="right" fontWeight="500">
                {rows[label]}
              </Text>
            </Flex>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

export default AnimeDetailsOverview;
