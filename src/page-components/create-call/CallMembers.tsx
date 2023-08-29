import { useEffect, useState } from "react";
import { Jumper } from "./Jumper";
import { RTCStoreProvider } from "../../backend-layer/webrtc/rtcStoreProvider";
import { useMediaStream } from "../../backend-layer/media-access/mediaAccessStoreHooks";
import { UserDto } from "../../backend-layer/login/loginService";
import { getAllUsers } from "../../backend-layer/jumpers/jumpersService";

export function CallMembers() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [jumpers, setJumpers] = useState<UserDto[]>([]);
  const [mediaStream, setMediaStream] = useMediaStream();

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      {users.map((u) => (
        <div>{u.email}</div>
      ))}
      <div onClick={() => {}}>Add jumper</div>
      {/* {jumpers.map((j) => (
        <RTCStoreProvider key={j} mediaStream={mediaStream}>
          <Jumper id={j} />
        </RTCStoreProvider>
      ))} */}
    </>
  );
}
