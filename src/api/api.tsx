import axios from "axios";

/* ------------postInstance ------------ */
export const postInstance = axios.create({
  baseURL: "https://woooo.shop",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "multipart/form-data",
    //"Content-type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3b29vbzk2QGdhbWlsLmNvbSIsImV4cCI6MTY3MjkzNTY5MSwiaWF0IjoxNjcyODk5NjkxfQ.YYN6C39g9mPcGZWcQpdtx1r2RKnHhIqy57ecDNgJszo",
  },
});

// postInstance.interceptors.request.use((config) => {
//   if (config.headers === undefined) return;
//   const token = getCookie("userToken");
//   config.headers["Authorization"] = `${token}`;
//   return config;
// });
