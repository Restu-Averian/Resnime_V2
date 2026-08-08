import { Search } from "lucide-react";
import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Link,
  Text,
} from "@chakra-ui/react";

const navItems = [
  { label: "Home", href: "#", isActive: true },
  { label: "Anime List", href: "#" },
  { label: "Anime Finder", href: "#" },
];

function Navbar() {
  return (
    <Box
      as="header"
      borderBottom="1px solid"
      borderColor={{ base: "transparent", md: "border.default" }}
      bg="bg.subtle"
    >
      <Container maxW="1600px" px={{ base: "5", xl: "10" }}>
        <Flex
          align="center"
          justify="space-between"
          minH={{ base: "86px", md: "72px" }}
          gap="8"
        >
          <Text
            as="a"
            href="#"
            textStyle="display"
            fontSize={{ base: "4xl", md: "4xl" }}
            color="fg.heading"
            lineHeight="1"
          >
            Resnime
          </Text>

          <HStack as="nav" display={{ base: "none", md: "flex" }} gap="9">
            {navItems.map((item) => (
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

          <IconButton
            aria-label="Search anime"
            display={{ base: "inline-flex", md: "none" }}
            variant="ghost"
            size="lg"
            color="fg.heading"
            _hover={{ bg: "transparent", color: "accent.hover" }}
          >
            <Search size={34} strokeWidth={1.5} />
          </IconButton>
        </Flex>
      </Container>
    </Box>
  );
}

export default Navbar;
