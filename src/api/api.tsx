import axios, {
  // AxiosError,
  // AxiosInstance,
  AxiosRequestConfig,
  // AxiosResponse,
} from "axios";

/* ------------postInstance ------------ */
export const postInstance = axios.create({
  baseURL: "https://woooo.shop",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "multipart/form-data",
    //"Content-type": "application/json",
  },
});

postInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("is_login");
    if (token) {
      config.headers = { authorization: token };
      return config;
    }
    return config;
  },
  () => {
    return;
  }
);
