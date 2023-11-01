import { useAppSelector } from "../store/store";
import { selectAllMembers, selectCallId, selectMyId } from "./callStoreSelectors";

export function useMyId() {
  return useAppSelector(selectMyId);
}

export function useAllMembers() {
  return useAppSelector(selectAllMembers);
}

export function useCallId() {
  return useAppSelector(selectCallId);
}
