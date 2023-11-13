import { useContext } from "react";
import {
  RTCPeerConnectionInterface,
  RTCPeerConnectionState,
  RTCStoreContext,
} from "./rtcStoreContext";
import { rtcServers } from "./rtcStoreProvider";
import { SdpDto, provideSdp } from "../sdp/sdpService";
import { useMyId } from "../call/callStoreHooks";

export function useRTCPeerConnections() {
  return useContext(RTCStoreContext).rtcPeerConnections;
}

export function useMakeRTCPeerConnection() {
  const context = useContext(RTCStoreContext);

  return (user: string) => {
    if (context.rtcPeerConnections.find((r) => r.user === user) === undefined) {
      const peerConnection = new RTCPeerConnection(rtcServers);
      const value: RTCPeerConnectionInterface = {
        rtcPeerConnection: peerConnection,
        user: user,
        state: RTCPeerConnectionState.CREATED,
      };
      context.setRtcPeerConnections([...context.rtcPeerConnections, value]);

      return peerConnection;
    }
  };
}

export function useMakeRTCPeerConnectionWithAnswer() {
  const context = useContext(RTCStoreContext);
  const myId = useMyId();
  return async (user: string, answer: any) => {
    if (context.rtcPeerConnections.find((r) => r.user === user) === undefined) {
      const peerConnection = new RTCPeerConnection(rtcServers);
      const offer = await peerConnection.createOffer();
      await peerConnection.setRemoteDescription(answer);
      await provideSdp({
        memberId: myId,
        sdp: JSON.stringify(offer),
        destination: user,
      });
      const value: RTCPeerConnectionInterface = {
        rtcPeerConnection: peerConnection,
        user: user,
        state: RTCPeerConnectionState.SDP_REMOTE_SET,
      };
      context.setRtcPeerConnections([...context.rtcPeerConnections, value]);

      return peerConnection;
    }
  };
}

export function useGetRTCPeerConnection() {
  const context = useContext(RTCStoreContext);
  return (user: string) => {
    context.rtcPeerConnections.find((r) => r.user === user);
  };
}

export function useSetRemoteDescription() {
  const context = useContext(RTCStoreContext);

  return async (sdp: SdpDto) => {
    const peer = context.rtcPeerConnections.find((r) => r.user == sdp.memberId);
    console.log(context.rtcPeerConnections);
    console.log(peer);

    if (peer) {
      const rtcPeerConnection = peer.rtcPeerConnection;
      await rtcPeerConnection.setRemoteDescription(JSON.parse(sdp.sdp));
      const value: RTCPeerConnectionInterface = {
        rtcPeerConnection: rtcPeerConnection,
        user: sdp.memberId,
        state: RTCPeerConnectionState.SDP_REMOTE_SET,
      };
      console.log(rtcPeerConnection);

      context.setRtcPeerConnections([...context.rtcPeerConnections, value]);
    }
  };
}

export function useCreateAnswerAndSetOffer() {
  const context = useContext(RTCStoreContext);
  const myId = useMyId();
  return async (user: string, offer: any) => {
    const rtcPeerConnection = context.rtcPeerConnections.find(
      (r) => r.user == user
    );
    console.log(context.rtcPeerConnections);

    console.log("Saljem answer");

    console.log(rtcPeerConnection);

    if (rtcPeerConnection !== undefined) {
      await rtcPeerConnection.rtcPeerConnection.setRemoteDescription(offer);
      const answer = await rtcPeerConnection.rtcPeerConnection.createOffer();
      provideSdp({
        memberId: myId,
        sdp: JSON.stringify(answer),
        destination: user,
      });
    }
  };
}

// export function useMakeRtcConnectionAndSetAnswer() {
//   const context = useContext(RTCStoreContext);
//   const generateSdp = useGenerateSdp();
//   const myId = useMyId();
//   return (sdp: SdpDto) => {
//     const peerConnection = new RTCPeerConnection(rtcServers);
//     const value: RTCPeerConnectionInterface = {
//       rtcPeerConnection: peerConnection,
//       user: sdp.memberId,
//       state: RTCPeerConnectionState.SDP_REMOTE_SET,
//     };
//     const answer = JSON.parse(sdp.sdp);
//     value.rtcPeerConnection.setRemoteDescription(answer);
//     const offer = await peerConnection.rtcPeerConnection.createOffer();
//     peerConnection.rtcPeerConnection.setLocalDescription(offer);
//     console.log("sending sdp to " + peerConnection.user);

//     console.log("Offer is:" + offer);

//     provideSdp({
//       memberId: myId,
//       sdp: JSON.stringify(offer),
//       destination: peerConnection.user,
//     });
//     const allConnections = context.rtcPeerConnections.filter(
//       (r) => r.user !== user
//     );
//     peerConnection.state = RTCPeerConnectionState.SDP_GENERATED;
//     context.setRtcPeerConnections([...allConnections, peerConnection]);
//   };
// }

export function useGenerateSdp() {
  const context = useContext(RTCStoreContext);
  const myId = useMyId();
  return async (user: string) => {
    const peerConnection = context.rtcPeerConnections.find(
      (r) => r.user === user
    );
    console.log("ovo je peer connection:" + peerConnection);

    if (
      peerConnection &&
      peerConnection.state != RTCPeerConnectionState.SDP_GENERATED
    ) {
      const offer = await peerConnection.rtcPeerConnection.createOffer();
      console.log(peerConnection);
      console.log("tu sam");

      await peerConnection.rtcPeerConnection.setLocalDescription(offer);
      console.log("sending sdp to " + peerConnection.user);

      console.log("Offer is:" + offer);

      provideSdp({
        memberId: myId,
        sdp: JSON.stringify(offer),
        destination: peerConnection.user,
      });
      const allConnections = context.rtcPeerConnections.filter(
        (r) => r.user !== user
      );
      peerConnection.state = RTCPeerConnectionState.SDP_GENERATED;
      context.setRtcPeerConnections([...allConnections, peerConnection]);
    }

    return peerConnection;
  };
}
