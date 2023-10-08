import Axios, { InternalAxiosRequestConfig } from "axios";
import { API_URL } from "@/lib/config";
import { useNotificationStore } from "@/stores/notifications";
import storage from "@/lib/storage";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.getToken();
  if (config && config.headers) {
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    config.headers.Accept = "application/json";
  }
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {    
    if (error?.response?.status === 401) {
      storage.clearToken();
      // window.location.assign(window.location.origin as unknown as string);
    }

    const message = error.response?.data?.message || error.message;
    useNotificationStore.getState().addNotification({
      type: "error",
      title: "Failure",
      message,
    });

    return Promise.reject(error);
  }
);
