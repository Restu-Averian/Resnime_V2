import { ArrowRight, ScanSearch } from "lucide-react";
import { Box, Flex, HStack, Link, Stack, Text } from "@chakra-ui/react";

function HomeFinderAnime({ promo }) {
  return (
    <Flex
      layerStyle="panel"
      direction={{ base: "column", md: "row" }}
      minH={{ base: "auto", md: "235px" }}
      align={{ base: "stretch", md: "center" }}
      gap={{ base: "4", md: "10" }}
      w="full"
      minW="0"
      overflow="hidden"
      p={{ base: "5", md: "10" }}
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

      <HStack
        display={{ base: "flex", md: "none" }}
        align="center"
        gap="4"
        w="full"
        position="relative"
      >
        <Box color="accent.primary" flex="0 0 auto">
          <ScanSearch size={52} strokeWidth={1.15} />
        </Box>

        <Stack gap={{ base: "2", md: "3" }} minW="0" flex="1">
          <Text
            textStyle="sectionTitle"
            color="fg.heading"
            fontSize={{ base: "lg", sm: "xl" }}
            lineHeight="1.2"
          >
            {promo.title}
          </Text>
          <Text
            color="fg.default"
            fontSize={{ base: "sm", sm: "md" }}
            lineHeight={{ base: "1.55", md: "1.7" }}
            overflowWrap="break-word"
          >
            {promo.description}
          </Text>
        </Stack>
      </HStack>

      <Box
        display={{ base: "none", md: "block" }}
        color="accent.primary"
        flex="0 0 auto"
        position="relative"
      >
        <ScanSearch size={118} strokeWidth={1.15} />
      </Box>

      <Stack
        display={{ base: "none", md: "flex" }}
        gap="5"
        maxW="430px"
        position="relative"
      >
        <Stack gap="3">
          <Text textStyle="sectionTitle" color="fg.heading">
            {promo.title}
          </Text>
          <Text
            color="fg.default"
            fontSize={{ md: "md", xl: "lg" }}
            lineHeight="1.7"
          >
            {promo.description}
          </Text>
        </Stack>

        <Link
          href="#"
          flex="0 0 auto"
          color="accent.primary"
          fontFamily="heading"
          fontSize={{ md: "lg", xl: "xl" }}
          textDecoration="none"
          _hover={{ color: "accent.hover", textDecoration: "none" }}
        >
          <HStack gap="4">
            <Text>{promo.cta}</Text>
            <ArrowRight size={20} strokeWidth={1.7} />
          </HStack>
        </Link>
      </Stack>

      <Link
        href="#"
        display={{ base: "inline-flex", md: "none" }}
        alignSelf="flex-start"
        alignItems="center"
        gap="3"
        color="accent.primary"
        fontFamily="heading"
        fontSize={{ base: "md", sm: "lg" }}
        lineHeight="1.25"
        textDecoration="none"
        position="relative"
        _hover={{ color: "accent.hover", textDecoration: "none" }}
      >
        <Text>{promo.cta}</Text>
        <ArrowRight size={18} strokeWidth={1.7} />
      </Link>
    </Flex>
  );
}

export default HomeFinderAnime;
