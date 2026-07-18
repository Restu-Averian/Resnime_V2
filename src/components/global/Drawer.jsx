import {
  Drawer as DrawerChakra,
  Portal,
} from "@chakra-ui/react";

/**
 * @typedef AddPropsDrawer
 * @property {import("react").ReactNode} header
 * @property {import("react").ReactNode} footer
 */
/**
 *
 * @param {AddPropsDrawer & import("@chakra-ui/react").DrawerProps} param0
 * @returns
 */
const Drawer = ({ header, children, footer, isOpen, onClose, ...props }) => {
  return (
    <DrawerChakra.Root
      open={isOpen}
      onOpenChange={({ open }) => {
        if (!open) onClose?.();
      }}
      {...props}
    >
      <Portal>
        <DrawerChakra.Backdrop />
        <DrawerChakra.Positioner>
          <DrawerChakra.Content>
            {header && <DrawerChakra.Header>{header}</DrawerChakra.Header>}
            <DrawerChakra.Body>{children}</DrawerChakra.Body>
            {footer && <DrawerChakra.Footer>{footer}</DrawerChakra.Footer>}
          </DrawerChakra.Content>
        </DrawerChakra.Positioner>
      </Portal>
    </DrawerChakra.Root>
  );
};
export default Drawer;
