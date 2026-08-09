import { SimpleGrid } from "@chakra-ui/react";
import HomePickCardItem from "./HomePickCardItem";

function HomePickCardsDesktop({ picks }) {
  return (
    <SimpleGrid columns={{ md: 2, xl: 4 }} gap="4">
      {picks.map((pick) => (
        <HomePickCardItem key={pick.id} pick={pick} />
      ))}
    </SimpleGrid>
  );
}

export default HomePickCardsDesktop;
