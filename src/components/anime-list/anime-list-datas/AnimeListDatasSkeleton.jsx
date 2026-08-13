import { SimpleGrid } from "@chakra-ui/react";
import AnimeListDatasItemSkeleton from "./AnimeListDatasItemSkeleton";

function AnimeListDatasSkeleton() {
  const skeletons = Array.from({ length: 20 }, (_, i) => i);

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, lg: 4, xl: 5 }}
      gap={{ base: "4", xl: "5" }}
    >
      {skeletons.map((i) => (
        <AnimeListDatasItemSkeleton key={i} />
      ))}
    </SimpleGrid>
  );
}

export default AnimeListDatasSkeleton;
