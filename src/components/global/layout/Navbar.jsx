import MenuItemDesktop from "./menu-item/MenuItemDesktop";
import { Search } from "lucide-react";
import { Box, Container, Flex, IconButton, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Anime List", href: "/anime" },
  { label: "Anime Finder", href: "#" },
];

function Navbar() {
  const { pathname } = useLocation();
  const items = navItems.map((item) => ({
    ...item,
    isActive:
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
  }));

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="sticky"
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
            href="/"
            textStyle="display"
            fontSize={{ base: "4xl", md: "4xl" }}
            color="fg.heading"
            lineHeight="1"
          >
            Resnime
          </Text>

          <MenuItemDesktop items={items} />

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
