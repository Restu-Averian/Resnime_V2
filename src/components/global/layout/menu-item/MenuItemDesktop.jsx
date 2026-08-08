import { HStack, Link } from "@chakra-ui/react";

function MenuItemDesktop({ items }) {
  return (
    <HStack as="nav" display={{ base: "none", md: "flex" }} gap="9">
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
  );
}

export default MenuItemDesktop;
