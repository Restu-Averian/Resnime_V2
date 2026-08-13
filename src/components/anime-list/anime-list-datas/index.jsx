import { SimpleGrid } from "@chakra-ui/react";
import AnimeListDatasItem from "./AnimeListDatasItem";

function AnimeListDatas({ anime }) {
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, lg: 4, xl: 5 }}
      gap={{ base: "4", xl: "5" }}
    >
      {anime.map((item) => (
        <AnimeListDatasItem key={item.id} anime={item} />
      ))}
    </SimpleGrid>
  );
}

export default AnimeListDatas;
