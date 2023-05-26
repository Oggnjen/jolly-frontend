import { useRTCPeerConnection } from "../backend-layer/webrtc/rtcStoreHooks";

const CreateCall = () => {
  const rtcPeerConnection = useRTCPeerConnection();

  return (
    <div>
      <div
        onClick={() => {
          console.log(rtcPeerConnection);
        }}
      >
        Create
      </div>
    </div>
  );
};

export default CreateCall;
