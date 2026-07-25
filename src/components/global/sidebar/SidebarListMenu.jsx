import {
  HStack,
  Icon,
  Link as ChakraLink,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import {
  // Clapperboard,
  Compass,
  Grid2X2,
  // History,
  Home,
} from "lucide-react";

const navItems = [
  { label: "Home", icon: Home, to: "/", activePath: "/" },
  { label: "Browse", icon: Compass, to: "/search", activePath: "/search" },
  // { label: "New Episodes", icon: Clapperboard, to: "/search" },
  { label: "Genres", icon: Grid2X2, to: "/genres", activePath: "/genres" },
  // { label: "History", icon: History, to: "/search" },
];

const SidebarListMenu = ({ variant = "sidebar" }) => {
  const { pathname } = useLocation();
  const isMobile = variant === "mobile";
  const StackComponent = isMobile ? HStack : VStack;

  return (
    <StackComponent
      as="nav"
      align={isMobile ? "center" : "stretch"}
      justify={isMobile ? "space-between" : "flex-start"}
      gap={isMobile ? 0 : 2}
      w="100%"
    >
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
            flexDirection={isMobile ? "column" : "row"}
            alignItems="center"
            justifyContent={isMobile ? "center" : "flex-start"}
            flex={isMobile ? 1 : "initial"}
            gap={isMobile ? 1 : 4}
            minH={isMobile ? "68px" : "auto"}
            px={isMobile ? 2 : 4}
            py={isMobile ? 2 : 3}
            borderRadius={isMobile ? 0 : "8px"}
            color={active ? "#ff6d8f" : "gray.300"}
            bg={
              !isMobile && active ? "rgba(255, 109, 143, 0.13)" : "transparent"
            }
            borderLeft={
              !isMobile
                ? active
                  ? "3px solid #ff6d8f"
                  : "3px solid transparent"
                : 0
            }
            _hover={{ textDecoration: "none", bg: "rgba(255,255,255,0.06)" }}
          >
            <Icon as={item.icon} boxSize={isMobile ? 6 : 5} />
            <Text
              fontSize={isMobile ? "sm" : "md"}
              fontWeight={active ? "semibold" : "medium"}
            >
              {item.label}
            </Text>
          </ChakraLink>
        );
      })}
    </StackComponent>
  );
};

export default SidebarListMenu;
