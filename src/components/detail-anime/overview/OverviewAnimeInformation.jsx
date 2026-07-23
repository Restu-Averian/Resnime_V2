import {
  Box as ChakraBox,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Building2,
  CalendarDays,
  CircleCheck,
  Info,
  ListVideo,
  SunMedium,
  Tag,
  Video,
} from "lucide-react";

const emptyValue = "Unknown";

const toDisplayValue = (value) => {
  if (Array.isArray(value)) return value.length ? value.join(", ") : emptyValue;
  return value || emptyValue;
};

/**
 * Details information card for anime overview tab.
 * @param {Object} props
 * @param {Object} props.data
 */
const OverviewAnimeInformation = ({ data }) => {
  const infoItems = [
    { label: "Genres", value: data?.genres, icon: Tag },
    { label: "Status", value: data?.status, icon: CircleCheck },
    { label: "Release Date", value: data?.releaseDate, icon: CalendarDays },
    { label: "Season", value: data?.season, icon: SunMedium },
    { label: "Studio", value: data?.studios, icon: Building2 },
    { label: "Type", value: data?.type, icon: Video },
    { label: "Episodes", value: data?.totalEpisodes, icon: ListVideo },
  ];

  return (
    <ChakraBox
      minH="310px"
      border="1px solid rgba(255,109,143,0.2)"
      borderRadius="14px"
      bg="rgba(15, 18, 43, 0.82)"
      boxShadow="inset 0 1px 0 rgba(255,255,255,0.05), 0 18px 55px rgba(0,0,0,0.22)"
      px={{ base: 5, md: 6 }}
      py={{ base: 5, md: 6 }}
    >
      <Stack gap={4}>
        <HStack gap={3} color="#ffc1d2">
          <Info size={22} color="#ff6d8f" />
          <Heading as="h3" fontSize={{ base: "lg", md: "xl" }}>
            Information
          </Heading>
        </HStack>

        <Stack gap={0}>
          {infoItems.map(({ label, value, icon }) => (
            <Flex
              key={label}
              align="center"
              justify="space-between"
              gap={4}
              py={2.5}
              borderBottom="1px solid rgba(255,255,255,0.07)"
              _last={{ borderBottom: 0 }}
            >
              <HStack gap={3} minW={0} color="gray.400">
                <Icon as={icon} boxSize={4} color="gray.300" />

                <Text fontSize="sm">{label}</Text>
              </HStack>

              <Text
                color="gray.100"
                fontSize="sm"
                textAlign="right"
                overflowWrap="anywhere"
              >
                {toDisplayValue(value)}
              </Text>
            </Flex>
          ))}
        </Stack>
      </Stack>
    </ChakraBox>
  );
};

export default OverviewAnimeInformation;
