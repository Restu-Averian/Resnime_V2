import { Box, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GenreListItem from "./GenreListItem";

const GenreLists = ({ filteredGenres, selectedGenre }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const mobileGenres = [
    ...filteredGenres.filter((item) => item.value === selectedGenre),
    ...filteredGenres.filter((item) => item.value !== selectedGenre),
  ];
  const topRowCount = Math.ceil(mobileGenres.length / 2);
  const mobileOrder = new Map(
    mobileGenres.map((item, index) => [
      item.value,
      index < topRowCount ? index * 2 : (index - topRowCount) * 2 + 1,
    ]),
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [selectedGenre]);

  return (
    <Stack gap={4} w="100%" minW={0} maxW="100%">
      {filteredGenres.length ? (
        <Box
          ref={scrollRef}
          w="100%"
          minW={0}
          maxW="100%"
          overflowX={{ base: "auto", lg: "visible" }}
          overflowY="hidden"
          pb={{ base: 2, lg: 0 }}
          overscrollBehaviorX="contain"
          css={{
            "&::-webkit-scrollbar": {
              height: "4px",
            },
            "&::-webkit-scrollbar-track": {
              background: "rgba(255, 95, 143, 0.16)",
              borderRadius: "999px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#ff5f8f",
              borderRadius: "999px",
            },
          }}
        >
          <Grid
            w={{ base: "max-content", lg: "100%" }}
            templateRows={{ base: "repeat(2, 110px)", lg: "none" }}
            templateColumns={{
              base: "none",
              lg: "repeat(3, minmax(0, 1fr))",
            }}
            gridAutoFlow={{ base: "column", lg: "row" }}
            gridAutoColumns={{ base: "144px", lg: "auto" }}
            gap={3}
          >
            {filteredGenres.map((item, index) => (
              <GridItem
                key={item.value}
                order={{
                  base: mobileOrder.get(item.value) ?? index,
                  lg: index,
                }}
              >
                <GenreListItem
                  genre={item}
                  active={item.value === selectedGenre}
                  onClick={() => navigate(`/genres/${item.value}`)}
                />
              </GridItem>
            ))}
          </Grid>
        </Box>
      ) : (
        <Text color="#aeb7cb" fontSize="sm" textAlign="center" py={4}>
          No genres found.
        </Text>
      )}
    </Stack>
  );
};

export default GenreLists;
