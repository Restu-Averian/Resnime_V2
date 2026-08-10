import { Box, HStack } from "@chakra-ui/react";
import { tabs } from "../../../pages/anime-list/data/anime-list.data";

function AnimeListTabs({ activeTab, onTabChange }) {
  return (
    <HStack
      as="nav"
      gap={{ base: "5", md: "8" }}
      overflowX="auto"
      borderBottom="1px solid"
      borderColor="border.subtle"
      css={{
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        const isDisabled = tab !== "All Anime";

        return (
          <Box
            as="button"
            key={tab}
            px="0"
            pb="4"
            color={isActive ? "accent.primary" : "accent.warmMuted"}
            borderBottom="1px solid"
            borderColor={isActive ? "accent.primary" : "transparent"}
            fontFamily="heading"
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="600"
            whiteSpace="nowrap"
            onClick={() => !isDisabled && onTabChange(tab)}
            cursor={isDisabled ? "not-allowed" : "pointer"}
            opacity={isDisabled ? 0.5 : 1}
            disabled={isDisabled}
            aria-disabled={isDisabled}
            _hover={{ color: isDisabled ? undefined : "accent.hover" }}
            _focusVisible={isDisabled ? undefined : { layerStyle: "focusRing" }}
          >
            {tab}
          </Box>
        );
      })}
    </HStack>
  );
}

export default AnimeListTabs;
