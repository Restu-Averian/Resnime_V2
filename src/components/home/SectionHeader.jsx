import { Flex, HStack, Heading, Icon } from "@chakra-ui/react";

const SectionHeader = ({ icon, title, action }) => (
  <Flex
    direction={{ base: "column", md: "row" }}
    justify="space-between"
    align={{ base: "stretch", md: "center" }}
    gap={3}
  >
    <HStack gap={2}>
      <Icon as={icon} color="#ff6d8f" boxSize={5} />
      <Heading as="h2" size="md">
        {title}
      </Heading>
    </HStack>
    {action}
  </Flex>
);

export default SectionHeader;
