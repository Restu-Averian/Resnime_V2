import { useMemo } from "react";
import {
  Badge,
  Box,
  Button,
  GridItem,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChevronDown, Globe2, X } from "lucide-react";
import Image from "../../global/Image";
import CharacterAnimeRoleBadge from "./CharacterAnimeRoleBadge";
import { LANGUAGE_COLORS } from "../../../constants/detail-anime/detail-anime-characters";
import { getName, getRole } from "../../../helpers/animeDetail";

const CharacterAnimeVoiceActors = ({
  charactersSelected,
  voiceActors,
  visibleVoiceActors,
  onClose,
}) => {
  const characterRoleText = useMemo(() => {
    const role = getRole(charactersSelected?.role);
    if (!role) return "";
    return `${role[0]}${role.slice(1).toLowerCase()} Character`;
  }, [charactersSelected?.role]);

  return (
    <GridItem
      border="1px solid rgba(255,109,143,0.44)"
      borderRadius="16px"
      bg="linear-gradient(180deg, rgba(28, 18, 32, 0.86), rgba(12, 18, 31, 0.98))"
      boxShadow="0 18px 58px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.04)"
      overflow="hidden"
    >
      <Stack gap={0} p={{ base: 4, md: 5 }}>
        <HStack justify="space-between" mb={4}>
          <Text color="#ff8fab" fontWeight="800" fontSize="sm">
            Voice Actors
          </Text>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            color="gray.400"
            _hover={{ color: "white", bg: "rgba(255,255,255,0.1)" }}
            p={0}
            minW="auto"
            h="auto"
            aria-label="Close voice actors"
          >
            <X size={20} />
          </Button>
        </HStack>

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

              <CharacterAnimeRoleBadge
                role={getRole(charactersSelected?.role)}
              />
            </HStack>

            <Text color="gray.400" fontSize="sm">
              {characterRoleText}
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
            const langStyle = LANGUAGE_COLORS[lang] || {
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
  );
};

export default CharacterAnimeVoiceActors;
