import { Button, Flex, Icon, Text } from "@chakra-ui/react";

const GenreListItem = ({ genre, active, onClick }) => (
  <Button
    type="button"
    display="flex"
    flexDir="column"
    justifyContent="center"
    alignItems="center"
    h="110px"
    w="100%"
    gap={3}
    p={2}
    borderRadius="16px"
    border={
      active ? "1px solid #ff5f8f" : "1px solid rgba(165, 183, 226, 0.08)"
    }
    bg={
      active
        ? "linear-gradient(180deg, rgba(255, 95, 143, 0.1) 0%, rgba(255, 95, 143, 0.02) 100%)"
        : "transparent"
    }
    boxShadow={active ? "0 0 20px rgba(255, 95, 143, 0.15)" : "none"}
    color={active ? "#fff" : "#aeb7cb"}
    onClick={onClick}
    _hover={{
      bg: "rgba(255, 95, 143, 0.05)",
      borderColor: "rgba(255, 95, 143, 0.3)",
      color: "#fff",
      "& > div": {
         borderColor: "rgba(255, 95, 143, 0.5)",
      }
    }}
    transition="all 0.2s"
  >
    <Flex
      justify="center"
      align="center"
      w="44px"
      h="44px"
      borderRadius="full"
      border="1px solid"
      borderColor={active ? "#ff5f8f" : "rgba(255, 95, 143, 0.2)"}
      boxShadow={active ? "0 0 15px rgba(255, 95, 143, 0.3)" : "none"}
      transition="all 0.2s"
    >
      <Icon as={genre.icon} boxSize={5} color={active ? "#ff5f8f" : "#ff8ba8"} />
    </Flex>
    <Text fontSize="13px" fontWeight={active ? "600" : "500"}>
      {genre.label}
    </Text>
  </Button>
);

export default GenreListItem;
