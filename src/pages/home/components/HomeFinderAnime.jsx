import { ArrowRight, ScanSearch } from "lucide-react";
import { Box, Flex, HStack, Link, Stack, Text } from "@chakra-ui/react";

function HomeFinderAnime({ promo }) {
  return (
    <Flex
      layerStyle="panel"
      minH="235px"
      align="center"
      gap={{ base: "7", md: "10" }}
      overflow="hidden"
      p={{ base: "7", md: "10" }}
      position="relative"
    >
      <Box
        position="absolute"
        insetY="-40px"
        right="-70px"
        w="320px"
        opacity="0.28"
        bg="radial-gradient(circle at 55% 55%, rgba(103, 198, 186, 0.32), transparent 58%)"
      />

      <Box
        position="absolute"
        right="42px"
        bottom="-120px"
        w="300px"
        h="300px"
        border="1px solid"
        borderColor="border.default"
        borderRadius="999px"
        opacity="0.4"
      />

      <Box color="accent.primary" flex="0 0 auto" position="relative">
        <ScanSearch size={118} strokeWidth={1.15} />
      </Box>

      <Stack gap="5" maxW="430px" position="relative">
        <Stack gap="3">
          <Text textStyle="sectionTitle" color="fg.heading">
            {promo.title}
          </Text>
          <Text
            color="fg.default"
            fontSize={{ base: "md", md: "lg" }}
            lineHeight="1.7"
          >
            {promo.description}
          </Text>
        </Stack>

        <Link
          href="#"
          color="accent.primary"
          fontFamily="heading"
          fontSize="xl"
          textDecoration="none"
          _hover={{ color: "accent.hover", textDecoration: "none" }}
        >
          <HStack gap="4">
            <Text>{promo.cta}</Text>
            <ArrowRight size={20} strokeWidth={1.7} />
          </HStack>
        </Link>
      </Stack>
    </Flex>
  );
}

export default HomeFinderAnime;
