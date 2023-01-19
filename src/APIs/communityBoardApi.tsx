// infinite scroll을 구현할 예정 back과 얘기해봐야함
import { instance, postInstance } from "./axios";

//무한 스크롤
export const getInfinitePost = async (pageParam: number) => {
  const { data } = await instance.get(`/api/posts?page=${pageParam}&size=5`);
  const { content, last } = data;
  return { content, last, nextPage: pageParam + 1 };
};

//전체 게시글 조회
export const getAllPosts = async () => {
  const { data } = await instance.get("/api/posts");
  return data;
};

//카테고리별 조회
export const getPosts = async (payload: string) => {
  const { data } = await instance.get(`/api/posts/category?keyword=${payload}`);
  return data;
};

// 게시물 좋아요
export const changeLikePost = async (payload: number) => {
  await instance.post(`/api/posts/${payload}/like`);
};

// 게시물 검색
export const getSearch = async (payload: string) => {
  const { data } = await postInstance.get(
    `/api/posts/search?keyword=${payload}`
  );
  console.log(data);
  return data;
};
