import { Box, Container, Flex, HStack, Link, Text } from "@chakra-ui/react";

function HomeNavbar({ items }) {
  return (
    <Box
      as="header"
      borderBottom="1px solid"
      borderColor="border.default"
      bg="bg.subtle"
    >
      <Container maxW="1600px" px={{ base: "5", xl: "10" }}>
        <Flex align="center" justify="space-between" minH="72px" gap="8">
          <Text
            as="a"
            href="#"
            textStyle="display"
            fontSize={{ base: "3xl", md: "4xl" }}
            color="fg.heading"
            lineHeight="1"
          >
            Resnime
          </Text>

          <HStack as="nav" gap={{ base: "5", md: "9" }}>
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                position="relative"
                color={item.isActive ? "accent.primary" : "fg.heading"}
                fontFamily="heading"
                fontSize={{ base: "md", md: "xl" }}
                lineHeight="1"
                textDecoration="none"
                _hover={{ color: "accent.hover", textDecoration: "none" }}
                _after={{
                  content: '""',
                  position: "absolute",
                  left: "0",
                  right: "0",
                  bottom: "-18px",
                  h: "1px",
                  bg: item.isActive ? "accent.primary" : "transparent",
                }}
              >
                {item.label}
              </Link>
            ))}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default HomeNavbar;
