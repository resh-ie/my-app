import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { MenuDrawer } from "./menuDrawer";

const meta = {
  component: MenuDrawer,
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof MenuDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: () => {
        return (
            <MenuDrawer />
        )
    },
};
