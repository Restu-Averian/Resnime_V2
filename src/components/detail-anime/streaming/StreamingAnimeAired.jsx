import { HStack, Text } from "@chakra-ui/react";

const StreamingAnimeAired = ({ aired }) => {
  if (!aired) return null;
  return (
    <HStack gap={3}>
      <Text color="gray.400">Aired</Text>
      <Text color="white">{aired}</Text>
    </HStack>
  );
};

export default StreamingAnimeAired;
