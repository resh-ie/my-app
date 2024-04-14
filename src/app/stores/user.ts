import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
// TODO: create a type folder

export type UserState = {
  name: string | undefined;
  jobTitle: string | undefined;
};

export type UserActions = {
  updateName: (name: string) => void;
  updateJobTitle: (jobTitle: string) => void;
};

export type UserStore = UserState & UserActions;

export const initUserStore = (): UserState => {
  return {
    name: undefined,
    jobTitle: undefined,
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
