import { Stomp } from "@stomp/stompjs";
import { useRTCPeerConnections } from "../../backend-layer/webrtc/rtcStoreHooks";
import { useCreateCall } from "../../backend-layer/call/useMakeCall";
import { useCallId, useMyId } from "../../backend-layer/call/callStoreHooks";
import { useEffect } from "react";

export function Peers() {
  const createCall = useCreateCall();
  const callId = useCallId();

  const myId = useMyId();

  useEffect(() => {
    console.log(myId);

    if (myId != "") {
      var socket = new WebSocket("ws://localhost:8088/api/ws");
      var ws = Stomp.over(socket);

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
      <label>{callId}</label>
    </>
  );
}
