import { createStore } from "zustand/vanilla";
import { persist, devtools } from "zustand/middleware";

export type CounterState = {
  count: number;
};

export type CounterActions = {
  decrementCount: () => void;
  incrementCount: () => void;
};

export type CounterStore = CounterState & CounterActions;

export const initCounterStore = (): CounterState => {
  return { count: new Date().getFullYear() };
};

export const defaultInitState: CounterState = {
  count: 0,
};

export const createCounterStore = (
  initState: CounterState = defaultInitState
) => {
  return createStore<CounterStore>()(
    devtools(
      persist(
        (set) => ({
          ...initState,
          decrementCount: () => set((state) => ({ count: state.count - 1 })),
          incrementCount: () => set((state) => ({ count: state.count + 1 })),
        }),
        { name: "counter-store" }
      )
    )
  );
};