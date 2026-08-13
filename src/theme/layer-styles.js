export const layerStyles = {
  panel: {
    value: {
      bg: "bg.panel",
      border: "1px solid",
      borderColor: "border.default",
      borderRadius: "{radii.panel}",
    },
  },
  panelElevated: {
    value: {
      bg: "bg.elevated",
      border: "1px solid",
      borderColor: "border.default",
      borderRadius: "{radii.panel}",
      boxShadow: "{shadows.elevated}",
    },
  },
  interactiveSurface: {
    value: {
      bg: "bg.surface",
      border: "1px solid",
      borderColor: "border.default",
      borderRadius: "{radii.control}",
      transition: "all 0.2s",
      cursor: "pointer",
      _hover: {
        bg: "bg.interactive",
        transform: "translateY(-2px)",
        borderColor: "border.interactive",
      },
    },
  },
  mediaCard: {
    value: {
      bg: "bg.surface",
      border: "1px solid",
      borderColor: "border.subtle",
      borderRadius: "{radii.media}",
      overflow: "hidden",
    },
  },
  divider: {
    value: {
      borderBottom: "1px solid",
      borderColor: "border.subtle",
    },
  },
  focusRing: {
    value: {
      outline: "2px solid",
      outlineColor: "border.focus",
      outlineOffset: "2px",
    },
  },
  glassOverlay: {
    value: {
      bg: "bg.overlay",
      backdropFilter: "blur(4px)",
    },
  },
};
