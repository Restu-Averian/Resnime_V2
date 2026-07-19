import {
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  Kbd,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [search, setSearch] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const navigate = useNavigate();
  const query = useMemo(() => searchParam?.get("q") || "", [searchParam]);

  useEffect(() => {
    setSearch(query);
  }, [query]);

  const searchHandler = () => {
    const params = new URLSearchParams(searchParam);
    params.set("q", search.trim());
    params.delete("page");
    setSearchParam(params);
    navigate(`/search/?${params.toString()}`);
  };

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
              <Text
                color="#ff6d8f"
                fontSize="4xl"
                fontWeight="black"
                lineHeight={1}
                fontStyle="italic"
              >
                R
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                Resnime
              </Text>
            </HStack>
            <Box
              w={{ base: "calc(100vw - 32px)", md: "full" }}
              maxW={{ base: "calc(100vw - 32px)", lg: "100%" }}
              mx="auto"
            >
              <InputGroup startElement={<Search size={18} />}>
                <Input
                  type="search"
                  ps={10}
                  h="52px"
                  borderRadius="18px"
                  borderColor="rgba(255,255,255,0.1)"
                  bg="rgba(255,255,255,0.035)"
                  _placeholder={{ color: "gray.400" }}
                  placeholder="Search anime, episodes, genres..."
                  value={search}
                  onChange={({ target: { value } }) => {
                    setSearch(value);
                  }}
                  onKeyUp={(e) => {
                    if (e?.code === "Enter" || e?.key === "Enter") {
                      searchHandler();
                    }
                  }}
                />
              </InputGroup>
            </Box>
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
