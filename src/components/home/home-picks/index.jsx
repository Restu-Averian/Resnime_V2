import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import {
  Box,
  Flex,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import HomeSectionHeader from "../HomeSectionHeader";
import HomePickCardsDesktop from "./HomePickCardsDesktop";
import HomePickCardsMobile from "./HomePickCardsMobile";

function HomePicksSection({ picks }) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Stack as="section" gap="3">
      <HomeSectionHeader icon={Sparkles} title="Tonight’s Picks" />

      {isMobile ? (
        <>
          <HomePickCardsMobile picks={picks} />

          <Stack align="center" gap="3" pt="2">
            <HStack gap="4">
              {picks.map((pick, index) => (
                <Box
                  key={pick.id}
                  w="2"
                  h="2"
                  borderRadius="999px"
                  bg={index === 0 ? "accent.primary" : "fg.subtle"}
                />
              ))}
            </HStack>

            <Flex align="center" justify="center" gap="6" color="fg.muted">
              <ArrowLeft size={21} strokeWidth={1.4} />

              <Text fontSize="sm" lineHeight="1.2">
                Swipe to explore
              </Text>

              <ArrowRight size={21} strokeWidth={1.4} />
            </Flex>
          </Stack>
        </>
      ) : (
        <HomePickCardsDesktop picks={picks} />
      )}
    </Stack>
  );
}

export default HomePicksSection;
