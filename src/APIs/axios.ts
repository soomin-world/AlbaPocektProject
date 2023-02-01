import axios, {
  // AxiosError,
  // AxiosInstance,
  AxiosRequestConfig,
  // AxiosResponse,
} from "axios";

export const baseURL = "https://jaeha.shop";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://jaeha.shop",
  headers: {
    // "content-type": "application/json;charset=UTF-8",
    //accept: "application/json,",
    "Access-Control-Allow-Origin": "*",
    //"Content-type": "application/json",
  },
});

export const postInstance = axios.create({
  baseURL: "https://woooo.shop",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "multipart/form-data",
    //"Content-type": "application/json",
  },
});

export const searchInstance = axios.create({
  baseURL: "https://woooo.shop",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "content-type": "text/html",
  },
});
// -----------------토큰 -------------------

// postInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("is_login");
//     if (token) {
//       config.headers = { authorization: token };
//       return config;
//     }
//     return config;
//   },
//   () => {
//     return;
//   }
// );

// instance.interceptors.request.use(
//   (config:AxiosRequestConfig) => {
const token = localStorage.getItem("is_login");
//     if (token) {
//       config.headers = { authorization: token };
//       return config;
//     }
//     return config;
//   },
//   () => {
//     return;
//   }
// );
instance.defaults.headers.common["Authorization"] = token;
postInstance.defaults.headers.common["Authorization"] = token;
searchInstance.defaults.headers.common["Authorization"] = token;

// searchInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("is_login");
//     if (token) {
//       config.headers = { authorization: token };
//       return config;
//     }
//     return config;
//   },
//   () => {
//     return;
//   }
// );
