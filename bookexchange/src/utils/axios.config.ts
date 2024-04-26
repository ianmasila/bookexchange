import axios, { InternalAxiosRequestConfig } from "axios";
import { BASE_URL } from "../constants";

const client = axios.create({
  baseURL: BASE_URL,
});

client.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // TODO: Get authentication token
    const token = "TOKEN";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default client;
