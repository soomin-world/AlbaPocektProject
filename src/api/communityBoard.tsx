// infinite scroll을 구현할 예정 back 과 얘기해봐야함

import { postInstance } from "./api";

//전체 게시글 조회

export const getAllPosts = async (payload: any) => {
  const res = await postInstance.get("/api/posts");
  return res;
};

//카테고리별 조회
export const getPosts = async (payload: any) => {
  const res = await postInstance.get(`/api/posts/category?keyword=${payload}`);
  return res;
};
