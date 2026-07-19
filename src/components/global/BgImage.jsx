import { Box } from "@chakra-ui/react";

/**
 * @typedef AddPropsBgImage
 * @property {String} src
 * @property {Boolean} useOverlay
 * @property {Number} height
 */
/**
 *
 * @param {import("@chakra-ui/react").BoxProps & AddPropsBgImage} props
 * @returns {Element}
 */
const BgImage = ({
  src,
  useOverlay = false,
  height = 250,
  children,
  style,
  ...props
}) => {
  const safeHeight = typeof height === "number" ? `${height}px` : height;

  return (
    <Box
      {...props}
      {...(src && {
        bgImage: `url("${src}")`,
      })}
      bgSize="cover"
      bgPos="center"
      bgRepeat="no-repeat"
      height={safeHeight}
      position="relative"
      style={style}
    >
      {useOverlay && (
        <Box
          style={{
            position: "absolute",
            inset: 0,
            height: "100%",
            background:
              "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(38,38,38,0) 80%)",
            pointerEvents: "none",
          }}
        />
      )}
      {children}
    </Box>
  );
};
export default BgImage;
