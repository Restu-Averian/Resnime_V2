import { Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function AnimeDetailsHeaderSection({
  title,
  suffixTitle,
  showArrows,
  onScroll,
}) {
  return (
    <Flex align="center" justify="space-between" gap="4">
      <HStack gap="3">
        <Text as="h2" textStyle="sectionTitle" color="fg.heading">
          {title}
        </Text>

        {suffixTitle}
      </HStack>

      {showArrows && (
        <HStack gap="2" display={{ base: "none", md: "flex" }}>
          <IconButton
            aria-label={`Scroll ${title} left`}
            variant="outline"
            size="sm"
            onClick={() => onScroll?.(-1)}
          >
            <ChevronLeft size={17} />
          </IconButton>

          <IconButton
            aria-label={`Scroll ${title} right`}
            variant="outline"
            size="sm"
            onClick={() => onScroll?.(1)}
          >
            <ChevronRight size={17} />
          </IconButton>
        </HStack>
      )}
    </Flex>
  );
}

export default AnimeDetailsHeaderSection;
