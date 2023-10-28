import { BASE_URL, getAxios } from "../utils/axiosWrapper";

export function createCall() {
  return (sdp: string) =>
    getAxios()
      .post(`${BASE_URL}/call`, { sdp: sdp })
      .then((response) => {
        console.log("Uspjesno napravljen poziv, sdp je:");
        console.log(response.data);
      })
      .catch(() => {
        console.log("Neuspjesno napravljen poziv");
      });
}
