import { Flex, HStack, Icon, Spinner, Stack, Text } from "@chakra-ui/react";
import { Sparkle } from "lucide-react";

const SearchHeader = ({ searchVal, loading, totalResults }) => {
  return (
    <Flex
      justify="space-between"
      align={{ base: "flex-start", md: "center" }}
      direction={{ base: "column", md: "row" }}
      gap={4}
    >
      <Stack gap={1}>
        <HStack gap={4}>
          <Icon
            as={Sparkle}
            boxSize={{ base: 6, md: 8 }}
            color="#ff73a0"
            fill="#ff73a0"
          />
          <Text
            as="h1"
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="900"
            lineHeight={1}
          >
            Search Results
          </Text>
        </HStack>
        <Text color="#aeb7cb" fontSize={{ base: "sm", md: "md" }}>
          Results for{" "}
          <Text as="span" color="#ff73a0">
            &quot;{searchVal || "anime"}&quot;
          </Text>
        </Text>
      </Stack>

      <HStack
        gap={{ base: 3, md: 8 }}
        alignSelf={{ base: "stretch", md: "center" }}
      >
        <Text
          color="#c7cedc"
          fontSize={{ base: "sm", md: "md" }}
          whiteSpace="nowrap"
        >
          {loading ? (
            <HStack gap={2}>
              <Spinner size="xs" />
              <span>Searching</span>
            </HStack>
          ) : (
            `${totalResults} results found`
          )}
        </Text>
      </HStack>
    </Flex>
  );
};

export default SearchHeader;
