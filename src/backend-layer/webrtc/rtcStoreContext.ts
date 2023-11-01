import { createContext } from "react";
import { emptyCallback } from "../utils/utils";

export interface RTCPeerConnectionInterface {
  rtcPeerConnection: RTCPeerConnection;
  user: string;
  state: RTCPeerConnectionState;
}

export enum RTCPeerConnectionState {
  CREATED,
  SDP_GENERATED,
  SDP_REMOTE_SET,
}

export interface RTCStoreState {
  rtcPeerConnections: RTCPeerConnectionInterface[];
  setRtcPeerConnections: (
    rtcPeerConnection: RTCPeerConnectionInterface[]
  ) => void;
}

export function createRTCStoreStateDefaultValue(): RTCStoreState {
  return {
    rtcPeerConnections: [],
    setRtcPeerConnections: emptyCallback,
  };
}

export const RTCStoreContext = createContext(createRTCStoreStateDefaultValue());
