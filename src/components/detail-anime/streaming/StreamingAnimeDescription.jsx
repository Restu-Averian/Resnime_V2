import { Text } from "@chakra-ui/react";

const StreamingAnimeDescription = ({ data, title, episodeName }) => {
  return (
    <Text
      color="gray.100"
      fontSize={{ base: "md", md: "lg" }}
      lineHeight={1.7}
      lineClamp={6}
    >
      {data?.description || `${title} continues with ${episodeName}.`}
    </Text>
  );
};

export default StreamingAnimeDescription;
