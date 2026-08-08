import { Flex, Link, Text } from "@chakra-ui/react";
import { Home, List, Search } from "lucide-react";

const mobileNavItems = [
  { label: "Home", href: "#", icon: Home, isActive: true },
  { label: "Anime List", href: "#", icon: List },
  { label: "Anime Finder", href: "#", icon: Search },
];

function MenuItemMobile() {
  return (
    <Flex
      as="nav"
      display={{ base: "grid", md: "none" }}
      gridTemplateColumns="repeat(3, 1fr)"
      position="fixed"
      zIndex="sticky"
      left="4"
      right="4"
      bottom="3"
      h="78px"
      overflow="hidden"
      border="1px solid"
      borderColor="border.default"
      borderRadius="panel"
      bg="rgba(4, 24, 41, 0.94)"
      boxShadow="panel"
      backdropFilter="blur(12px)"
    >
      {mobileNavItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            href={item.href}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="1"
            color={item.isActive ? "accent.primary" : "fg.heading"}
            bg={item.isActive ? "rgba(103, 198, 186, 0.12)" : "transparent"}
            fontFamily="heading"
            fontSize="md"
            lineHeight="1"
            textDecoration="none"
            _hover={{ color: "accent.hover", textDecoration: "none" }}
          >
            <Icon size={25} strokeWidth={1.6} />
            <Text as="span">{item.label}</Text>
          </Link>
        );
      })}
    </Flex>
  );
}

export default MenuItemMobile;
