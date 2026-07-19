import { Box, Flex, HStack, Image, Kbd, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import NavbarSearchBox from "./navbar/NavbarSearchBox";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Flex minH="100vh" bg="#050b16" color="white" overflowX="hidden">
      <Sidebar />

      <Stack
        direction="column"
        gap={0}
        flex={1}
        minW={0}
        w={{ base: "100vw", lg: "calc(100vw - 270px)" }}
        maxW={{ base: "100vw", lg: "calc(100vw - 270px)" }}
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
          overflowX="hidden"
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

            <Kbd display={{ base: "none", md: "inline-flex" }}>/</Kbd>
          </Stack>
        </Box>
        <Box className="content" overflowX="hidden">
          {children}
        </Box>
      </Stack>
    </Flex>
  );
};
export default Layout;
