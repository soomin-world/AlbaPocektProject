// 근무지 추가

import { instance } from "./axios";

export const addWork = async (payload: any) => {
  await instance.post("/api/workplace", payload);
  return (window.location.href = "/");
};
