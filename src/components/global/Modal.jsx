import { Dialog, Portal } from "@chakra-ui/react";

/**
 * @typedef AddPropsModal
 * @property {import("react").ReactNode} [header]
 * @property {import("react").ReactNode} [footer]
 * @property {Boolean} [showCancelButton]
 */

/**
 *
 * @param {import("@chakra-ui/react").ModalProps & AddPropsModal} props
 * @returns
 */
const Modal = ({
  header,
  footer,
  showCancelButton = true,
  children,
  isOpen,
  onClose,
  ...props
}) => {
  return (
    <Dialog.Root
      placement="center"
      open={isOpen}
      onOpenChange={({ open }) => {
        if (!open) onClose?.();
      }}
      {...props}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {header && <Dialog.Header>{header}</Dialog.Header>}
            {showCancelButton && (
              <Dialog.CloseTrigger fontSize={20} mt={18} mr={2} zIndex={999} />
            )}
            <Dialog.Body>{children}</Dialog.Body>
            {footer && <Dialog.Footer>{footer}</Dialog.Footer>}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
export default Modal;
