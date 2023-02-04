import { instance } from "./axios";

export const createChatRoom = async (payload: string) => {
  const res = await instance.post(`/api/chat/rooms/${payload}`);
  console.log(res);
  return res.data;
};

export const quitChatRoom = async (payload: string | undefined) => {
  const res = await instance.delete(`/api/chat/rooms/${payload}`);
  return (window.location.href = "/chat");
};

export const getChatList = async () => {
  const res = await instance.get("/api/chat/rooms");
  return res;
};

export const getDetailChat = async (payload: string | undefined) => {
  const res = await instance.get(`/api/chat/message/${payload}`);
  console.log(res);
  return res;
};
