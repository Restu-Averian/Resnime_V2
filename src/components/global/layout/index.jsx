import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import MenuItemMobile from "./menu-item/MenuItemMobile";

function Layout({ children }) {
  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: "92px", md: "0" }}>
      <Navbar />
      {children}
      <MenuItemMobile />
    </Box>
  );
}

export default Layout;
