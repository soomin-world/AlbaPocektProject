import { instance, postInstance } from "../APIs/axios";

// 게시글 상세조회 get
export const getPost = async (id: any) => {
  const res = await postInstance.get(`/api/posts/${id}`);
  return res.data;
};

//게시글 수정
export const putPost = async (payload: any) => {
  await instance.put(`/api/posts/${payload[0]}`, payload[1]);
  return (window.location.href = `/post/${payload[0]}`);
};

//게시글 삭제
export const deletePost = async (payload: any) => {
  await instance.delete(`/api/posts/${payload}`);
  return (window.location.href = "/board");
};

/* -----------댓글 ---------*/
//댓글 작성
export const addComment = async (payload: any) => {
  const res = await instance.post(`/api/comments/${payload[0]}`, {
    comment: payload[1],
  });
  return;
};

//댓글 조회
export const getComments = async (payload: any) => {
  const res = await instance.get(`/api/comments/${payload}`);
  return res.data;
};

//댓글 수정
export const editComment = async (payload: any) => {
  const res = await instance.put(`/api/comments/${payload[0]}`, {
    comment: payload[1],
  });
  return res;
};

//댓글 삭제
export const deleteComment = async (payload: number) => {
  const res = await instance.delete(`/api/comments/${payload}`);
  return res;
};

//댓글 좋아요
export const changeLikeComment = async (payload: number) => {
  await instance.post(`/api/comments/${payload}/like`);
};
