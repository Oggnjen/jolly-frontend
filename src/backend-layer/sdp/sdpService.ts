import { BASE_URL, getAxios } from "../utils/axiosWrapper";

export const provideSdp = (sdpDto: SdpDto) => {
  return getAxios().post(`${BASE_URL}/sdp`, sdpDto);
};

export interface SdpDto {
  memberId: string;
  sdp: string;
  destination: string;
}
