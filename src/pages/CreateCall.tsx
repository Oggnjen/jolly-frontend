import { SelfCamera } from "../page-components/create-call/SelfCamera";
import { MediaAccessStoreProvider } from "../backend-layer/media-access/mediaAccessStoreProvider";
import { CallMembers } from "../page-components/create-call/CallMembers";

const CreateCall = () => {
  return (
    <>
      <MediaAccessStoreProvider>
        <SelfCamera />
        <CallMembers />
      </MediaAccessStoreProvider>
    </>
  );
};

export default CreateCall;
