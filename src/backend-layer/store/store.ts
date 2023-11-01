import { configureStore } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import callStoreSlice from "../call/callStoreSlice";

function makeStore() {
  return configureStore({
    reducer: {
      call: callStoreSlice,
    },
  });
}

let store: ReturnType<typeof makeStore>;

const initializeStore = () => {
  const _store = store ?? makeStore();

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function useStore() {
  const store = useMemo(() => initializeStore(), []);
  return store;
}

export function clearStore() {
  store = makeStore();
}

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
