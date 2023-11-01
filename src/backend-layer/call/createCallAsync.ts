import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { AppState } from "../store/store";
import { CallStoreState } from "./CallStoreState";
import { CreatedCallDto, createCall } from "./callStoreService";
import { useOpenWebSocket } from "../websocket/webSocketService";

export const createCallAsync = createAsyncThunk<
  CreatedCallDto,
  undefined,
  { state: AppState }
>("callStore/createCallAsync", async (_, thunkApi) => {
  const response = await createCall();

  if (response.status !== 200) {
    throw Error("Server returned non 200 code");
  }
  // useOpenWebSocket(response.data.callerId);
  return response.data;
});

export function applyCreateCallAsyncExtraReducers(
  builder: ActionReducerMapBuilder<CallStoreState>
) {
  builder.addCase(createCallAsync.pending, (state) => {});

  builder.addCase(createCallAsync.fulfilled, (state, action) => {
    const payload = action.payload;
    state.callId = payload.callId;
    state.myId = payload.callerId;
  });

  builder.addCase(createCallAsync.rejected, (state) => {});
}
