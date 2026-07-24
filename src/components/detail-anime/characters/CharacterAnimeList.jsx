import { Box, Button, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { Check } from "lucide-react";
import Image from "../../global/Image";
import CharacterAnimeRoleBadge from "./CharacterAnimeRoleBadge";
import { getName, getRole } from "../../../helpers/animeDetail";

const CharacterAnimeList = ({ characters, selectedId, setIdChar }) => {
  return (
    <GridItem
      border="1px solid rgba(255,255,255,0.11)"
      borderRadius="14px"
      bg="linear-gradient(180deg, rgba(10, 17, 31, 0.96), rgba(7, 13, 25, 0.96))"
      boxShadow="inset 0 1px 0 rgba(255,255,255,0.04)"
      overflow="hidden"
    >
      <Grid
        templateColumns={{
          base: "repeat(2, minmax(0, 1fr))",
          sm: "repeat(3, minmax(0, 1fr))",
          md: "repeat(4, minmax(0, 1fr))",
          lg: "repeat(5, minmax(0, 1fr))",
        }}
        gap={{ base: 4, md: 5 }}
        p={{ base: 4, md: 5 }}
      >
        {characters.map((char) => {
          const selected = char?.id === selectedId;
          const name = getName(char);
          const role = getRole(char?.role);

          return (
            <Button
              key={char?.id || name}
              type="button"
              aria-pressed={selected}
              onClick={() => setIdChar(char?.id)}
              variant="plain"
              h="auto"
              minW={0}
              p={0}
              display="block"
              borderRadius="12px"
              _focusVisible={{
                outline: "2px solid #ff6d8f",
                outlineOffset: "3px",
              }}
            >
              <Stack
                gap={2}
                align="center"
                position="relative"
                minH="170px"
                p={selected ? 3 : 2}
                borderRadius="12px"
                border={
                  selected
                    ? "1px solid rgba(255,109,143,0.78)"
                    : "1px solid transparent"
                }
                bg={selected ? "rgba(255,109,143,0.08)" : "transparent"}
                boxShadow={
                  selected ? "0 0 28px rgba(255,109,143,0.13)" : "none"
                }
                transition="border-color 160ms ease, background 160ms ease"
              >
                {selected && (
                  <Box
                    position="absolute"
                    top={3}
                    right={3}
                    display="grid"
                    placeItems="center"
                    boxSize="26px"
                    borderRadius="full"
                    bg="#ff6d8f"
                    color="white"
                    border="2px solid rgba(255,255,255,0.78)"
                  >
                    <Check size={16} strokeWidth={3} />
                  </Box>
                )}

                <Image
                  src={char?.image}
                  alt={name}
                  boxSize={{ base: "84px", md: "98px" }}
                  borderRadius="full"
                  objectFit="cover"
                  border="1px solid rgba(255,255,255,0.52)"
                  bg="rgba(255,255,255,0.08)"
                />

                <Text
                  w="full"
                  minH="20px"
                  color="gray.100"
                  fontSize={{ base: "sm", md: "md" }}
                  lineHeight={1.2}
                  textAlign="center"
                  lineClamp={1}
                >
                  {name}
                </Text>

                <CharacterAnimeRoleBadge role={role} />
              </Stack>
            </Button>
          );
        })}
      </Grid>
    </GridItem>
  );
};

export default CharacterAnimeList;
