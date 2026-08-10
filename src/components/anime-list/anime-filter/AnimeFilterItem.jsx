import { Box, Grid, Text } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";

function AnimeFilterItem({
  icon: Icon,
  label,
  name,
  options,
  value,
  onChange,
}) {
  return (
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
    >
      <Box color="accent.primary">
        <Icon size={19} strokeWidth={1.55} />
      </Box>

      <Text color="fg.muted" fontSize="sm">
        {label}
      </Text>

      <Box
        as="select"
        aria-label={label}
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        appearance="none"
        bg="transparent"
        border="0"
        color="fg.heading"
        fontSize="sm"
        fontWeight="500"
        outline="0"
        pr="1"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Box>

      <Box color="fg.subtle" pointerEvents="none">
        <ChevronDown size={17} strokeWidth={1.5} />
      </Box>
    </Grid>
  );
}

export default AnimeFilterItem;
