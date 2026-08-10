import { Box, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { tabs } from "../../../pages/anime-list/data/anime-list.data";

function AnimeListTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

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
            onClick={() => setActiveTab(tab)}
            cursor="pointer"
            _hover={{ color: "accent.hover" }}
            _focusVisible={{ layerStyle: "focusRing" }}
          >
            {tab}
          </Box>
        );
      })}
    </HStack>
  );
}

export default AnimeListTabs;
