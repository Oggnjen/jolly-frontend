import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../store/store";
import { CallStoreState } from "./CallStoreState";
import {
  CreatedCallDto,
  JoinedCallDto,
  createCall,
  joinCall,
} from "./callStoreService";
import { CallMember, CallMemberState } from "./types";
import { useOpenWebSocket } from "../websocket/webSocketService";

export const joinCallAsync = createAsyncThunk<
  JoinedCallDto,
  { callId: string },
  { state: AppState }
>("callStore/joinCallAsync", async ({ callId }, thunkApi) => {
  const response = await joinCall(callId);

  if (response.status !== 200) {
    throw Error("Server returned non 200 code");
  }
  return response.data;
});

export function applyJoinCallAsyncExtraReducers(
  builder: ActionReducerMapBuilder<CallStoreState>
) {
  builder.addCase(joinCallAsync.pending, (state) => {});

  builder.addCase(joinCallAsync.fulfilled, (state, action) => {
    const payload = action.payload;
    state.callId = payload.callId;
    state.myId = payload.myId;
    payload.members.forEach((m) => {
      state.members[m.memberId] = {
        email: m.email,
        name: m.name,
        surname: m.surname,
        memberId: m.memberId,
        state: CallMemberState.JUST_FETCHED,
      };
    });
  });

  builder.addCase(joinCallAsync.rejected, (state) => {});
}
