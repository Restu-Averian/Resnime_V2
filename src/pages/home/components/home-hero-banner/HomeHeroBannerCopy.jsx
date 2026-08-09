import { ArrowRight } from "lucide-react";
import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";

function HomeHeroBannerCopy({ hero, titleSize, titleMaxW }) {
  return (
    <>
      <Stack gap="1">
        <Heading
          as="h1"
          textStyle="display"
          color="fg.heading"
          fontSize={titleSize}
          maxW={titleMaxW}
          lineHeight="1.1"
          mb="1"
        >
          {hero?.title_en}
        </Heading>

        <Text color="fg.muted" fontSize={{ base: "xs", md: "sm" }}>
          {hero?.type} {hero?.genres?.length > 0 ? `• ${hero?.genres.join(", ")}` : ""}
        </Text>
      </Stack>

      <Box w="50px" h="1px" bg="accent.primary" opacity={0.7} my="3" />

      <Text
        color="fg.muted"
        fontSize={{ base: "sm", md: "md" }}
        lineHeight={{ base: "1.45", md: "1.55" }}
        maxW={{ base: "280px", md: "340px" }}
        mb="4"
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
      >
        View Details

        <ArrowRight size={16} strokeWidth={1.5} style={{ marginLeft: "6px" }} />
      </Button>
    </>
  );
}

export default HomeHeroBannerCopy;
