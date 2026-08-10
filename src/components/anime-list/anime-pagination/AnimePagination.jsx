import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const pages = [1, 2, 3];

function AnimePagination({ page, onPageChange }) {
  return (
    <Flex
      align={{ base: "flex-start", md: "center" }}
      justify="space-between"
      direction={{ base: "column", md: "row" }}
      gap="4"
      pt="1"
    >
      <Text color="fg.muted" fontSize="sm">
        Showing 1-20 of 148 anime
      </Text>

      <HStack gap="2">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Previous
        </Button>

        {pages.map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={page === pageNumber ? "solid" : "outline"}
            size="sm"
            minW="38px"
            px="0"
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          disabled={page === pages.length}
          onClick={() => onPageChange(page + 1)}
        >
          Next
          <ArrowRight size={16} strokeWidth={1.5} />
        </Button>
      </HStack>
    </Flex>
  );
}

export default AnimePagination;
