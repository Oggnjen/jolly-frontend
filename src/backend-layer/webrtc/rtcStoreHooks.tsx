import { useContext } from "react";
import {
  RTCPeerConnectionInterface,
  RTCPeerConnectionState,
  RTCStoreContext,
} from "./rtcStoreContext";
import { rtcServers } from "./rtcStoreProvider";
import { provideSdp } from "../sdp/sdpService";

export function useRTCPeerConnections() {
  return useContext(RTCStoreContext).rtcPeerConnections;
}

export function useMakeRTCPeerConnection() {
  const context = useContext(RTCStoreContext);

  return (user: string) => {
    const peerConnection = new RTCPeerConnection(rtcServers);
    const value: RTCPeerConnectionInterface = {
      rtcPeerConnection: peerConnection,
      user: user,
      state: RTCPeerConnectionState.CREATED,
    };
    context.setRtcPeerConnections([...context.rtcPeerConnections, value]);

    return peerConnection;
  };
}

export function useGenerateSdp() {
  const context = useContext(RTCStoreContext);

  return async (user: string) => {
    const peerConnection = context.rtcPeerConnections.find(
      (r) => r.user == user
    );
    console.log("ovo je peer connection:" + peerConnection);

    if (
      peerConnection &&
      peerConnection.state == RTCPeerConnectionState.CREATED
    ) {
      const offer = await peerConnection.rtcPeerConnection.createOffer();
      peerConnection.rtcPeerConnection.setLocalDescription(offer);
      console.log("sending sdp to " + peerConnection.user);
      console.log("Offer is:" + offer);

      provideSdp({
        sdp: JSON.stringify(offer.sdp),
        destination: peerConnection.user,
      });
      const allConnections = context.rtcPeerConnections.filter(
        (r) => r.user != user
      );
      peerConnection.state = RTCPeerConnectionState.SDP_GENERATED;
      context.setRtcPeerConnections([...allConnections, peerConnection]);
    }

    return peerConnection;
  };
}
