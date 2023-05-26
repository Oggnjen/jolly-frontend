import { useContext } from "react";
import { RTCStoreContext } from "./rtcStoreContext";

export function useRTCPeerConnection() {
  return useContext(RTCStoreContext).rtcPeerConnection;
}
