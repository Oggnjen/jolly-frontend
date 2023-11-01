import { useAppDispatch, useAppSelector } from "../store/store";
import { createCallAsync } from "./createCallAsync";

export function useCreateCall() {
  const dispatch = useAppDispatch();

  return () => {
    return dispatch(createCallAsync());
  };
}
