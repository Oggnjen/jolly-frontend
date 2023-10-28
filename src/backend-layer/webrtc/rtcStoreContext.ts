import { createContext } from "react";
import { emptyCallback } from "../utils/utils";

export interface RTCPeerConnectionInterface {
  rtcPeerConnection: RTCPeerConnection;
  user: string;
}

export interface RTCStoreState {
  rtcPeerConnection: RTCPeerConnection;
  setRtcPeerConnection: (rtcPeerConnection: RTCPeerConnection) => void;
}

export function createRTCStoreStateDefaultValue(): RTCStoreState {
  return {
    rtcPeerConnection: new RTCPeerConnection(),
    setRtcPeerConnection: emptyCallback,
  };
}

export const RTCStoreContext = createContext(createRTCStoreStateDefaultValue());
