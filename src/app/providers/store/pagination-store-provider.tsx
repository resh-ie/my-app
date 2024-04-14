import { createContext, ReactNode, useRef, useContext } from "react";
import { StoreApi, useStore } from "zustand";
import {
  PaginationStore,
  createPaginationStore,
  initPaginationStore,
} from "@/stores/pagination";

export const PaginationStoreContext =
  createContext<StoreApi<PaginationStore> | null>(null);

export interface PaginationStoreProviderProps {
  children: ReactNode;
}

export const PaginationStoreProvider = ({
  children,
}: PaginationStoreProviderProps) => {
  const storeRef = useRef<StoreApi<PaginationStore>>();
  if (!storeRef.current) {
    storeRef.current = createPaginationStore(initPaginationStore());
  }

  return (
    <PaginationStoreContext.Provider value={storeRef.current}>
      {children}
    </PaginationStoreContext.Provider>
  );
};

export const usePaginationStore = <T,>(
  selector: (store: PaginationStore) => T
): T => {
  const paginationStoreContext = useContext(PaginationStoreContext);

  if (!paginationStoreContext) {
    throw new Error(
      `usePaginationStore must be used within PaginationStoreProvider`
    );
  }

  return useStore(paginationStoreContext, selector);
};
