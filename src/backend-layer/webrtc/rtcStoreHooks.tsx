import { useContext } from "react";
import { RTCStoreContext } from "./rtcStoreContext";
import { createCall } from "./rtcService";

export function useRTCPeerConnection() {
  return useContext(RTCStoreContext).rtcPeerConnection;
}

export function useCreateOffer() {
  const rtcPeerConnection = useContext(RTCStoreContext).rtcPeerConnection;
  const createCallCallback = createCall();
  return async () => {
    const offer = await rtcPeerConnection.createOffer();
    await rtcPeerConnection.setLocalDescription(offer);
    console.log("This is offer and it is set as local:", offer);
    console.log("Sending offer to signaling server...");
    createCallCallback(JSON.stringify(offer).toString());
  };
}
