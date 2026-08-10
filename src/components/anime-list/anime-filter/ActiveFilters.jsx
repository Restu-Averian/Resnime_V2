import { Button, HStack, Text } from "@chakra-ui/react";
import { X } from "lucide-react";

const chipFilters = ["genre", "type", "status", "season"];

function ActiveFilters({ filters, onRemove, onClear }) {
  const activeFilters = chipFilters.filter((key) => filters[key] !== "Any");

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <HStack gap="3" flexWrap="wrap">
      {activeFilters.map((key) => (
        <Button
          key={key}
          variant="subtle"
          size="sm"
          gap="2"
          border="1px solid"
          borderColor="border.default"
          onClick={() => onRemove(key)}
        >
          {filters[key]}
          <X size={14} strokeWidth={1.6} />
        </Button>
      ))}

      <Button variant="plain" size="sm" color="fg.muted" onClick={onClear}>
        <Text as="span">Clear filters</Text>
      </Button>
    </HStack>
  );
}

export default ActiveFilters;
