import { defineRecipe } from "@chakra-ui/react";

export const badgeRecipe = defineRecipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "{fonts.body}",
    fontWeight: "500",
    borderRadius: "{radii.badge}",
    border: "1px solid",
  },
  variants: {
    variant: {
      neutral: {
        bg: "bg.surface",
        color: "fg.muted",
        borderColor: "border.subtle",
      },
      accent: {
        bg: "accent.subtle",
        color: "accent.primary",
        borderColor: "accent.muted",
      },
      warm: {
        bg: "bg.surface",
        color: "accent.warm",
        borderColor: "accent.warmMuted",
      },
      success: {
        bg: "bg.surface",
        color: "status.success",
        borderColor: "status.success",
      },
      warning: {
        bg: "bg.surface",
        color: "status.warning",
        borderColor: "status.warning",
      },
      danger: {
        bg: "bg.surface",
        color: "status.danger",
        borderColor: "status.danger",
      },
    },
    size: {
      sm: {
        px: "2",
        py: "0.5",
        fontSize: "xs",
      },
      md: {
        px: "2.5",
        py: "0.5",
        fontSize: "sm",
      },
    },
  },
  defaultVariants: {
    variant: "neutral",
    size: "md",
  },
});
