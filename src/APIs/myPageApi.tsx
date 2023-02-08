import { instance, postInstance } from "./axios";

export const getMyPage = async (payload: number) => {
  const { data } = await instance.get(`/api/mypage?page=${payload}&size=5`);
  return data;
};

export const editMyPage = async (payload: any) => {
  const { data } = await postInstance.put("/api/mypage", payload);
  return data;
};

export const getMyLike = async (payload: number) => {
  const { data } = await instance.get(
    `/api/mypage/like?page=${payload}&size=5`
  );
  return data;
};

export const getMyComment = async (payload: number) => {
  const { data } = await instance.get(
    `/api/mypage/comments?page=${payload}&size=5`
  );
  return data;
};

export const deleteMyComment = async (payload: number[]) => {
  const { data } = await instance.delete("/api/mypage/comments", {
    data: { commentIdList: [...payload] },
  });
  return data;
};
