import { Button, Icon, Text } from "@chakra-ui/react";
import { CircleCheck } from "lucide-react";
import PropTypes from "prop-types";

const GenreListItem = ({ genre, active, onClick }) => (
  <Button
    type="button"
    justifyContent="flex-start"
    h="64px"
    px={5}
    gap={4}
    borderRadius="8px"
    border={
      active ? "1px solid #ff5f8f" : "1px solid rgba(165, 183, 226, 0.16)"
    }
    bg={
      active
        ? "linear-gradient(135deg, rgba(255, 95, 143, 0.18), rgba(255,255,255,0.045))"
        : "linear-gradient(145deg, rgba(20, 27, 50, 0.78), rgba(13, 20, 39, 0.88))"
    }
    boxShadow={active ? "0 0 0 1px rgba(255, 95, 143, 0.18)" : "none"}
    color="#f5f7ff"
    onClick={onClick}
    _hover={{
      bg: "linear-gradient(145deg, rgba(31, 39, 68, 0.9), rgba(16, 24, 44, 0.96))",
      borderColor: "rgba(255, 95, 143, 0.46)",
    }}
  >
    <Icon as={genre.icon} boxSize={5.5} color="#ff5f8f" />
    <Text flex={1} textAlign="left" fontSize="sm" fontWeight="700">
      {genre.label}
    </Text>
    {active ? <CircleCheck size={20} fill="#ff5f8f" color="#ffedf3" /> : null}
  </Button>
);

GenreListItem.propTypes = {
  genre: PropTypes.object,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default GenreListItem;
