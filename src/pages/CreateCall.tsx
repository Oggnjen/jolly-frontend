import { SelfCamera } from "../page-components/create-call/SelfCamera";
import { MediaAccessStoreProvider } from "../backend-layer/media-access/mediaAccessStoreProvider";
import { RTCStoreProvider } from "../backend-layer/webrtc/rtcStoreProvider";
import { Peers } from "../page-components/create-call/Peers";
import JoinCall from "./JoinCall";

const CreateCall = () => {
  return (
    <>
      <MediaAccessStoreProvider>
        <RTCStoreProvider>
          <SelfCamera />
          <Peers />
          <JoinCall />
        </RTCStoreProvider>
      </MediaAccessStoreProvider>
    </>
  );
};

export default CreateCall;
