import { HStack, IconButton, Text } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  page,
  hasNextPage = true,
  onPrev,
  onNext,
  loading,
  ...rest
}) => {
  return (
    <HStack gap={2} {...rest}>
      <IconButton
        aria-label="Previous page"
        size="sm"
        borderRadius="10px"
        variant="outline"
        borderColor="rgba(255,255,255,0.14)"
        disabled={page <= 1 || loading}
        onClick={onPrev}
      >
        <ChevronLeft />
      </IconButton>

      <Text color="gray.300" minW="70px" textAlign="center">
        Page {page}
      </Text>

      <IconButton
        aria-label="Next page"
        size="sm"
        borderRadius="10px"
        variant="outline"
        borderColor="rgba(255,255,255,0.14)"
        disabled={!hasNextPage || loading}
        onClick={onNext}
      >
        <ChevronRight />
      </IconButton>
    </HStack>
  );
};

export default Pagination;
