import { Flex, HStack, Heading, Icon } from "@chakra-ui/react";

const SectionHeader = ({ icon, title, action }) => (
  <Flex
    direction="row"
    justify="space-between"
    align="center"
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
