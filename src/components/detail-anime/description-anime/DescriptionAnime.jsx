import { Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import CardData from "../../global/CardData";
import useResponsive from "../../../hooks/useResponsive";
import DescriptionAnimeInfo from "./DescriptionAnimeInfo";
import DescriptionAnimeTrailer from "./DescriptionAnimeTrailer";
import Box from "../../global/Box";

const DescriptionAnime = ({ data }) => {
  const { sm } = useResponsive();

  return (
    <Grid
      gap={5}
      {...(sm
        ? {
            templateRows: "repeat(2,1fr)",
          }
        : {
            templateColumns: "repeat(4,1fr)",
          })}
    >
      <GridItem
        {...(!sm && {
          colSpan: 2,
        })}
      >
        <CardData
          header={<Heading>Description</Heading>}
          useDefault
          height={300}
          className="description"
          overflowY="scroll"
        >
          <Text whiteSpace="pre-line">{data?.description}</Text>
        </CardData>
      </GridItem>

      <GridItem>
        <DescriptionAnimeInfo data={data} />
      </GridItem>
      <GridItem>
        <Box showIf={data?.trailer && Object.keys(data?.trailer)?.length > 0}>
          <DescriptionAnimeTrailer data={data} />
        </Box>
      </GridItem>
    </Grid>
  );
};
export default DescriptionAnime;
