import { instance } from "./axios";

// 근무지 추가
export const addWork = async (payload: any) => {
  await instance.post("/api/workplace", payload);
  return (window.location.href = "/");
};

//근무지 조회
export const getWorks = async () => {
  const res = await instance.get("/api/workplace");
  return res;
  // return data;
};

//근무지 조회(선택)
export const getWork = async (payload: any) => {
  const res = await instance.get(`/api/workplace/${payload}`);
  return res.data;
};

//근무지 삭제
export const deleteWork = async (payload: number) => {
  await instance.delete(`/api/workplace/${payload}`);
  return window.location.reload;
};

export const putWork = async (payload: any) => {
  await instance.put(`/api/workplace/${payload[0]}`, payload[1]);
  return (window.location.href = "/");
};
