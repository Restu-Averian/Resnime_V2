import {
  Box,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import SidebarListMenu from "./sidebar/SidebarListMenu";
import NavbarSearchBox from "./navbar/NavbarSearchBox";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex minH="100vh" bg="#050b16" color="white">
      {isDesktop && <Sidebar />}

      <Stack
        direction="column"
        gap={0}
        flex={1}
        minW={0}
        w={{ base: "100%", lg: "calc(100% - 270px)" }}
        maxW={{ base: "100%", lg: "calc(100% - 270px)" }}
        ml={{ base: 0, lg: "270px" }}
      >
        <Box
          position="sticky"
          top={0}
          zIndex={19}
          px={{ base: 4, md: 8 }}
          pt={{ base: 4, md: 5 }}
          pb={3}
          bg="rgba(5, 11, 22, 0.86)"
          backdropFilter="blur(18px)"
          borderBottom="1px solid rgba(255,255,255,0.04)"
        >
          <Stack
            direction={{ base: "column", md: "row" }}
            align={{ base: "stretch", md: "center" }}
            gap={4}
          >
            <HStack
              display={{ base: "flex", lg: "none" }}
              cursor="pointer"
              onClick={() => navigate("/")}
              gap={3}
              minW="fit-content"
            >
              <Image src="/icon.png" alt="Resnime logo" w="32px" h="32px" />
              <Text fontSize="xl" fontWeight="bold">
                Resnime
              </Text>
            </HStack>

            <NavbarSearchBox />
          </Stack>
        </Box>
        <Box className="content" pb={{ base: "112px", lg: 8 }}>
          {children}
        </Box>
      </Stack>

      {!isDesktop && (
        <Box
          position="fixed"
          left={{ base: 4, md: 8 }}
          right={{ base: 4, md: 8 }}
          bottom={{ base: 3, md: 4 }}
          zIndex={30}
          borderRadius="14px"
          bg="rgba(5, 11, 22, 0.88)"
          border="1px solid rgba(255,255,255,0.09)"
          boxShadow="0 18px 48px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.04)"
          backdropFilter="blur(18px)"
          overflow="hidden"
        >
          <SidebarListMenu variant="mobile" />
        </Box>
      )}
    </Flex>
  );
};
export default Layout;
