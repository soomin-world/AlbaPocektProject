import { postInstance } from "./api";

// 게시글 상세조회 get
export const getPost = async (payload: any) => {
  const res = await postInstance.get(`/api/posts/${payload.id}`);
  return res;
};

//게시글 수정
export const editPost = async (payload: any) => {
  await postInstance.put(`/api/posts/${payload.id}`, payload);
};

//게시글 삭제
export const deletePost = async (payload: any) => {
  await postInstance.delete(`/api/posts/${payload.id}`);
};

/* -----------댓글 ---------*/
//댓글 작성
export const addComment = async (payload: any) => {
  await postInstance.post(`/api/comments/${payload.id}`, payload.comment);
};

//댓글 수정
export const editComment = async (payload: any) => {
  await postInstance.put(`/api/comments/${payload.id}`, payload.comment);
};

//댓글 삭제
export const deleteComment = async (payload: any) => {
  await postInstance.delete(`/api/comments/${payload.id}`);
};

/*----------좋아요 --------- 감 안잡힘 ㅋ*/

//state로 관리가능
