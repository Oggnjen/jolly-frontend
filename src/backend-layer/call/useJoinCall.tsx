import { useAppDispatch } from "../store/store";
import { joinCallAsync } from "./joinCallAsync";

export function useJoinCall() {
  const dispatch = useAppDispatch();

  return (callId: string) => {
    return dispatch(joinCallAsync({ callId: callId }));
  };
}
