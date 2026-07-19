import { HStack, IconButton, Text } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import SectionHeader from "./SectionHeader";

const HomeSectionHeader = ({ page, setPage, loading }) => {
  return (
    <SectionHeader
      icon={Flame}
      title="Recently Updated"
      action={
        <HStack gap={2}>
          <IconButton
            aria-label="Previous recent page"
            size="sm"
            borderRadius="10px"
            variant="outline"
            borderColor="rgba(255,255,255,0.14)"
            disabled={page === 1 || loading}
            onClick={() => setPage((value) => Math.max(value - 1, 1))}
          >
            <ChevronLeft />
          </IconButton>

          <Text color="gray.300" minW="70px" textAlign="center">
            Page {page}
          </Text>

          <IconButton
            aria-label="Next recent page"
            size="sm"
            borderRadius="10px"
            variant="outline"
            borderColor="rgba(255,255,255,0.14)"
            disabled={loading}
            onClick={() => setPage((value) => value + 1)}
          >
            <ChevronRight />
          </IconButton>
        </HStack>
      }
    />
  );
};

export default HomeSectionHeader;
