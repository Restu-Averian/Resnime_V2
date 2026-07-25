import { createListCollection, HStack, Select, Text } from "@chakra-ui/react";
import { useEpisodeAnimeContext } from "../../../context/EpisodesAnimeContextProvider";

const orderCollection = createListCollection({
  items: [
    { label: "Ascending", value: "episode-asc" },
    { label: "Descending", value: "episode-desc" },
  ],
});

const EpisodesAnimeOrder = () => {
  const { sortMode, setSortMode } = useEpisodeAnimeContext();

  return (
    <HStack gap={3} color="gray.300">
      <Text fontSize="sm">Order:</Text>

      <Select.Root
        collection={orderCollection}
        size="sm"
        value={[sortMode || "episode-asc"]}
        onValueChange={(e) => {
          if (e.value?.[0]) {
            setSortMode?.(e.value[0]);
          }
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

          <Select.IndicatorGroup px={3}>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>

        <Select.Positioner zIndex={1500}>
          <Select.Content bg="#08101f" borderColor="rgba(255,255,255,0.14)">
            {orderCollection.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </HStack>
  );
};

export default EpisodesAnimeOrder;
