import { useEffect, useRef } from "react";
import {
  useCreateMediaStream,
  useMediaStream,
} from "../../backend-layer/media-access/mediaAccessStoreHooks";
import { useRTCPeerConnection } from "../../backend-layer/webrtc/rtcStoreHooks";

export function SelfCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const createMediaStream = useCreateMediaStream();
  const [stream, setStream] = useMediaStream();
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  return (
    <div>
      <div
        onClick={() => {
          createMediaStream({ video: true, audio: true });
        }}
      >
        Start video
      </div>
      <video id="localVideo" ref={videoRef} autoPlay playsInline />
    </div>
  );
}
