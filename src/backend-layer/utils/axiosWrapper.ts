import axios from "axios";

export const BASE_URL = "http://localhost:8088/api"

const defaultHeaders = {
  accept: "application/json",
  "Content-Type": "application/json",
};

export function getAxios() {
  const token = localStorage.getItem("token");
  if (token == null) {
    return axios.create({
      baseURL: "http://localhost:8088",
      headers: {
        ...defaultHeaders,
      },
    });
  }
  return axios.create({
    baseURL: "http://localhost:8088",
    headers: {
      ...defaultHeaders,
      Authorization: `Bearer ${token}`,
    },
  });
}