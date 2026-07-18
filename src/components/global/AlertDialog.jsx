import {
  Button,
  Dialog,
  Portal,
  Stack,
} from "@chakra-ui/react";

/**
 * @typedef AddPropsAlertDialog
 * @property {import("react").ReactNode} header
 * @property {import("@chakra-ui/react").ModalHeaderProps} headerProps
 * @property {import("react").ReactNode} footer
 * @property {()=>void} onOk
 * @property {()=>void} onCancel
 */
/**
 *
 * @param {AddPropsAlertDialog & import("@chakra-ui/react").AlertDialogProps} param0
 * @returns
 */
const AlertDialog = ({
  header,
  headerProps,
  onOk,
  onCancel,
  children,
  footer,
  isOpen,
  ...props
}) => {
  return (
    <Dialog.Root
      {...props}
      role="alertdialog"
      open={isOpen}
      onOpenChange={({ open }) => {
        if (!open) onCancel?.();
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
          <Dialog.Header {...headerProps}>{header}</Dialog.Header>
          <Dialog.Body>
            {children || "Are you sure to close ?"}
          </Dialog.Body>
          <Dialog.Footer>
            {footer || (
              <Stack justifyContent="end" direction="row">
                <Button
                  onClick={() => {
                    onCancel?.();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  colorPalette="teal"
                  onClick={() => {
                    onOk?.();
                    onCancel?.();
                  }}
                >
                  Ok
                </Button>
              </Stack>
            )}
          </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
export default AlertDialog;
