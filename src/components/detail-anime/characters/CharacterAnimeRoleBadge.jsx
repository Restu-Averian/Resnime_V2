import { Badge } from "@chakra-ui/react";

const CharacterAnimeRoleBadge = ({ role }) => {
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

export default CharacterAnimeRoleBadge;
