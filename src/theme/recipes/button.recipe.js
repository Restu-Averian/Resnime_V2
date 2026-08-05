import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "{fonts.body}",
    fontWeight: "500",
    borderRadius: "{radii.control}",
    transition: "all 0.2s",
    _active: {
      transform: "scale(0.98)",
    },
    _focus: {
      outline: "none",
    },
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "{colors.border.focus}",
      outlineOffset: "2px",
    },
    _disabled: {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  },
  variants: {
    variant: {
      solid: {
        bg: "accent.primary",
        color: "accent.contrast",
        border: "1px solid",
        borderColor: "accent.subtle",
        _hover: {
          bg: "accent.hover",
        },
        _active: {
          bg: "accent.active",
        },
      },
      outline: {
        bg: "transparent",
        color: "accent.primary",
        border: "1px solid",
        borderColor: "accent.primary",
        _hover: {
          bg: "accent.subtle",
        },
      },
      subtle: {
        bg: "accent.subtle",
        color: "accent.primary",
        _hover: {
          bg: "accent.muted",
          color: "accent.active",
        },
      },
      ghost: {
        bg: "transparent",
        color: "accent.primary",
        _hover: {
          bg: "accent.subtle",
        },
      },
      plain: {
        bg: "transparent",
        color: "accent.primary",
        _hover: {
          textDecoration: "underline",
        },
      },
      danger: {
        bg: "status.danger",
        color: "fg.heading",
        _hover: {
          opacity: 0.9,
        },
      },
    },
    size: {
      md: {
        minH: "44px",
        px: "4",
        fontSize: "md",
      },
      sm: {
        minH: "36px",
        px: "3",
        fontSize: "sm",
      },
      lg: {
        minH: "52px",
        px: "6",
        fontSize: "lg",
      },
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
});
