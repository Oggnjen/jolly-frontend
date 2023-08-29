import { useContext } from "react";
import { RTCStoreContext } from "./rtcStoreContext";

export const useRTCPeerConnection = (): [
  RTCPeerConnection,
  (rtcPeerConnection: RTCPeerConnection) => void
] => {
  const context = useContext(RTCStoreContext);
  return [context.rtcPeerConnection, context.setRtcPeerConnection];
};
