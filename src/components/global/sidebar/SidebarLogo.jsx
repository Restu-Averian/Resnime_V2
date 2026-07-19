import { HStack, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SidebarLogo = () => {
  const navigate = useNavigate();

  return (
    <HStack
      gap={4}
      mb={9}
      px={2}
      cursor="pointer"
      onClick={() => navigate("/")}
    >
      <Image src="/icon.png" alt="Resnime logo" w="40px" h="40px" />
      <Text fontSize="2xl" fontWeight="bold" color="white">
        Resnime
      </Text>
    </HStack>
  );
};

export default SidebarLogo;
