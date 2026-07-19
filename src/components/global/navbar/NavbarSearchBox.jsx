import { Box, Input, InputGroup } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const NavbarSearchBox = () => {
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
  );
};

export default NavbarSearchBox;
