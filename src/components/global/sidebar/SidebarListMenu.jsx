import { Icon, Link as ChakraLink, Text, VStack } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import {
  Bookmark,
  Clapperboard,
  Compass,
  Grid2X2,
  History,
  Home,
} from "lucide-react";

const navItems = [
  { label: "Home", icon: Home, to: "/", activePath: "/" },
  { label: "Browse", icon: Compass, to: "/search", activePath: "/search" },
  { label: "New Episodes", icon: Clapperboard, to: "/search" },
  { label: "Genres", icon: Grid2X2, to: "/genres", activePath: "/genres" },
  { label: "Bookmarks", icon: Bookmark, to: "/search" },
  { label: "History", icon: History, to: "/search" },
];

const SidebarListMenu = () => {
  const { pathname } = useLocation();

  return (
    <VStack as="nav" align="stretch" gap={2}>
      {navItems.map((item) => {
        const active = item.activePath
          ? item.activePath === "/"
            ? pathname === "/"
            : pathname.startsWith(item.activePath)
          : false;

        return (
          <ChakraLink
            as={Link}
            key={item.label}
            to={item.to}
            aria-current={active ? "page" : undefined}
            display="flex"
            alignItems="center"
            gap={4}
            px={4}
            py={3}
            borderRadius="8px"
            color={active ? "#ff6d8f" : "gray.300"}
            bg={active ? "rgba(255, 109, 143, 0.13)" : "transparent"}
            borderLeft={active ? "3px solid #ff6d8f" : "3px solid transparent"}
            _hover={{ textDecoration: "none", bg: "rgba(255,255,255,0.06)" }}
          >
            <Icon as={item.icon} boxSize={5} />
            <Text fontWeight={active ? "semibold" : "medium"}>
              {item.label}
            </Text>
          </ChakraLink>
        );
      })}
    </VStack>
  );
};

export default SidebarListMenu;
