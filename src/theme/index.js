import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { colors } from "./tokens/colors";
import { fonts } from "./tokens/typography";
import { radii } from "./tokens/radii";
import { shadows } from "./tokens/shadows";
import { semanticColors } from "./semantic-tokens/colors";
import { textStyles } from "./text-styles";
import { layerStyles } from "./layer-styles";
import { buttonRecipe } from "./recipes/button.recipe";
import { inputRecipe } from "./recipes/input.recipe";
import { cardRecipe } from "./recipes/card.recipe";
import { badgeRecipe } from "./recipes/badge.recipe";
import { tabsRecipe } from "./recipes/tabs.recipe";
import { globalCss } from "./global-css";

const customConfig = defineConfig({
  cssVarsPrefix: "resnime",
  globalCss,
  theme: {
    tokens: {
      colors,
      fonts,
      radii,
      shadows,
    },
    semanticTokens: {
      colors: semanticColors,
    },
    textStyles,
    layerStyles,
    recipes: {
      button: buttonRecipe,
      input: inputRecipe,
      textarea: inputRecipe,
      badge: badgeRecipe,
    },
    slotRecipes: {
      card: cardRecipe,
      tabs: tabsRecipe,
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
