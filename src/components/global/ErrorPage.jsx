import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Heart,
  Home,
  Menu,
  RotateCw,
  ShieldCheck,
} from "lucide-react";
import imageError from "../../assets/image_error.webp";

/**
 * @typedef BtnActionProps
 * @property {(() => void)} [onClick]
 * @property {string} [text]
 */
/**
 * @param {Object} props
 * @param {string} [props.src]
 * @param {string} [props.title]
 * @param {string | Element} [props.subTitle]
 * @param {string} [props.technicalDetails]
 * @param {BtnActionProps} [props.btnAction]
 * @param {BtnActionProps} [props.secondaryBtnAction]
 * @returns {Element}
 */
const ErrorPage = ({
  src = imageError,
  title = "Something went wrong",
  subTitle = "This page couldn't load properly.\nTry refreshing the page, or go back and continue browsing anime.",
  technicalDetails = "Failed to load:/components/detail-anime/characters/CharacterAnime.jsx",
  btnAction,
  secondaryBtnAction,
}) => {
  const navigate = useNavigate();

  const [showDetails, setShowDetails] = useState(true);
  const [copied, setCopied] = useState(false);

  const displayTechnicalDetails =
    technicalDetails ||
    (typeof subTitle === "string" &&
    (subTitle.includes(":") ||
      subTitle.includes("Failed") ||
      subTitle.includes("Error"))
      ? subTitle
      : "Failed to load component or asset.");

  const handleCopy = (e) => {
    if (e && typeof e.stopPropagation === "function") {
      e.stopPropagation();
    }
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(displayTechnicalDetails).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const primaryClick = () => {
    if (btnAction?.onClick) {
      btnAction.onClick();
    } else {
      window.location.reload();
    }
  };

  const secondaryClick = () => {
    if (secondaryBtnAction?.onClick) {
      secondaryBtnAction.onClick();
    } else {
      navigate("/");
    }
  };

  return (
    <Stack
      textAlign="center"
      justifyContent="center"
      alignItems="center"
      py={{ base: 0, md: 10 }}
      px={{ base: 0, md: 4 }}
      color="white"
      position="relative"
      overflow="hidden"
      gap={0}
    >
      <Flex
        w="100%"
        maxW={{ base: "430px", lg: "920px" }}
        minH={{ base: "auto", lg: "480px" }}
        bg={{
          base: "linear-gradient(180deg, rgba(3, 8, 20, 0.98), rgba(9, 13, 27, 0.96))",
          lg: "rgba(15, 17, 26, 0.9)",
        }}
        backdropFilter="blur(20px)"
        border="1px solid rgba(233, 69, 96, 0.2)"
        borderRadius={{ base: "28px", lg: "24px" }}
        boxShadow={{
          base: "0 24px 70px rgba(0, 0, 0, 0.58), 0 0 36px rgba(233, 69, 96, 0.08)",
          lg: "0 25px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(233, 69, 96, 0.1)",
        }}
        overflow="hidden"
        flexDir={{ base: "column", lg: "row" }}
        position="relative"
        zIndex={2}
      >
        <Flex
          display={{ base: "flex", lg: "none" }}
          alignItems="center"
          justifyContent="space-between"
          h="72px"
          px={5}
          borderBottom="1px solid rgba(255, 255, 255, 0.08)"
          bg="rgba(4, 9, 22, 0.58)"
        >
          <HStack gap={3}>
            <Image src="/icon.png" alt="Resnime logo" w="34px" h="34px" />
            <Text fontSize="25px" fontWeight="800" color="white" lineHeight="1">
              Resnime
            </Text>
          </HStack>
          <Flex
            as="button"
            type="button"
            aria-label="Open menu"
            alignItems="center"
            justifyContent="center"
            w="46px"
            h="46px"
            borderRadius="full"
            border="1px solid rgba(255, 255, 255, 0.14)"
            bg="rgba(255, 255, 255, 0.08)"
            color="white"
          >
            <Menu size={25} />
          </Flex>
        </Flex>

        <Box
          w={{ base: "100%", lg: "42%" }}
          minH={{ base: "min(68vw, 292px)", lg: "auto" }}
          bgImage={`url(${src})`}
          bgSize="cover"
          bgPosition={{ base: "center 38%", lg: "center" }}
          position="relative"
        >
          <Box
            position="absolute"
            inset={0}
            bg={{
              base: "radial-gradient(circle at 50% 34%, rgba(255,75,114,0.08), transparent 45%), linear-gradient(to bottom, rgba(15,17,26,0) 48%, rgba(15,17,26,0.86) 100%)",
              lg: "linear-gradient(to right, rgba(15,17,26,0) 60%, rgba(15,17,26,0.95) 100%)",
            }}
          />
        </Box>

        <Stack
          flex={1}
          m={{ base: "0 18px 18px", lg: 0 }}
          mt={{ base: "-6px", lg: 0 }}
          p={{ base: 4, sm: 5, lg: 8 }}
          gap={{ base: 4, lg: 5 }}
          alignItems="center"
          justifyContent="center"
          bg={{
            base: "linear-gradient(180deg, rgba(20, 23, 39, 0.9), rgba(12, 16, 31, 0.94))",
            lg: "transparent",
          }}
          border={{
            base: "1px solid rgba(255, 75, 114, 0.26)",
            lg: "none",
          }}
          borderRadius={{ base: "24px", lg: 0 }}
          boxShadow={{
            base: "0 0 28px rgba(255, 75, 114, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
            lg: "none",
          }}
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            w={{ base: "54px", lg: "44px" }}
            h={{ base: "54px", lg: "44px" }}
            borderRadius="full"
            border={{
              base: "2px solid rgba(255, 75, 114, 0.84)",
              lg: "1px solid rgba(233, 69, 96, 0.4)",
            }}
            bg="rgba(233, 69, 96, 0.1)"
            color="#E94560"
            boxShadow={{
              base: "0 0 22px rgba(233, 69, 96, 0.36)",
              lg: "0 0 15px rgba(233, 69, 96, 0.2)",
            }}
          >
            <AlertCircle size={28} />
          </Flex>

          <Stack gap={2} textAlign="center" w="100%">
            <Heading
              as="h2"
              fontSize={{ base: "28px", sm: "30px", lg: "24px" }}
              fontWeight={{ base: "800", lg: "700" }}
              color="white"
              letterSpacing="0"
              lineHeight="1.1"
            >
              {title}
            </Heading>
            <Text
              fontSize={{ base: "16px", lg: "14px" }}
              color="#94A3B8"
              lineHeight={{ base: "1.5", lg: "1.6" }}
              whiteSpace="pre-line"
              maxW={{ base: "330px", lg: "none" }}
              mx="auto"
            >
              {subTitle}
            </Text>
          </Stack>

          <Box w="100%">
            <Flex
              alignItems="center"
              justifyContent="space-between"
              bg="rgba(255, 255, 255, 0.03)"
              border="1px solid rgba(255, 255, 255, 0.08)"
              borderRadius={showDetails ? "18px 18px 0 0" : "18px"}
              px={4}
              py={{ base: 3, lg: 3 }}
              cursor="pointer"
              onClick={() => setShowDetails((prev) => !prev)}
              _hover={{ bg: "rgba(255, 255, 255, 0.05)" }}
              transition="all 0.2s"
            >
              <Text
                fontSize={{ base: "14px", lg: "13px" }}
                fontWeight="500"
                color={{ base: "#CBD5E1", lg: "#94A3B8" }}
              >
                Technical details
              </Text>
              <HStack gap={3} alignItems="center">
                <Box
                  as="button"
                  fontSize={{ base: "13px", lg: "12px" }}
                  fontWeight={{ base: "600", lg: "500" }}
                  color="#FF4B72"
                  _hover={{ color: "#FF6B8B", textDecoration: "underline" }}
                  onClick={handleCopy}
                  cursor="pointer"
                  bg="transparent"
                  border="none"
                >
                  <Flex alignItems="center" gap={1.5}>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copied!" : "Copy error details"}
                  </Flex>
                </Box>
                <Box color="#94A3B8">
                  {showDetails ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </Box>
              </HStack>
            </Flex>
            {showDetails && (
              <Box
                bg="rgba(10, 12, 18, 0.7)"
                border="1px solid rgba(255, 255, 255, 0.08)"
                borderTop="none"
                borderRadius="0 0 18px 18px"
                p={{ base: 3, lg: 3 }}
                textAlign="left"
              >
                <Text
                  fontFamily="monospace"
                  fontSize={{ base: "13px", lg: "12px" }}
                  color="#CBD5E1"
                  lineHeight="1.6"
                  wordBreak="break-word"
                >
                  {displayTechnicalDetails}
                </Text>
              </Box>
            )}
          </Box>

          <HStack gap={3} w="100%" flexDir={{ base: "column", lg: "row" }}>
            <Button
              flex={1}
              w={{ base: "100%", lg: "auto" }}
              h={{ base: "64px", lg: "44px" }}
              minH={{ base: "64px", lg: "44px" }}
              bg="linear-gradient(135deg, #FF4B72 0%, #E94560 100%)"
              color="white"
              fontWeight={{ base: "700", lg: "600" }}
              fontSize={{ base: "20px", lg: "14px" }}
              lineHeight="1"
              borderRadius={{ base: "18px", lg: "12px" }}
              _hover={{
                opacity: 0.92,
                transform: "translateY(-1px)",
                boxShadow: "0 4px 15px rgba(233, 69, 96, 0.35)",
              }}
              _active={{ transform: "translateY(0)" }}
              transition="all 0.2s"
              onClick={primaryClick}
            >
              <Flex alignItems="center" gap={3}>
                <Icon as={RotateCw} boxSize={{ base: "26px", lg: "16px" }} />
                {btnAction?.text || "Refresh"}
              </Flex>
            </Button>

            <Button
              flex={1}
              w={{ base: "100%", lg: "auto" }}
              h={{ base: "64px", lg: "44px" }}
              minH={{ base: "64px", lg: "44px" }}
              bg="rgba(255, 255, 255, 0.05)"
              color="white"
              border="1px solid rgba(255, 255, 255, 0.12)"
              fontWeight={{ base: "700", lg: "500" }}
              fontSize={{ base: "20px", lg: "14px" }}
              lineHeight="1"
              borderRadius={{ base: "18px", lg: "12px" }}
              _hover={{
                bg: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
              transition="all 0.2s"
              onClick={secondaryClick}
            >
              <Flex alignItems="center" gap={3}>
                <Icon as={Home} boxSize={{ base: "26px", lg: "16px" }} />
                {secondaryBtnAction?.text || "Back to Home"}
              </Flex>
            </Button>
          </HStack>

          <Flex
            w="100%"
            alignItems="center"
            justifyContent="space-between"
            gap={4}
            bg="rgba(233, 69, 96, 0.04)"
            border="1px solid rgba(233, 69, 96, 0.15)"
            borderRadius={{ base: "18px", lg: "14px" }}
            py={{ base: 3, lg: 3 }}
            px={4}
          >
            <HStack gap={4} minW={0}>
              <Flex
                alignItems="center"
                justifyContent="center"
                w={{ base: "36px", lg: "22px" }}
                h={{ base: "36px", lg: "22px" }}
                borderRadius="full"
                border="1px solid rgba(233, 69, 96, 0.4)"
                color="#E94560"
                flexShrink={0}
              >
                <ShieldCheck size={18} />
              </Flex>
              <Text
                fontSize={{ base: "14px", lg: "13px" }}
                color="#94A3B8"
                textAlign={{ base: "left", lg: "center" }}
                lineHeight="1.45"
              >
                No worries — your watchlist and browsing progress are safe.
              </Text>
            </HStack>
            <Box color="#FF4B72" flexShrink={0}>
              <Heart size={22} fill="currentColor" />
            </Box>
          </Flex>
        </Stack>
      </Flex>
    </Stack>
  );
};
export default ErrorPage;
