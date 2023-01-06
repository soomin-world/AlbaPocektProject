import { Instance, postInstance } from "./api";

// 게시글 상세조회 get
export const getPost = async (id: any) => {
  const res = await postInstance.get(`/api/posts/${id}`);
  return res;
};

//게시글 수정
export const putPost = async (payload: any) => {
  console.log("payload:", payload);
  await Instance.put(`/api/posts/${payload[0]}`, payload[1]);
};

//게시글 삭제
export const deletePost = async (payload: any) => {
  await postInstance.delete(`/api/posts/${payload.id}`);
};

/* -----------댓글 ---------*/
//댓글 작성
export const addComment = async (payload: any) => {
  console.log(payload);
  await Instance.post(`/api/comments/${payload[0]}`, payload[1]);
};

//댓글 조회
export const getComments = async (payload: any) => {
  console.log(payload);
  await Instance.post(`/api/comments/${payload}`);
};

//댓글 수정
export const editComment = async (payload: any) => {
  await Instance.put(`/api/comments/${payload.id}`, payload.comment);
};

//댓글 삭제
export const deleteComment = async (payload: any) => {
  await Instance.delete(`/api/comments/${payload.id}`);
};

/*----------좋아요 --------- 감 안잡힘 ㅋ*/

//state로 관리가능
