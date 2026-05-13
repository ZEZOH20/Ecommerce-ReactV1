import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../Constants";

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

export function authHeaders(token: string): AxiosRequestConfig {
  return {
    headers: {
      token,
    },
  };
}

export function isApiError(error: unknown) {
  return axios.isAxiosError(error);
}
