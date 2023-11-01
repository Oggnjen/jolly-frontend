import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CallStoreState } from "./CallStoreState";
import { applyCreateCallAsyncExtraReducers } from "./createCallAsync";
import { applyJoinCallAsyncExtraReducers } from "./joinCallAsync";
import { CallMemberState } from "./types";

const initialState: CallStoreState = {
  callId: "",
  myId: "",
  members: {},
};

export const callStoreSlice = createSlice({
  name: "callStore",
  initialState: initialState,
  reducers: {
    setCallMemberStateToSdpRecieved: (state, action: PayloadAction<string>) => {
      const member = state.members[action.payload];
      state.members[action.payload] = {
        ...member,
        state: CallMemberState.RECEIVED_SDP,
      };
    },
  },
  extraReducers: (builder) => {
    applyCreateCallAsyncExtraReducers(builder);
    applyJoinCallAsyncExtraReducers(builder);
  },
});

export const { setCallMemberStateToSdpRecieved } = callStoreSlice.actions;

export default callStoreSlice.reducer;
