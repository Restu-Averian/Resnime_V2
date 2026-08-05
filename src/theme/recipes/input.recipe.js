import { defineRecipe } from "@chakra-ui/react";

export const inputRecipe = defineRecipe({
  base: {
    bg: "bg.surface",
    color: "fg.default",
    border: "1px solid",
    borderColor: "border.default",
    borderRadius: "{radii.control}",
    fontFamily: "{fonts.body}",
    transition: "all 0.2s",
    _placeholder: {
      color: "fg.muted",
    },
    _hover: {
      borderColor: "border.emphasized",
    },
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "border.focus",
      outlineOffset: "0",
      borderColor: "border.focus",
    },
    _invalid: {
      borderColor: "status.danger",
      _focusVisible: {
        outlineColor: "status.danger",
      },
    },
    _disabled: {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  },
  variants: {
    size: {
      md: {
        h: "44px",
        px: "4",
        fontSize: "md",
      },
      sm: {
        h: "36px",
        px: "3",
        fontSize: "sm",
      },
      lg: {
        h: "52px",
        px: "6",
        fontSize: "lg",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
