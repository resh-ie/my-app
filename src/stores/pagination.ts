import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export type PaginationState = {
  currentPage: number;
};

export type PaginationActions = {
  setCurrentPage: (page: number) => void;
};

export type PaginationStore = PaginationState & PaginationActions;

export const initPaginationStore = (): PaginationState => {
  return { currentPage: 1 };
};

export const createPaginationStore = (
  initState: PaginationState = initPaginationStore()
) => {
  return createStore<PaginationStore>()(
    persist(
      (set) => ({
        ...initState,
        setCurrentPage: (page: number) => set({ currentPage: page }),
      }),
      { name: "pagination-store" }
    )
  );
};
