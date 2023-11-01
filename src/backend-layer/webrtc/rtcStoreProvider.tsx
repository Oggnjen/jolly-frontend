import { ReactNode, useState } from "react";
import {
  RTCPeerConnectionInterface,
  RTCStoreContext,
  RTCStoreState,
} from "./rtcStoreContext";

export const rtcServers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};
export function RTCStoreProvider({ children }: { children?: ReactNode }) {
  const [rtcPeerConnection, setRtcPeerConnection] = useState<
    RTCPeerConnectionInterface[]
  >([]);

  const value: RTCStoreState = {
    rtcPeerConnections: rtcPeerConnection,
    setRtcPeerConnections: setRtcPeerConnection,
  };

  return (
    <RTCStoreContext.Provider value={value}>
      {children}
    </RTCStoreContext.Provider>
  );
}

export function withRTCStoreProvider<P extends object>(
  Component: React.ComponentType<P>
) {
  const withRTCStoreProvider = (props: P) => (
    <RTCStoreProvider>
      <Component {...props} />
    </RTCStoreProvider>
  );
  return withRTCStoreProvider;
}
