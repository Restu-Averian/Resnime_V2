import {
  Box,
  Grid,
  Select as ChakraSelect,
  Text,
  createListCollection,
} from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { useMemo } from "react";

/**
 * Reusable select component utilizing Chakra UI's Select.
 * Supports a custom layout with an optional prefix icon and label.
 *
 * @param {Object} props - Component props.
 * @param {import('react').ElementType} [props.prefixIcon] - Icon component to display on the left.
 * @param {string} [props.prefixLabel] - Label text to display next to the icon.
 * @param {string} props.name - Name of the select field.
 * @param {Array<string|{label: string, value: string}>} props.options - Array of options for the dropdown.
 * @param {string} props.value - Currently selected value.
 * @param {function(string, string): void} props.onChange - Callback fired when value changes. Receives name and new value.
 * @returns {import('react').ReactElement}
 */
export function Select({
  prefixIcon: Icon,
  prefixLabel,
  name,
  options,
  value,
  onChange,
}) {
  const collection = useMemo(
    () =>
      createListCollection({
        items: options.map((option) =>
          typeof option === "string" ? { label: option, value: option } : option
        ),
      }),
    [options]
  );

  return (
    <ChakraSelect.Root
      collection={collection}
      name={name}
      value={[value]}
      onValueChange={(e) => onChange(name, e.value[0])}
    >
      <ChakraSelect.Trigger asChild>
        <Grid
          position="relative"
          templateColumns="24px minmax(62px, auto) minmax(0, 1fr) 20px"
          alignItems="center"
          gap="3"
          minH="58px"
          px="4"
          border="1px solid"
          borderColor="border.default"
          borderRadius="control"
          bg="bg.surface"
          cursor="pointer"
          _focusVisible={{
            outline: "2px solid",
            outlineColor: "accent.primary",
            outlineOffset: "-1px",
          }}
        >
          <Box color="accent.primary">
            {Icon && <Icon size={19} strokeWidth={1.55} />}
          </Box>

          <Text color="fg.muted" fontSize="sm">
            {prefixLabel}
          </Text>

          <Box
            color="fg.heading"
            fontSize="sm"
            fontWeight="500"
            pr="1"
            w="full"
            textAlign="left"
          >
            <ChakraSelect.ValueText placeholder={prefixLabel} />
          </Box>

          <Box color="fg.subtle" pointerEvents="none">
            <ChevronDown size={17} strokeWidth={1.5} />
          </Box>
        </Grid>
      </ChakraSelect.Trigger>

      <ChakraSelect.Positioner>
        <ChakraSelect.Content>
          {collection.items.map((item) => (
            <ChakraSelect.Item item={item} key={item.value}>
              {item.label}
            </ChakraSelect.Item>
          ))}
        </ChakraSelect.Content>
      </ChakraSelect.Positioner>
    </ChakraSelect.Root>
  );
}
