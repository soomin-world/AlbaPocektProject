import { instance } from "./axios";
import { IworkType } from "../types/workType";

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

//근무지수정
export const putWork = async (payload: any) => {
  await instance.put(`/api/workplace/${payload[0]}`, payload[1]);
  return (window.location.href = "/");
};

//근무 추가
export const addShift = async (payload: any) => {
  await instance.post(`/api/work/${payload[0]}`, payload[1]);
  return (window.location.href = "/");
};

// 근무 등록(수정)
export const getEditWork = async (payload: string | undefined) => {
  const { data } = await instance.get(`/api/work/${payload}`);
  return data;
};

// 근무 등록(수정)
export const editWork = async (payload: any) => {
  const { data } = await instance.put(`/api/work/${payload[0]}`, payload[1]);
  return data;
};

//근무지에 따른 한달치 수익
export const getMonthlyWage = async (payload: number) => {
  const { data } = await instance.get(`/api/work/total/${payload}`);
  console.log(payload);
  return data;
};
