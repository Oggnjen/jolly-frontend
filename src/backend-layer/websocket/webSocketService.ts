import { Stomp } from "@stomp/stompjs";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectMyId } from "../call/callStoreSelectors";
import { setCallMemberStateToSdpRecieved } from "../call/callStoreSlice";
import { useRTCPeerConnections } from "../webrtc/rtcStoreHooks";

export function useOpenWebSocket(myId: string) {
  var socket = new WebSocket("ws://localhost:8088/api/ws");
  const dispatch = useAppDispatch();
  var ws = Stomp.over(socket);
  const peers = useRTCPeerConnections();
  console.log(peers);

  ws.connect(
    {},
    function () {
      ws.subscribe(`/user/asd/queue/private`, function (message) {
        console.log(message);

        alert("Message " + message.body);
      });
    },
    function () {
      alert("STOMP error ");
    }
  );
}

export interface SdpPayload {
  memberId: string;
  sdp: string;
}
