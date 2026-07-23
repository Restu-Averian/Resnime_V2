import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Home,
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
      py={{ base: 6, md: 10 }}
      px={4}
      color="white"
      position="relative"
      overflow="hidden"
      gap={0}
    >
      {/* 2-Column Horizontal Card */}
      <Flex
        w="100%"
        maxW="920px"
        minH="480px"
        bg="rgba(15, 17, 26, 0.9)"
        backdropFilter="blur(20px)"
        border="1px solid rgba(233, 69, 96, 0.2)"
        borderRadius="24px"
        boxShadow="0 25px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(233, 69, 96, 0.1)"
        overflow="hidden"
        flexDir={{ base: "column", lg: "row" }}
        position="relative"
        zIndex={2}
      >
        {/* Left Side: Background Image */}
        <Box
          w={{ base: "100%", lg: "42%" }}
          minH={{ base: "260px", sm: "320px", lg: "auto" }}
          bgImage={`url(${src})`}
          bgSize="cover"
          bgPosition="center"
          position="relative"
        >
          <Box
            position="absolute"
            inset={0}
            bg={{
              base: "linear-gradient(to bottom, rgba(15,17,26,0) 50%, rgba(15,17,26,0.95) 100%)",
              lg: "linear-gradient(to right, rgba(15,17,26,0) 60%, rgba(15,17,26,0.95) 100%)",
            }}
          />
        </Box>

        {/* Right Side: Content Stack */}
        <Stack
          flex={1}
          p={{ base: 6, sm: 8 }}
          gap={5}
          alignItems="center"
          justifyContent="center"
        >
          {/* Warning Circle Icon */}
          <Flex
            alignItems="center"
            justifyContent="center"
            w="44px"
            h="44px"
            borderRadius="full"
            border="1px solid rgba(233, 69, 96, 0.4)"
            bg="rgba(233, 69, 96, 0.1)"
            color="#E94560"
            boxShadow="0 0 15px rgba(233, 69, 96, 0.2)"
          >
            <AlertCircle size={22} />
          </Flex>

          {/* Title & Subtitle */}
          <Stack gap={2} textAlign="center" w="100%">
            <Heading
              as="h2"
              fontSize={{ base: "20px", sm: "24px" }}
              fontWeight="700"
              color="white"
              letterSpacing="-0.01em"
            >
              {title}
            </Heading>
            <Text
              fontSize="14px"
              color="#94A3B8"
              lineHeight="1.6"
              whiteSpace="pre-line"
            >
              {subTitle}
            </Text>
          </Stack>

          {/* Technical Details Accordion */}
          <Box w="100%">
            <Flex
              alignItems="center"
              justifyContent="space-between"
              bg="rgba(255, 255, 255, 0.03)"
              border="1px solid rgba(255, 255, 255, 0.08)"
              borderRadius={showDetails ? "12px 12px 0 0" : "12px"}
              px={4}
              py={3}
              cursor="pointer"
              onClick={() => setShowDetails((prev) => !prev)}
              _hover={{ bg: "rgba(255, 255, 255, 0.05)" }}
              transition="all 0.2s"
            >
              <Text fontSize="13px" fontWeight="500" color="#94A3B8">
                Technical details
              </Text>
              <HStack gap={3} alignItems="center">
                <Box
                  as="button"
                  fontSize="12px"
                  fontWeight="500"
                  color="#FF4B72"
                  _hover={{ color: "#FF6B8B", textDecoration: "underline" }}
                  onClick={handleCopy}
                  cursor="pointer"
                  bg="transparent"
                  border="none"
                >
                  <Flex alignItems="center" gap={1.5}>
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied!" : "Copy error details"}
                  </Flex>
                </Box>
                <Box color="#94A3B8">
                  {showDetails ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </Box>
              </HStack>
            </Flex>
            {showDetails && (
              <Box
                bg="rgba(10, 12, 18, 0.7)"
                border="1px solid rgba(255, 255, 255, 0.08)"
                borderTop="none"
                borderRadius="0 0 12px 12px"
                p={3}
                textAlign="left"
              >
                <Text
                  fontFamily="monospace"
                  fontSize="12px"
                  color="#CBD5E1"
                  wordBreak="break-all"
                >
                  {displayTechnicalDetails}
                </Text>
              </Box>
            )}
          </Box>

          {/* Action Buttons */}
          <HStack gap={3} w="100%" flexDir={{ base: "column", sm: "row" }}>
            <Button
              flex={1}
              w={{ base: "100%", sm: "auto" }}
              h="44px"
              bg="linear-gradient(135deg, #FF4B72 0%, #E94560 100%)"
              color="white"
              fontWeight="600"
              fontSize="14px"
              borderRadius="12px"
              _hover={{
                opacity: 0.92,
                transform: "translateY(-1px)",
                boxShadow: "0 4px 15px rgba(233, 69, 96, 0.35)",
              }}
              _active={{ transform: "translateY(0)" }}
              transition="all 0.2s"
              onClick={primaryClick}
            >
              <Flex alignItems="center" gap={2}>
                <RotateCw size={16} />
                {btnAction?.text || "Try Again"}
              </Flex>
            </Button>

            <Button
              flex={1}
              w={{ base: "100%", sm: "auto" }}
              h="44px"
              bg="rgba(255, 255, 255, 0.05)"
              color="white"
              border="1px solid rgba(255, 255, 255, 0.12)"
              fontWeight="500"
              fontSize="14px"
              borderRadius="12px"
              _hover={{
                bg: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
              transition="all 0.2s"
              onClick={secondaryClick}
            >
              <Flex alignItems="center" gap={2}>
                <Home size={16} />
                {secondaryBtnAction?.text || "Back to Home"}
              </Flex>
            </Button>
          </HStack>

          {/* Bottom Callout Banner */}
          <Flex
            w="100%"
            alignItems="center"
            justifyContent="center"
            gap={2.5}
            bg="rgba(233, 69, 96, 0.04)"
            border="1px solid rgba(233, 69, 96, 0.15)"
            borderRadius="14px"
            py={3}
            px={4}
          >
            <Flex
              alignItems="center"
              justifyContent="center"
              w="22px"
              h="22px"
              borderRadius="full"
              border="1px solid rgba(233, 69, 96, 0.4)"
              color="#E94560"
              flexShrink={0}
            >
              <ShieldCheck size={13} />
            </Flex>
            <Text fontSize="13px" color="#94A3B8" textAlign="center">
              No worries — your watchlist and browsing progress are safe.{" "}
              <Text as="span" color="#FF4B72">
                ♥
              </Text>
            </Text>
          </Flex>
        </Stack>
      </Flex>
    </Stack>
  );
};
export default ErrorPage;
