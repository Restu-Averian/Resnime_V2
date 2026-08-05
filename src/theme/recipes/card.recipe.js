import { defineSlotRecipe } from "@chakra-ui/react";

export const cardRecipe = defineSlotRecipe({
  slots: ["root", "header", "body", "footer"],
  base: {
    root: {
      bg: "bg.panel",
      border: "1px solid",
      borderColor: "border.subtle",
      borderRadius: "{radii.card}",
      color: "fg.default",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      _hover: {
        // Option for interactive cards, won't trigger unless card is interactive
      },
    },
    header: {
      p: "4",
      pb: "2",
    },
    body: {
      p: "4",
      flex: "1",
    },
    footer: {
      p: "4",
      pt: "2",
    },
  },
  variants: {
    variant: {
      elevated: {
        root: {
          bg: "bg.elevated",
          boxShadow: "{shadows.elevated}",
        },
      },
      outline: {
        root: {
          bg: "bg.surface",
          borderColor: "border.default",
        },
      },
      interactive: {
        root: {
          transition: "transform 0.2s",
          _hover: {
            transform: "translateY(-4px)",
            borderColor: "border.emphasized",
          },
        },
      },
    },
    size: {
      md: {
        root: {
          borderRadius: "{radii.card}",
        },
        header: { p: "4" },
        body: { p: "4" },
        footer: { p: "4" },
      },
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
  },
});
