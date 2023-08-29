import { useEffect, useState } from "react";
import { useRTCPeerConnection } from "../../backend-layer/webrtc/rtcStoreHooks";
import { useMediaStream } from "../../backend-layer/media-access/mediaAccessStoreHooks";
import { UserDto } from "../../backend-layer/login/loginService";

export function Jumper(user: UserDto) {
  const [rtcPeerConnection, setRtcPeerConnection] = useRTCPeerConnection();
  const [s, setS] = useState("asd");
  const [mediaStream, setMediaStream] = useMediaStream();

  useEffect(() => {
    console.log("ef");
    rtcPeerConnection.addEventListener("icecandidate", (event) => {
      if (event.candidate) {
        console.log(event.candidate);
      }
    });
  }, []);

  return (
    <div
      onClick={async () => {
        console.log(rtcPeerConnection);
        const offer = await rtcPeerConnection.createOffer();
        await rtcPeerConnection.setLocalDescription(offer);
      }}
    >
      {/* Hi i am jumper {id} and my rtcPeerConnection is: */}
      <div
        onClick={() => {
          if (mediaStream) {
            rtcPeerConnection.addTrack(mediaStream.getTracks()[0]);
            rtcPeerConnection.addTrack(mediaStream.getTracks()[1]);
          }
        }}
      >
        klik
      </div>
    </div>
  );
}
