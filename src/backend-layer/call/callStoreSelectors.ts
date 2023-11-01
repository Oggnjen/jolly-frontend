import { AppState } from "../store/store";

export const selectMyId = (state: AppState) => state.call.myId;

export const selectAllMembers = (state: AppState) => state.call.members;

export const selectCallId = (state: AppState) => state.call.callId;
