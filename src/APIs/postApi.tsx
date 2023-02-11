import { postInstance } from "./axios";

/* 커뮤니티 게시판 글작성 */
export const addPost = async (payload: any) => {
  const { data } = await postInstance.post("/api/posts", payload);
  // return (window.location.href = `post/${data.postId}/0`);
  return data;
};
