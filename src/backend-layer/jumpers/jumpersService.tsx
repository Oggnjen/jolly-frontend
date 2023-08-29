import { UserDto } from "../login/loginService";
import { BASE_URL, getAxios } from "../utils/axiosWrapper";

export function getAllUsers() {
  return getAxios().get(`${BASE_URL}/users`);
}
