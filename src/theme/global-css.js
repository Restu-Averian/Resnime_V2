export const globalCss = {
  "html, body, #root": {
    minHeight: "100%",
    bg: "bg.canvas",
    color: "fg.default",
    fontFamily: "{fonts.body}",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    colorScheme: "dark",
  },
  "::selection": {
    bg: "accent.muted",
    color: "bg.subtle",
  },
  "body::-webkit-scrollbar": {
    width: "6px",
    bg: "bg.canvas",
  },
  "body::-webkit-scrollbar-thumb": {
    bg: "border.subtle",
    borderRadius: "10px",
  },
  "body::-webkit-scrollbar-thumb:hover": {
    bg: "border.default",
  },
  "button, input, optgroup, select, textarea": {
    fontFamily: "inherit",
  },
};
