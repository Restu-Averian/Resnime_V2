import { Grid, GridItem, Stack } from "@chakra-ui/react";
import OverviewAnimeHeader from "./OverviewAnimeHeader";
import OverviewAnimeStorySummary from "./OverviewAnimeStorySummary";
import OverviewAnimeInformation from "./OverviewAnimeInformation";

/**
 * Overview tab content combining header, story summary, and information.
 * @param {Object} props
 * @param {Object} props.data
 */
const OverviewAnime = ({ data }) => {
  return (
    <Stack gap={4}>
      <OverviewAnimeHeader />

      <Grid templateColumns={{ base: "1fr", xl: "1.42fr 1fr" }} gap={7}>
        <GridItem minW={0}>
          <OverviewAnimeStorySummary data={data} />
        </GridItem>

        <GridItem minW={0}>
          <OverviewAnimeInformation data={data} />
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default OverviewAnime;
