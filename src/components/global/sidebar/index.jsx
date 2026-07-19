import { Flex } from "@chakra-ui/react";
import SidebarLogo from "./SidebarLogo";
import SidebarListMenu from "./SidebarListMenu";

const Sidebar = () => {
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
      <SidebarLogo />

      <SidebarListMenu />
    </Flex>
  );
};

export default Sidebar;
