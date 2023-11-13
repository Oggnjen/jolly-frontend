import { useEffect, useState } from "react";
import { useJoinCall } from "../backend-layer/call/useJoinCall";
import {
  useGenerateSdp,
  useMakeRTCPeerConnection,
  useRTCPeerConnections,
  useSetRemoteDescription,
} from "../backend-layer/webrtc/rtcStoreHooks";
import { useAllMembers, useMyId } from "../backend-layer/call/callStoreHooks";
import { CallMember } from "../backend-layer/call/types";
import { Stomp } from "@stomp/stompjs";

const JoinCall = () => {
  const joinCall = useJoinCall();
  const [id, setId] = useState("");
  const rtcPeerConnection = useRTCPeerConnections();
  useOpenWebSocketOnJoinCall();
  useMakeRtcConnections();
  useEffect(() => {
    console.log(rtcPeerConnection);
  }, [rtcPeerConnection]);
  useGenerateSdps();

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

function useGenerateSdps() {
  const generateSdp = useGenerateSdp();
  const rtcPeerConnections = useRTCPeerConnections();
  useEffect(() => {
    rtcPeerConnections.forEach((rtc) => {
      generateSdp(rtc.user);
    });
  }, [rtcPeerConnections]);
}

function useMakeRtcConnections() {
  const members = useAllMembers();
  const makeRtc = useMakeRTCPeerConnection();
  useEffect(() => {
    const allCallMembers: CallMember[] = Object.values(members);
    allCallMembers.forEach((member) => {
      makeRtc(member.memberId);
    });
  }, [members]);
}

function useOpenWebSocketOnJoinCall() {
  const myId = useMyId();
  const setRemote = useSetRemoteDescription();
  useEffect(() => {
    if (myId !== "") {
      var socket = new WebSocket("ws://localhost:8088/api/ws");
      var ws = Stomp.over(socket);

      ws.connect(
        {},
        function () {
          ws.subscribe(`/user/${myId}/queue/private`, function (message) {
            const dto = JSON.parse(message.body);
            setRemote(dto);
            alert("Message " + message.body);
          });
        },
        function () {
          alert("STOMP error ");
        }
      );
    }
  }, [myId]);
}

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
