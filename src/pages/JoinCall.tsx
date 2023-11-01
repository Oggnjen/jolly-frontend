import { useEffect, useState } from "react";
import { useJoinCall } from "../backend-layer/call/useJoinCall";
import {
  useGenerateSdp,
  useMakeRTCPeerConnection,
  useRTCPeerConnections,
} from "../backend-layer/webrtc/rtcStoreHooks";
import { selectAllMembers } from "../backend-layer/call/callStoreSelectors";
import { useAllMembers, useMyId } from "../backend-layer/call/callStoreHooks";
import { CallMember } from "../backend-layer/call/types";
import { useAppDispatch } from "../backend-layer/store/store";
import { Stomp } from "@stomp/stompjs";
import { useOpenWebSocket } from "../backend-layer/websocket/webSocketService";

const JoinCall = () => {
  const joinCall = useJoinCall();
  const [id, setId] = useState("");
  const makeRtc = useMakeRTCPeerConnection();
  const generateSdp = useGenerateSdp();
  const rtcPeerConnections = useRTCPeerConnections();
  const dispatch = useAppDispatch();

  const myId = useMyId();

  const members = useAllMembers();

  useEffect(() => {
    console.log(myId);

    if (myId != "") {
      var socket = new WebSocket("ws://localhost:8088/api/ws");
      var ws = Stomp.over(socket);
      console.log(rtcPeerConnections);

      ws.connect(
        {},
        function () {
          ws.subscribe(`/user/${myId}/queue/private`, function (message) {
            console.log(message);

            alert("Message " + message.body);
          });
        },
        function () {
          alert("STOMP error ");
        }
      );
    }
  }, [myId]);

  useEffect(() => {
    const allCallMembers: CallMember[] = Object.values(members);
    allCallMembers.forEach((member) => {
      makeRtc(member.memberId);
    });
  }, [members]);

  useEffect(() => {
    rtcPeerConnections.forEach((rtc) => {
      generateSdp(rtc.user);
    });
  }, [rtcPeerConnections]);
  return (
    <>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <button
        onClick={() => {
          joinCall(id);
        }}
      >
        Join
      </button>
    </>
  );
};

// function useOpenSockets2(myId: string) {
//   if (myId != "") {
//     useOpenWebSocket(myId);
//   }
// }

// function useOpenWebSocket(myId: string) {
//   var socket = new WebSocket("ws://localhost:8088/api/ws");
//   const dispatch = useAppDispatch();
//   const rtcPeerConnections = useRTCPeerConnections();
//   var ws = Stomp.over(socket);
//   ws.connect(
//     {},
//     function () {
//       ws.subscribe(`/user/${myId}/queue/private`, function (message) {
//         console.log(message);

//         alert("Message " + message.body);
//       });
//     },
//     function () {
//       alert("STOMP error ");
//     }
//   );
// }

export interface SdpPayload {
  memberId: string;
  sdp: string;
}

export default JoinCall;
