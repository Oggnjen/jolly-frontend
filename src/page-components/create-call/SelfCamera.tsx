import { useEffect, useRef } from "react";
import {
  useCreateMediaStream,
  useMediaStream,
} from "../../backend-layer/media-access/mediaAccessStoreHooks";
import {
  useCreateOffer,
  useRTCPeerConnection,
} from "../../backend-layer/webrtc/rtcStoreHooks";

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
        }}
      >
        Initiate call
      </button>
    </div>
  );
}
