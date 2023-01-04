import axios, {
  // AxiosError,
  // AxiosInstance,
  AxiosRequestConfig,
  // AxiosResponse,
} from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://woooo.shop",
  headers: {
    // "content-type": "application/json;charset=UTF-8",
    // accept: "application/json,",
    "Access-Control-Allow-Origin": "*",
  },
});

//   instance.interceptors.request.use(
//     (config: AxiosRequestConfig) => {
//       const token = getCookieToken();
//       if (token) {
//         config.headers = { authorization: token };
//         return config;
//       }
//       return config;
//     },
//     () => {
//       return;
//     },
//   );
