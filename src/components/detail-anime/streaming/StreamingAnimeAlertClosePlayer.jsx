import { Button, Dialog, Flex, Box, Text, Portal } from "@chakra-ui/react";
import { X, Sparkles } from "lucide-react";

const StreamingAnimeAlertClosePlayer = ({
  isOpen,
  onCancel,
  onOk,
  ...props
}) => {
  return (
    <Dialog.Root
      {...props}
      open={isOpen}
      onOpenChange={({ open }) => {
        if (!open) onCancel?.();
      }}
    >
      <Portal>
        <Dialog.Backdrop bg="rgba(0,0,0,0.7)" backdropFilter="blur(8px)" />
        <Dialog.Positioner>
          <Dialog.Content
            bg="linear-gradient(180deg, #1b1e2d, #11131f)"
            border="1px solid rgba(255, 95, 146, 0.4)"
            borderRadius="24px"
            boxShadow="0 20px 40px rgba(0,0,0,0.6)"
            color="white"
            maxW="400px"
            w="90vw"
            p={8}
            textAlign="center"
          >
            <Flex direction="column" align="center" gap={4}>
              <Box position="relative" mb={3} mt={2}>
                {/* Circle with X */}
                <Flex
                  w="56px"
                  h="56px"
                  bg="#ff5f92"
                  borderRadius="full"
                  align="center"
                  justify="center"
                  boxShadow="0 0 20px rgba(255, 95, 146, 0.3)"
                  zIndex={2}
                  position="relative"
                >
                  <X size={28} color="#0a0a0a" strokeWidth={2.5} />
                </Flex>

                {/* Sparkles around */}
                <Box
                  position="absolute"
                  top="-5px"
                  left="-20px"
                  color="#ff5f92"
                  zIndex={1}
                >
                  <Sparkles size={18} fill="currentColor" strokeWidth={1} />
                </Box>
                <Box
                  position="absolute"
                  top="10px"
                  right="-25px"
                  color="#ff5f92"
                  zIndex={1}
                >
                  <Sparkles size={16} fill="currentColor" strokeWidth={1} />
                </Box>
                <Box
                  position="absolute"
                  bottom="-10px"
                  right="-5px"
                  color="#ff5f92"
                  zIndex={1}
                >
                  <Sparkles size={14} fill="currentColor" strokeWidth={1} />
                </Box>
              </Box>

              <Text fontSize="2xl" fontWeight="700" mt={1}>
                Close player?
              </Text>

              <Text color="gray.300" fontSize="15px" lineHeight="1.6" mb={2}>
                You&apos;re still watching this episode. <br />
                Are you sure you want to close the player?
              </Text>

              <Flex w="full" gap={4} mt={2}>
                <Button
                  flex={1}
                  variant="outline"
                  bg="rgba(255,255,255,0.03)"
                  borderColor="rgba(255,255,255,0.08)"
                  color="white"
                  borderRadius="12px"
                  _hover={{ bg: "rgba(255,255,255,0.08)" }}
                  onClick={onOk}
                  h="48px"
                  fontSize="15px"
                  fontWeight="600"
                >
                  Close Player
                </Button>

                <Button
                  flex={1}
                  bg="#ff5f92"
                  color="white"
                  borderRadius="12px"
                  _hover={{ bg: "#ff477e" }}
                  onClick={onCancel}
                  h="48px"
                  fontSize="15px"
                  fontWeight="600"
                >
                  Keep Watching
                </Button>
              </Flex>
            </Flex>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default StreamingAnimeAlertClosePlayer;
