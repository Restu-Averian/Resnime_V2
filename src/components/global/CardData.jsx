import { Card } from "@chakra-ui/react";
import useResponsive from "../../hooks/useResponsive";
import "../../style/card.css";

/**
 * @typedef AddPropsCard
 * @property {import("@chakra-ui/react").CardFooterProps} footer
 * @property {import("@chakra-ui/react").CardHeaderProps} header
 * @property {Boolean} useDefault
 */

/** @param {import('@chakra-ui/react').CardProps & AddPropsCard } props*/
const CardData = ({
  children,
  header,
  footer,
  useDefault = false,
  ...props
}) => {
  const { sm } = useResponsive();

  return (
    <Card.Root
      {...(!useDefault && {
        className: "_card",
      })}
      {...props}
    >
      {header && <Card.Header>{header}</Card.Header>}
      <Card.Body>{children}</Card.Body>
      {footer && (
        <Card.Footer {...(!sm && { py: "var(--chakra-space-5)" })} px={0}>
          {footer}
        </Card.Footer>
      )}
    </Card.Root>
  );
};
export default CardData;
