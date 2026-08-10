import { SimpleGrid } from "@chakra-ui/react";
import AnimeCard from "../anime-card/AnimeCard";

function AnimeGrid({ anime }) {
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, lg: 4, xl: 5 }}
      gap={{ base: "4", xl: "5" }}
    >
      {anime.map((item) => (
        <AnimeCard key={item.id} anime={item} />
      ))}
    </SimpleGrid>
  );
}

export default AnimeGrid;
