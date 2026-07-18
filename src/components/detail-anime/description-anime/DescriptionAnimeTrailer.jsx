import { Heading } from "@chakra-ui/react";
import CardData from "../../global/CardData";

const DescriptionAnimeTrailer = ({ data }) => {
  return (
    <CardData useDefault header={<Heading>Trailer</Heading>}>
      <iframe
        width="320"
        height="160"
        src={`https://www.youtube.com/embed/${data?.trailer?.id}`}
        title={data?.title?.romaji}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </CardData>
  );
};
export default DescriptionAnimeTrailer;
