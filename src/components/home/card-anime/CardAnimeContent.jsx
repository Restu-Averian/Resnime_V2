import { Heading, Stack, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import useResponsive from "../../../hooks/useResponsive";
import Image from "../../global/Image";
import { Tooltip } from "../../ui/tooltip";

const CardAnimeContent = ({ data }) => {
  const { sm } = useResponsive();

  const title = useMemo(() => {
    return data?.title?.romaji;
  }, [data]);

  return (
    <Stack direction="row" alignItems="center">
      <Image src={data?.image} boxSize={sm ? 200 : 300} />

      <Stack>
        <Tooltip {...(title?.length > 49 && { content: title })}>
          <Heading
            as="h3"
            size="md"
            // noOfLines={2}
            textAlign="center"
          >
            {title}
          </Heading>
        </Tooltip>
        <Text className={`description ${sm && "mobile"}`} whiteSpace="pre-line">
          {data?.description}
        </Text>
      </Stack>
    </Stack>
  );
};
export default CardAnimeContent;
