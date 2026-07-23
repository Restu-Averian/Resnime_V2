import { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Check, ChevronDown, Globe2, Info, MoreVertical } from "lucide-react";
import Image from "../../global/Image";

const languageColors = {
  Japanese: {
    color: "#ff7896",
    bg: "rgba(255, 109, 143, 0.13)",
    border: "rgba(255, 109, 143, 0.42)",
  },
  English: {
    color: "#60a5fa",
    bg: "rgba(96, 165, 250, 0.12)",
    border: "rgba(96, 165, 250, 0.38)",
  },
  "Spanish (LA)": {
    color: "#2dd4bf",
    bg: "rgba(45, 212, 191, 0.12)",
    border: "rgba(45, 212, 191, 0.38)",
  },
  "Portuguese (BR)": {
    color: "#c4a7ff",
    bg: "rgba(196, 167, 255, 0.12)",
    border: "rgba(196, 167, 255, 0.38)",
  },
};

const getName = (person) => person?.name?.full || "";
const getRole = (role) => (role ? String(role).toUpperCase() : "");

const RoleBadge = ({ role }) => {
  if (!role) return null;

  const supporting = role === "SUPPORTING";

  return (
    <Badge
      alignSelf="center"
      px={3}
      py={0.5}
      borderRadius="6px"
      fontSize="10px"
      fontWeight="700"
      lineHeight={1.2}
      color={supporting ? "#facc15" : "#ff7896"}
      bg={supporting ? "rgba(250, 204, 21, 0.12)" : "rgba(255, 109, 143, 0.14)"}
      border={`1px solid ${
        supporting ? "rgba(250, 204, 21, 0.38)" : "rgba(255, 109, 143, 0.38)"
      }`}
    >
      {role}
    </Badge>
  );
};

const CharacterAnime = ({ data }) => {
  const characters = Array.isArray(data?.characters) ? data.characters : [];
  const [idChar, setIdChar] = useState();
  const charactersSelected =
    characters.find((char) => char?.id === idChar) || characters[0];

  const selectedId = charactersSelected?.id;
  const voiceActors = Array.isArray(charactersSelected?.voiceActors)
    ? charactersSelected.voiceActors
    : [];
  const visibleVoiceActors = voiceActors.slice(0, 4);

  if (!characters.length) return null;

  return (
    <Grid
      templateColumns={{
        base: "1fr",
        xl: "minmax(0, 1.25fr) minmax(360px, 0.95fr)",
      }}
      gap={{ base: 5, xl: 8 }}
      alignItems="start"
    >
      <GridItem
        border="1px solid rgba(255,255,255,0.11)"
        borderRadius="14px"
        bg="linear-gradient(180deg, rgba(10, 17, 31, 0.96), rgba(7, 13, 25, 0.96))"
        boxShadow="inset 0 1px 0 rgba(255,255,255,0.04)"
        overflow="hidden"
      >
        <HStack
          gap={2}
          px={{ base: 4, md: 5 }}
          pt={4}
          pb={3}
          color="gray.400"
          fontSize="sm"
          borderBottom="1px solid rgba(255,255,255,0.08)"
        >
          <Icon as={Info} boxSize={4} />
          <Text>Select a character to see available voice actors.</Text>
        </HStack>

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
                  <RoleBadge role={role} />
                </Stack>
              </Button>
            );
          })}
        </Grid>
      </GridItem>

      <GridItem
        border="1px solid rgba(255,109,143,0.44)"
        borderRadius="16px"
        bg="linear-gradient(180deg, rgba(28, 18, 32, 0.86), rgba(12, 18, 31, 0.98))"
        boxShadow="0 18px 58px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.04)"
        overflow="hidden"
      >
        <Stack gap={0} p={{ base: 4, md: 5 }}>
          <Text color="#ff8fab" fontWeight="800" fontSize="sm" mb={4}>
            Voice Actors
          </Text>

          <HStack gap={4} pb={5}>
            <Image
              src={charactersSelected?.image}
              alt={getName(charactersSelected)}
              boxSize={{ base: "64px", md: "76px" }}
              borderRadius="full"
              objectFit="cover"
              border="1px solid rgba(255,255,255,0.38)"
              bg="rgba(255,255,255,0.08)"
            />
            <Stack gap={1} minW={0} flex={1}>
              <HStack gap={3} wrap="wrap">
                <Text
                  color="white"
                  fontSize={{ base: "lg", md: "2xl" }}
                  fontWeight="800"
                  lineHeight={1.1}
                  lineClamp={1}
                >
                  {getName(charactersSelected)}
                </Text>
                <RoleBadge role={getRole(charactersSelected?.role)} />
              </HStack>
              <Text color="gray.400" fontSize="sm">
                {getRole(charactersSelected?.role)
                  ? `${getRole(charactersSelected?.role)[0]}${getRole(
                      charactersSelected?.role,
                    )
                      .slice(1)
                      .toLowerCase()} Character`
                  : ""}
              </Text>
            </Stack>
          </HStack>

          <Box h="1px" bg="rgba(255,255,255,0.1)" />

          <HStack justify="space-between" gap={3} py={4}>
            <Text color="gray.100" fontWeight="700" fontSize="sm">
              Available Voice Actors
            </Text>
            <HStack color="gray.400" gap={2} fontSize="sm">
              <Globe2 size={16} />
              <Text>Multiple Languages</Text>
            </HStack>
          </HStack>

          <Stack gap={2}>
            {visibleVoiceActors.map((va) => {
              const lang = va?.language || "";
              const langStyle = languageColors[lang] || {
                color: "#cbd5e1",
                bg: "rgba(203, 213, 225, 0.1)",
                border: "rgba(203, 213, 225, 0.24)",
              };

              return (
                <HStack
                  key={va?.id || getName(va)}
                  minH="58px"
                  gap={3}
                  px={3}
                  py={2}
                  borderRadius="10px"
                  bg="rgba(255,255,255,0.075)"
                  border="1px solid rgba(255,255,255,0.04)"
                >
                  <Image
                    src={va?.image}
                    alt={getName(va)}
                    boxSize="42px"
                    borderRadius="full"
                    objectFit="cover"
                    bg="rgba(255,255,255,0.08)"
                  />
                  <HStack minW={0} flex={1} gap={3}>
                    <Text color="gray.100" fontWeight="600" lineClamp={1}>
                      {getName(va)}
                    </Text>
                    {lang && (
                      <Badge
                        px={2.5}
                        py={0.5}
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight="500"
                        color={langStyle.color}
                        bg={langStyle.bg}
                        border={`1px solid ${langStyle.border}`}
                      >
                        {lang}
                      </Badge>
                    )}
                  </HStack>
                  <Text color="gray.300" fontSize="sm">
                    Voice Actor
                  </Text>
                  <Box color="gray.300" aria-hidden="true">
                    <MoreVertical size={18} />
                  </Box>
                </HStack>
              );
            })}
          </Stack>

          {voiceActors.length > 4 && (
            <Button
              mt={3}
              h="40px"
              variant="outline"
              borderRadius="8px"
              borderColor="rgba(255,109,143,0.45)"
              color="gray.100"
              bg="transparent"
              _hover={{ bg: "rgba(255,109,143,0.08)" }}
            >
              View all languages ({voiceActors.length})
              <ChevronDown size={16} />
            </Button>
          )}
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default CharacterAnime;
