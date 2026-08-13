import { Box, HStack } from "@chakra-ui/react";
import HomePickCardItem from "./HomePickCardItem";

function HomePickCardsMobile({ picks }) {
  return (
    <Box
      overflowX="auto"
      pb="1"
      css={{
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <HStack align="stretch" gap="4" w="max-content" pr="4">
        {picks.map((pick) => (
          <HomePickCardItem
            key={pick.id}
            pick={pick}
            variant="mobile"
          />
        ))}
      </HStack>
    </Box>
  );
}

export default HomePickCardsMobile;
