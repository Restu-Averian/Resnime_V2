import { HStack, Select, Text } from "@chakra-ui/react";

const EpisodesAnimeOrder = ({ sortMode, setSortMode }) => {
  return (
    <HStack gap={3} color="gray.300">
      <Text fontSize="sm">Order:</Text>

      <Select.Root
        size="sm"
        value={[sortMode || "episode-asc"]}
        onValueChange={({ value }) => {
          setSortMode?.(value?.[0] || "episode-asc");
        }}
      >
        <Select.HiddenSelect aria-label="Order episodes" />

        <Select.Control
          minW={{ base: "140px", md: "160px" }}
          border="1px solid rgba(255,255,255,0.13)"
          borderRadius="12px"
          bg="rgba(255,255,255,0.035)"
        >
          <Select.Trigger border="0" px={4}>
            <Select.ValueText placeholder="Ascending" />
          </Select.Trigger>

          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>

        <Select.Positioner>
          <Select.Content bg="#08101f" borderColor="rgba(255,255,255,0.14)">
            <Select.Item item="episode-asc">
              Ascending
              <Select.ItemIndicator />
            </Select.Item>

            <Select.Item item="episode-desc">
              Descending
              <Select.ItemIndicator />
            </Select.Item>
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </HStack>
  );
};

export default EpisodesAnimeOrder;
