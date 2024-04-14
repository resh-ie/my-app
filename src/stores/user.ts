"use client";
import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export type UserState = {
  name: string;
  jobTitle: string;
};

export type UserActions = {
  setName: (name: string) => void;
  setJobTitle: (jobTitle: string) => void;
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
        setName: (name: string) => set({ name }),
        setJobTitle: (jobTitle: string) => set({ jobTitle }),
      }),
      { name: "user-store" }
    )
  );
};
