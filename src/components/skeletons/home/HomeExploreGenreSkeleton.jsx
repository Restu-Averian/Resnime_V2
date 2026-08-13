import { Flex, Skeleton, Stack } from "@chakra-ui/react";
import { Feather } from "lucide-react";
import HomeSectionHeader from "../../home/HomeSectionHeader";

function HomeExploreGenreSkeleton() {
  return (
    <Stack
      layerStyle={{ base: "none", md: "panel" }}
      minH={{ base: "auto", md: "235px" }}
      gap={{ base: "4", md: "3" }}
      minW="0"
      p={{ base: "0", md: "7" }}
    >
      <HomeSectionHeader icon={Feather} title="Explore by Genre" />
      <Stack gap="0" w="full">
        {[1, 2, 3].map((i) => (
          <Flex
            key={i}
            align="center"
            gap="4"
            p="3"
            borderBottom="1px solid"
            borderColor="whiteAlpha.100"
            _last={{ borderBottom: "none" }}
          >
            <Skeleton w="32px" h="32px" borderRadius="md" flexShrink={0} />
            <Stack gap="2" w="full">
              <Skeleton h="16px" w="60%" borderRadius="sm" />
              <Skeleton h="12px" w="40%" borderRadius="sm" />
            </Stack>
            <Skeleton w="16px" h="16px" borderRadius="full" />
          </Flex>
        ))}
      </Stack>
    </Stack>
  );
}

export default HomeExploreGenreSkeleton;
