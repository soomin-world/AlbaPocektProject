import { instance, postInstance } from "./axios";

export const getMyPage = async () => {
  const { data } = await instance.get("/api/mypage");
  return data;
};

export const editMyPage = async (payload: any) => {
  const { data } = await postInstance.put("/api/mypage", payload);
  return data;
};
