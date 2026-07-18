import {
  IconButton,
  SimpleGrid,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import VideoIcon from "../../../assets/custom-icons/VideoIcon";
import CardAnimeModal from "./CardAnimeModal";
import { useState } from "react";
import useResponsive from "../../../hooks/useResponsive";
import { Tooltip } from "../../ui/tooltip";

const CardAnimeFooter = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { sm } = useResponsive();

  return (
    <Stack
      direction={sm ? "column" : "row"}
      wrap
      justifyContent="space-between"
      width="100%"
      alignItems="center"
    >
      <SimpleGrid columns={3} spacing={5}>
        {data?.genres?.map((genre, idx) => (
          <Tag.Root key={idx}>
            <Tag.Label>{genre}</Tag.Label>
          </Tag.Root>
        ))}
      </SimpleGrid>

      <Stack direction="row">
        <Text>{data?.type}</Text>
        <Text>•</Text>
        <Text>{data?.totalEpisodes} Episodes</Text>
      </Stack>

      {data?.trailer?.id && (
        <Tooltip content="Trailer" showArrow>
          <IconButton
            borderRadius="full"
            borderWidth={0}
            colorPalette="teal"
            size="lg"
            variant="outline"
            style={{ color: "white" }}
            onClick={(e) => {
              e?.preventDefault();
              setIsOpen(true);
            }}
          >
            <VideoIcon />
          </IconButton>
        </Tooltip>
      )}
      <CardAnimeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={data}
      />
    </Stack>
  );
};
export default CardAnimeFooter;
