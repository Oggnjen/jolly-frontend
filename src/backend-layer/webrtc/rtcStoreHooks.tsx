import { useContext } from "react";
import { RTCStoreContext } from "./rtcStoreContext";

export function useRTCPeerConnection() {
  return useContext(RTCStoreContext).rtcPeerConnection;
}

export function useCreateOffer() {
  const rtcPeerConnection = useContext(RTCStoreContext).rtcPeerConnection;
  return async () => {
    const offer = await rtcPeerConnection.createOffer();
    await rtcPeerConnection.setLocalDescription(offer);
    console.log("This is offer and it is set as local:", offer);
  };
}
