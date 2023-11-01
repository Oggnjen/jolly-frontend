import { BASE_URL, getAxios } from "../utils/axiosWrapper";

export const provideSdp = (sdpDto: SdpDto) => {
  return getAxios().post(`${BASE_URL}/sdp`, sdpDto);
};

export interface SdpDto {
  sdp: string;
  destination: string;
}
