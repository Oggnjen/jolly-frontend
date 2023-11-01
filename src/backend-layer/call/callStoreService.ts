import { BASE_URL, getAxios } from "../utils/axiosWrapper";

// export function createCall() {
//   return () =>
//     getAxios()
//       .post(`${BASE_URL}/call`)
//       .then((response) => {
//         console.log("Uspjesno napravljen poziv, sdp je:");
//         console.log(response.data);
//       })
//       .catch(() => {
//         console.log("Neuspjesno napravljen poziv");
//       });
// }

export const createCall = () => {
  return getAxios().post<CreatedCallDto>(`${BASE_URL}/call`, {
    data: {},
  });
};

export const joinCall = (callId: string) => {
  return getAxios().post<JoinedCallDto>(`${BASE_URL}/call/${callId}`);
};

export interface CallMemberDto {
  email: string;
  name: string;
  surname: string;
  memberId: string;
}

export interface JoinedCallDto {
  callId: string;
  myId: string;
  members: CallMemberDto[];
}

export interface CreatedCallDto {
  callId: string;
  callerId: string;
}
