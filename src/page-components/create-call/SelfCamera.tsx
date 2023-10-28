import { useEffect, useRef } from "react";
import {
  useCreateMediaStream,
  useMediaStream,
} from "../../backend-layer/media-access/mediaAccessStoreHooks";
import {
  useCreateOffer,
  useRTCPeerConnection,
} from "../../backend-layer/webrtc/rtcStoreHooks";
import { Client, IFrame, Stomp } from "@stomp/stompjs";
import { getToken } from "../../backend-layer/utils/utils";
import { BASE_URL, getAxios } from "../../backend-layer/utils/axiosWrapper";

export function SelfCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const createOffer = useCreateOffer();
  const createMediaStream = useCreateMediaStream();
  const [stream, setStream] = useMediaStream();
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.volume = 0;
    }
  }, [stream]);
  return (
    <div>
      <div
        onClick={() => {
          createMediaStream({ video: true, audio: true });
        }}
      >
        Create
      </div>
      <video id="localVideo" ref={videoRef} autoPlay playsInline />

      <button
        onClick={() => {
          createOffer();
          var socket = new WebSocket("ws://localhost:8088/api/ws");
          var ws = Stomp.over(socket);

          ws.connect(
            {},
            function () {
              ws.subscribe("/user/john123/queue/private", function (message) {
                console.log(message);
                alert("Message " + message.body);
              });
            },
            function () {
              alert("STOMP error ");
            }
          );
        }}
      >
        Initiate call
      </button>
      <button
        onClick={() => {
          getAxios()
            .get(`${BASE_URL}/call`)
            .then((response) => {
              console.log("Uspjesno logovan2");
            })
            .catch(() => {
              console.log("Neuspjesno registrovan");
            });
        }}
      >
        ajde
      </button>
    </div>
  );
}
