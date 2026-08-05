import { defineSlotRecipe } from "@chakra-ui/react";

export const tabsRecipe = defineSlotRecipe({
  slots: ["root", "list", "trigger", "content", "indicator"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
    },
    list: {
      display: "flex",
      borderBottom: "1px solid",
      borderColor: "border.subtle",
      position: "relative",
    },
    trigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "fg.muted",
      fontFamily: "{fonts.body}",
      fontWeight: "500",
      transition: "all 0.2s",
      bg: "transparent",
      _hover: {
        color: "fg.default",
      },
      _selected: {
        color: "accent.primary",
      },
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "border.focus",
        outlineOffset: "2px",
      },
    },
    indicator: {
      bg: "accent.primary",
    },
    content: {
      mt: "4",
    },
  },
  variants: {
    variant: {
      line: {
        list: {
          borderBottom: "1px solid",
          borderColor: "border.subtle",
        },
        trigger: {
          borderBottom: "2px solid transparent",
          mb: "-1px",
          _selected: {
            borderColor: "accent.primary",
            color: "accent.primary",
          },
        },
        indicator: {
          display: "none",
        },
      },
    },
    size: {
      md: {
        trigger: {
          px: "4",
          py: "2",
          fontSize: "sm",
        },
      },
    },
  },
  defaultVariants: {
    variant: "line",
    size: "md",
  },
});
