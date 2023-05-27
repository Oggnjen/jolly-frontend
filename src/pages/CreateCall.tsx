import { SelfCamera } from "../page-components/create-call/SelfCamera";
import { MediaAccessStoreProvider } from "../backend-layer/media-access/mediaAccessStoreProvider";

const CreateCall = () => {
  return (
    <>
      <MediaAccessStoreProvider>
        <SelfCamera />
      </MediaAccessStoreProvider>
    </>
  );
};

export default CreateCall;
