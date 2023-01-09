import { instance } from "./axios";

// 근무지 추가
export const addWork = async (payload: any) => {
  console.log(payload);
  await instance.post("/api/workplace", payload);
  return (window.location.href = "/");
};

//근무지 조회
export const getWork = async () => {
  const res = await instance.get("/api/workplace");
  return res;

  // return data;
};
