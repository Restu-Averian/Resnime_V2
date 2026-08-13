import { Box, Flex, Skeleton, Stack } from "@chakra-ui/react";
import { ScanSearch } from "lucide-react";
import HomeSectionHeader from "../../home/HomeSectionHeader";

function HomeFinderAnimeSkeleton() {
  return (
    <Flex
      layerStyle="panel"
      direction={{ base: "column", md: "row" }}
      minH={{ base: "auto", md: "235px" }}
      align={{ base: "stretch", md: "center" }}
      gap={{ base: "4", md: "10" }}
      w="full"
      minW="0"
      p={{ base: "5", md: "10" }}
      position="relative"
    >
      <Box display={{ base: "none", md: "block" }} flex="0 0 auto">
        <Skeleton w="118px" h="118px" borderRadius="md" opacity={0.6} />
      </Box>
      <Stack gap="5" w="full" maxW="430px">
        <Stack gap="3">
          <HomeSectionHeader icon={ScanSearch} title="Can't remember the anime?" iconSize={24} />
          <Skeleton h="16px" w="100%" borderRadius="sm" />
          <Skeleton h="16px" w="70%" borderRadius="sm" />
        </Stack>
        <Skeleton h="32px" w="140px" borderRadius="md" mt="2" />
      </Stack>
    </Flex>
  );
}

export default HomeFinderAnimeSkeleton;
