import { SelfCamera } from "../page-components/create-call/SelfCamera";
import { MediaAccessStoreProvider } from "../backend-layer/media-access/mediaAccessStoreProvider";
import { RTCStoreProvider } from "../backend-layer/webrtc/rtcStoreProvider";

const CreateCall = () => {
  return (
    <>
      <MediaAccessStoreProvider>
        <RTCStoreProvider>
          <SelfCamera />
        </RTCStoreProvider>
      </MediaAccessStoreProvider>
    </>
  );
};

export default CreateCall;
