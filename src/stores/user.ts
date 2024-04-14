"use client";
import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export type UserState = {
  name: string;
  jobTitle: string;
};

export type UserActions = {
  updateName: (name: string) => void;
  updateJobTitle: (jobTitle: string) => void;
};

export type UserStore = UserState & UserActions;

export const initUserStore = (): UserState => {
  return {
    name: "",
    jobTitle: "",
  };
};

export const createUserStore = (initState: UserState = initUserStore()) => {
  return createStore<UserStore>()(
    persist(
      (set) => ({
        ...initState,
        updateName: (name: string) => set({ name }),
        updateJobTitle: (jobTitle: string) => set({ jobTitle }),
      }),
      { name: "user-store" }
    )
  );
};
