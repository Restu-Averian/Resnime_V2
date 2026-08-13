import { Button, HStack, Text } from "@chakra-ui/react";

function AnimeStreamingServerSelector({ links, selectedIndex, onSelect }) {
  if (links.length === 0) return null;

  return (
    <HStack justify="center" gap="4" wrap="wrap">
      <Text color="fg.heading" fontSize="sm">
        Server
      </Text>
      <HStack gap="3" wrap="wrap" justify="center">
        {links.map((link, index) => (
          <Button
            key={`${link.embed_url}-${index}`}
            size="sm"
            variant={selectedIndex === index ? "solid" : "outline"}
            minW="116px"
            onClick={() => onSelect(index)}
          >
            Server {index + 1}
          </Button>
        ))}
      </HStack>
    </HStack>
  );
}

export default AnimeStreamingServerSelector;
