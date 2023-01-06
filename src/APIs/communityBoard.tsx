// infinite scroll을 구현할 예정 back 과 얘기해봐야함

import { instance, postInstance } from "./axios";

//전체 게시글 조회

export const getAllPosts = async () => {
  const { data } = await instance.get("/api/posts");
  return data;
};

//카테고리별 조회
export const getPosts = async (payload: string) => {
  const { data } = await postInstance.get(
    `/api/posts/category?keyword=${payload}`
  );
  return data;
};
