import { Sparkles } from "lucide-react";
import { SimpleGrid, Stack } from "@chakra-ui/react";
import HomePickCard from "./HomePickCard";
import SectionHeader from "./global/SectionHeader";

function HomePicksSection({ picks, imageUrl }) {
  return (
    <Stack as="section" gap="3">
      <SectionHeader icon={Sparkles} title="Tonight’s Picks" />

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="4">
        {picks.map((pick) => (
          <HomePickCard key={pick.title} pick={pick} imageUrl={imageUrl} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}

export default HomePicksSection;
