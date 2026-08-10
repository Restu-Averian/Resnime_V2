import { Box, Input } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

function AnimeListSearchInput({ onSearchChange }) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearchChange) {
        onSearchChange(search.trim());
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, onSearchChange]);

  return (
    <Box position="relative" w={{ base: "full", md: "360px" }}>
      <Box
        position="absolute"
        left="4"
        top="50%"
        transform="translateY(-50%)"
        color="fg.subtle"
        pointerEvents="none"
        zIndex="1"
      >
        <Search size={18} strokeWidth={1.5} />
      </Box>
      <Input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search anime..."
        aria-label="Search anime"
        h="52px"
        ps="11"
        bg="bg.surface"
        borderColor="border.default"
      />
    </Box>
  );
}

export default AnimeListSearchInput;
