import { HStack, Text } from "@chakra-ui/react";
import { Clock3, Star } from "lucide-react";

const StreamingAnimeMetadataScore = ({ score, meta }) => {
  return (
    <HStack gap={4} color="gray.100" flexWrap="wrap">
      {score && (
        <HStack gap={2}>
          <Star size={20} color="#ffd166" fill="#ffd166" />
          <Text fontWeight="bold" fontSize="lg">
            {score}
          </Text>
        </HStack>
      )}
      {meta && (
        <HStack gap={2}>
          <Clock3 size={19} />
          <Text fontSize="lg">{meta}</Text>
        </HStack>
      )}
    </HStack>
  );
};

export default StreamingAnimeMetadataScore;
