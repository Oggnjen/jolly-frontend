export interface CallMember {
  name: string;
  surname: string;
  email: string;
  memberId: string;
  state: CallMemberState;
}

export enum CallMemberState {
  JUST_FETCHED,
  RECEIVED_SDP,
}
