import axios, { AxiosError, AxiosInstance } from "axios";
import ENV from "./env";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: ENV.baseUrl, // Replace with your API base URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
