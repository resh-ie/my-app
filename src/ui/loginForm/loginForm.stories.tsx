import type { Meta, StoryObj } from "@storybook/react";

import { userEvent, within, expect } from "@storybook/test";

import { LoginForm } from "./loginForm";
import { useUserStore } from "@/app/providers/store/user-store-provider";

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const EmptyForm: Story = {
  args: {
    handleOnClose: () => {
      console.log("Submitted");
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button"));

    await expect(canvas.getByText("Name is required")).toBeInTheDocument();

    await expect(
      canvas.getByText("Job title must be at least 8 characters long.")
    ).toBeInTheDocument();
  },
};

export const FilledForm: Story = {
  args: {
    handleOnClose: () => {
      console.log("Submitted");
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByPlaceholderText("Please enter your name"),
      "Sam Smith"
    );

    await userEvent.type(
      canvas.getByPlaceholderText("Please enter your job title"),
      "Software Engineer"
    );

    await userEvent.click(canvas.getByRole("button"));

    await expect(
      canvas.getByText("We do not share your name with anyone.")
    ).toBeInTheDocument();

    await expect(
      canvas.getByText("Enter your current job title.")
    ).toBeInTheDocument();
  },
};
