import axios, {
  // AxiosError,
  // AxiosInstance,
  AxiosRequestConfig,
  // AxiosResponse,
} from "axios";

export const baseURL = "https://woooo.shop";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://woooo.shop",
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

instance.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거
    // 응답 오류가 있는 작업 수행
    if (error.response && error.response.status) {
      switch (error.response.status) {
        // status code가 401인 경우 `logout`을 커밋하고 `/login` 페이지로 리다이렉트
        case 401:
          localStorage.removeItem("is_login");
          localStorage.removeItem("userId");
          window.location.href = "/login";
          // store.commit('auth/logout');
          // router.push('/login').catch(() => {});
          break;
        default:
          return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

postInstance.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거
    // 응답 오류가 있는 작업 수행
    if (error.response && error.response.status) {
      switch (error.response.status) {
        // status code가 401인 경우 `logout`을 커밋하고 `/login` 페이지로 리다이렉트
        case 401:
          localStorage.removeItem("is_login");
          localStorage.removeItem("userId");
          window.location.href = "/login";
          // store.commit('auth/logout');
          // router.push('/login').catch(() => {});
          break;
        default:
          return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

searchInstance.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거
    // 응답 오류가 있는 작업 수행
    if (error.response && error.response.status) {
      switch (error.response.status) {
        // status code가 401인 경우 `logout`을 커밋하고 `/login` 페이지로 리다이렉트
        case 401:
          localStorage.removeItem("is_login");
          localStorage.removeItem("userId");
          window.location.href = "/login";
          // store.commit('auth/logout');
          // router.push('/login').catch(() => {});
          break;
        default:
          return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
