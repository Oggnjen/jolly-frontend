import { CallMember } from "./types";

export interface CallStoreState {
  callId: string;
  myId: string;
  members: { [key: string]: CallMember };
}
