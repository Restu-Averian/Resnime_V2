import { Box, Flex, HStack, Icon, Link as ChakraLink, Text, VStack } from "@chakra-ui/react";
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
  { label: "Home", icon: Home, to: "/" },
  { label: "Browse", icon: Compass, to: "/search" },
  { label: "New Episodes", icon: Clapperboard, to: "/search" },
  { label: "Genres", icon: Grid2X2, to: "/search" },
  { label: "Bookmarks", icon: Bookmark, to: "/search" },
  { label: "History", icon: History, to: "/search" },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <Flex
      as="aside"
      display={{ base: "none", lg: "flex" }}
      direction="column"
      position="fixed"
      insetY={0}
      left={0}
      w="270px"
      px={4}
      py={7}
      bg="linear-gradient(180deg, rgba(8, 13, 28, 0.98), rgba(8, 15, 31, 0.9))"
      borderRight="1px solid rgba(255,255,255,0.08)"
      overflow="hidden"
      zIndex={20}
    >
      <HStack gap={4} mb={9} px={2}>
        <Text
          color="#ff6d8f"
          fontSize="5xl"
          fontWeight="black"
          lineHeight={1}
          fontStyle="italic"
        >
          R
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          Resnime
        </Text>
      </HStack>

      <VStack as="nav" align="stretch" gap={2}>
        {navItems.map((item) => {
          const active = item.to === "/" ? pathname === "/" : false;

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
              <Text fontWeight={active ? "semibold" : "medium"}>{item.label}</Text>
            </ChakraLink>
          );
        })}
      </VStack>

      <Box
        mt="auto"
        mx={-4}
        mb={-7}
        h="330px"
        bg="radial-gradient(circle at 50% 25%, rgba(255, 118, 153, 0.24), transparent 28%), linear-gradient(180deg, transparent, rgba(12, 23, 45, 0.92)), linear-gradient(135deg, #192648, #071020 70%)"
        opacity={0.9}
      />
    </Flex>
  );
};

export default Sidebar;
