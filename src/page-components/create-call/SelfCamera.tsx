import { useEffect, useRef } from "react";
import {
  useCreateMediaStream,
  useMediaStream,
} from "../../backend-layer/media-access/mediaAccessStoreHooks";

export function SelfCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
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
        onClick={async () => {
          createMediaStream({ video: true, audio: true });
        }}
      >
        Create
      </div>
      <video id="localVideo" ref={videoRef} autoPlay playsInline />
    </div>
  );
}
