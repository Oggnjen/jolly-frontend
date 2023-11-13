import { Stomp } from "@stomp/stompjs";
import {
  useCreateAnswerAndSetOffer,
  useGenerateSdp,
  useMakeRTCPeerConnectionWithAnswer,
  useRTCPeerConnections,
} from "../../backend-layer/webrtc/rtcStoreHooks";
import { useCreateCall } from "../../backend-layer/call/useMakeCall";
import { useCallId, useMyId } from "../../backend-layer/call/callStoreHooks";
import { useEffect } from "react";
import { SdpDto } from "../../backend-layer/sdp/sdpService";
import { RTCPeerConnectionState } from "../../backend-layer/webrtc/rtcStoreContext";

export function Peers() {
  const createCall = useCreateCall();
  const callId = useCallId();
  const myId = useMyId();

  useOpenWebSocketOnCreateCall(myId);
  useSendOffers();
  return (
    <>
      <button
        onClick={async () => {
          await createCall();
          // console.log(myId);
          // setTimeout(() => openWebSocket(myId), 1000);
        }}
      >
        Kreiraj poziv
      </button>
      <div id="copy">{callId}</div>
      <button onClick={() => navigator.clipboard.writeText(callId)}>
        klik
      </button>
    </>
  );
}

function useSendOffers() {
  const rtcPeerConnections = useRTCPeerConnections();
  const generateSdp = useGenerateSdp();
  useEffect(() => {
    console.log(rtcPeerConnections);
    // rtcPeerConnections.forEach((r) => {
    //   generateSdp(r.user);
    // });
  }, [rtcPeerConnections]);
}

function useOpenWebSocketOnCreateCall(myId: string) {
  const makeRtc = useMakeRTCPeerConnectionWithAnswer();
  const s = useCreateAnswerAndSetOffer();
  useEffect(() => {
    if (myId !== "") {
      var socket = new WebSocket("ws://localhost:8088/api/ws");
      var ws = Stomp.over(socket);

      ws.connect(
        {},
        function () {
          ws.subscribe(`/user/${myId}/queue/private`, async function (message) {
            const sdp = JSON.parse(message.body) as SdpDto;
            console.log("SDP STIGAO");
            console.log(sdp);

            makeRtc(sdp.memberId, JSON.parse(sdp.sdp));
          });
        },
        function () {
          alert("STOMP error ");
        }
      );
    }
  }, [myId]);
}
