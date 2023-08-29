import { ReactNode, useState } from "react";
import { RTCStoreContext, RTCStoreState } from "./rtcStoreContext";

export function RTCStoreProvider({
  children,
  mediaStream,
}: {
  children?: ReactNode;
  mediaStream?: MediaStream;
}) {
  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  const [rtcPeerConnection, setRtcPeerConnection] = useState<RTCPeerConnection>(
    new RTCPeerConnection(servers)
  );
  // mediaStream?.getTracks().forEach((m) => rtcPeerConnection.addTrack(m));

  const value: RTCStoreState = {
    rtcPeerConnection: rtcPeerConnection,
    setRtcPeerConnection: setRtcPeerConnection,
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
