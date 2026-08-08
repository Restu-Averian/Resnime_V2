import { ArrowRight } from "lucide-react";
import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";

function HomeHeroBanner({ hero }) {
  return (
    <Box
      as="section"
      layerStyle="panel"
      minH={{ base: "420px", lg: "340px" }}
      overflow="hidden"
      position="relative"
      bgImage={`linear-gradient(90deg, rgba(3, 17, 31, 0.96) 0%, rgba(3, 17, 31, 0.8) 28%, rgba(3, 17, 31, 0.18) 62%, rgba(3, 17, 31, 0.06) 100%), url(${hero.imageUrl})`}
      bgPosition={{ base: "62% center", lg: "center" }}
      bgRepeat="no-repeat"
      bgSize="cover"
      boxShadow="panel"
    >
      <Stack
        align="flex-start"
        gap="5"
        justify="center"
        minH={{ base: "420px", lg: "340px" }}
        maxW={{ base: "100%", md: "580px" }}
        px={{ base: "6", md: "12" }}
        py={{ base: "10", md: "12" }}
      >
        <Stack gap="2">
          <Heading
            as="h1"
            textStyle="display"
            color="fg.heading"
            fontSize={{ base: "4xl", md: "5xl" }}
            maxW={{ base: "620px", xl: "780px" }}
          >
            {hero.title}
          </Heading>

          <Text color="fg.muted" fontSize={{ base: "sm", md: "md" }}>
            {hero.meta}
          </Text>
        </Stack>

        <Box w="62px" h="2px" bg="accent.primary" />

        <Text
          color="fg.default"
          fontSize={{ base: "md", md: "lg" }}
          lineHeight="1.7"
          maxW="410px"
        >
          {hero.description}
        </Text>

        <Button size="lg" mt="1">
          {hero.cta}
          <ArrowRight size={20} strokeWidth={1.8} />
        </Button>
      </Stack>
    </Box>
  );
}

export default HomeHeroBanner;
