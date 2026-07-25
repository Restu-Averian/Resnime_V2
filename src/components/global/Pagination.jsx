import { HStack, Text, Icon, Button } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  page,
  totalPages,
  hasNextPage = true,
  onPrev,
  onNext,
  loading,
  buttonSize = "32px",
  justifyContent,
  justify,
  w = "auto",
  width,
  ...rest
}) => {
  const resolvedJustify = justifyContent || justify || "flex-end";

  return (
    <HStack
      gap={3}
      w={width || w}
      justifyContent={resolvedJustify}
      {...rest}
    >
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
          bg: "rgba(255,109,143,0.1)",
          borderColor: "rgba(255,109,143,0.5)",
          color: "#ff6d8f",
        }}
        _disabled={{
          opacity: 0.4,
          cursor: "not-allowed",
          _hover: {
            bg: "rgba(255,255,255,0.02)",
            borderColor: "rgba(255,255,255,0.12)",
            color: "gray.400",
          },
        }}
        disabled={page <= 1 || loading}
        onClick={onPrev}
      >
        <Icon as={ChevronLeft} boxSize={4} />
      </Button>

      <Text fontSize="sm" color="gray.400">
        Page{" "}
        <Text as="span" color="white" fontWeight="medium">
          {page}
        </Text>
        {totalPages !== undefined ? <> of {totalPages}</> : ""}
      </Text>

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
          bg: "rgba(255,109,143,0.1)",
          borderColor: "rgba(255,109,143,0.5)",
          color: "#ff6d8f",
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
            color: "gray.400",
          },
        }}
        disabled={
          (totalPages !== undefined && page >= totalPages) ||
          !hasNextPage ||
          loading
        }
        onClick={onNext}
      >
        <Icon as={ChevronRight} boxSize={4} />
      </Button>
    </HStack>
  );
};

export default Pagination;
