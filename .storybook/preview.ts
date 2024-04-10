import type { Preview } from "@storybook/react";
import "./globals.css";
// import styles from "./page.module.css";
const preview: Preview = {
  parameters: {
    // chakra: {
    //   theme: appTheme,
    // },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
