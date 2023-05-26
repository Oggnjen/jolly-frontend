import { createContext } from "react";

export const emptyCallback = () => {};

export interface RTCStoreState {
    rtcPeerConnection: RTCPeerConnection;
    setRtcPeerConnection: (rtcPeerConnection: RTCPeerConnection) => void;
}

export function createRTCStoreStateDefaultValue(): RTCStoreState {
    return {
        rtcPeerConnection: new RTCPeerConnection(),
        setRtcPeerConnection: emptyCallback
    }
}

export const RTCStoreContext = createContext(createRTCStoreStateDefaultValue());