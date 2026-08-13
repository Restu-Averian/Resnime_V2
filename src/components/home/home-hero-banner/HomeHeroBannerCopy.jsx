import { ArrowRight } from "lucide-react";
import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function HomeHeroBannerCopy({ hero, titleSize }) {
  const navigate = useNavigate();

  return (
    <>
      <Stack gap="1">
        <Heading
          as="h1"
          textStyle="display"
          color="fg.heading"
          fontSize={titleSize}
          lineHeight="1.1"
          mb="1"
          maxW={{ base: "80%", md: "45%" }}
        >
          {hero?.title_en}
        </Heading>

        <Text
          color="fg.muted"
          fontSize={{ base: "xs", md: "sm" }}
          maxW={{ base: "80%", md: "45%" }}
        >
          {hero?.type}{" "}
          {hero?.genres?.length > 0 ? `• ${hero?.genres.join(", ")}` : ""}
        </Text>
      </Stack>

      <Box w="50px" h="1px" bg="accent.primary" opacity={0.7} my="3" />

      <Text
        color="fg.muted"
        fontSize={{ base: "xs", md: "md" }}
        lineHeight={{ base: "1.45", md: "1.55" }}
        mb={5}
        lineClamp={3}
        maxW={{ base: "80%", md: "45%" }}
      >
        {hero?.description}
      </Text>

      <Button
        size={{ base: "sm", md: "md" }}
        bg="#1c3a39"
        color="#a5c8c5"
        _hover={{ bg: "#234a49" }}
        borderRadius="md"
        px="4"
        fontWeight="normal"
        fontSize={{ base: "sm", md: "md" }}
        border="1px solid"
        borderColor="whiteAlpha.100"
        onClick={() => navigate(`/anime/${hero?.id}`)}
      >
        View Details
        <ArrowRight size={16} strokeWidth={1.5} style={{ marginLeft: "6px" }} />
      </Button>
    </>
  );
}

export default HomeHeroBannerCopy;
