import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Menu from "./Menu";

function Layout({ children }) {
  return (
    <Box minH="100vh" bg="bg.canvas" pb={{ base: "92px", md: "0" }}>
      <Navbar />
      {children}
      <Menu />
    </Box>
  );
}

export default Layout;
