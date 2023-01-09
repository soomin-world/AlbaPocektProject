import { instance } from "./axios";

export const getMyPage = async () => {
  const { data } = await instance.get("/api/mypage");
  return data;
};
