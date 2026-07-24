import { HStack, Text, Icon, Button } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EpisodesAnimePagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  buttonSize = "32px",
}) => {
  return (
    <HStack gap={3}>
      <Button
        w={buttonSize}
        h={buttonSize}
        minW="unset"
        p={0}
        display="grid"
        placeItems="center"
        border="1px solid"
        borderColor="rgba(255,255,255,0.12)"
        borderRadius="8px"
        bg="rgba(255,255,255,0.02)"
        color="gray.400"
        transition="all 0.2s"
        _hover={{
          bg: "rgba(255,255,255,0.06)",
          borderColor: "rgba(255,255,255,0.2)",
        }}
        _disabled={{
          opacity: 0.4,
          cursor: "not-allowed",
          _hover: {
            bg: "rgba(255,255,255,0.02)",
            borderColor: "rgba(255,255,255,0.12)",
          },
        }}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
      >
        <Icon as={ChevronLeft} boxSize={4} />
      </Button>

      <Text fontSize="sm" color="gray.400">
        Page{" "}
        <Text as="span" color="white" fontWeight="medium">
          {currentPage}
        </Text>{" "}
        of {totalPages}
      </Text>

      <Button
        w={buttonSize}
        h={buttonSize}
        minW="unset"
        p={0}
        display="grid"
        placeItems="center"
        border="1px solid"
        borderColor="rgba(255,109,143,0.34)"
        borderRadius="8px"
        bg="rgba(255,109,143,0.05)"
        color="#ff6d8f"
        transition="all 0.2s"
        _hover={{
          bg: "rgba(255,109,143,0.1)",
          borderColor: "rgba(255,109,143,0.5)",
        }}
        _disabled={{
          opacity: 0.4,
          cursor: "not-allowed",
          borderColor: "rgba(255,255,255,0.12)",
          color: "gray.400",
          bg: "rgba(255,255,255,0.02)",
          _hover: {
            bg: "rgba(255,255,255,0.02)",
            borderColor: "rgba(255,255,255,0.12)",
          },
        }}
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
      >
        <Icon as={ChevronRight} boxSize={4} />
      </Button>
    </HStack>
  );
};

export default EpisodesAnimePagination;
