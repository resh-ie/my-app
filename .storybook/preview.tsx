import type { Preview } from "@storybook/react";
import { Providers } from "@/app/providers/chakra/providers";
import { PaginationStoreProvider } from "@/app/providers/store/pagination-store-provider";
import { UserStoreProvider } from "@/app/providers/store/user-store-provider";
import React from "react";

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

export const parameters = preview.parameters;

export const decorators = [
  (Story: any) => (
    <PaginationStoreProvider>
      <UserStoreProvider>
        <Providers>
          <Story />
        </Providers>
      </UserStoreProvider>
    </PaginationStoreProvider>
  ),
];
