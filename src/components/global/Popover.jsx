import { Popover as PopoverChakra, Portal } from "@chakra-ui/react";

/**
 * @typedef AddPropsPopover
 * @property {Element} content
 * @property {Boolean} [useArrow]
 */

/**
 *
 * @param {AddPropsPopover & import("@chakra-ui/react").PopoverProps} props
 * @returns {Element}
 */
const Popover = ({ content, useArrow = true, children }) => {
  return (
    <PopoverChakra.Root>
      <PopoverChakra.Trigger asChild>{children}</PopoverChakra.Trigger>
      <Portal>
        <PopoverChakra.Positioner>
          <PopoverChakra.Content>
            <PopoverChakra.Body>{content}</PopoverChakra.Body>
            {useArrow && (
              <PopoverChakra.Arrow>
                <PopoverChakra.ArrowTip />
              </PopoverChakra.Arrow>
            )}
          </PopoverChakra.Content>
        </PopoverChakra.Positioner>
      </Portal>
    </PopoverChakra.Root>
  );
};
export default Popover;
