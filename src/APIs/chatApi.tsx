import { instance } from "./axios";

export const connectChat = async (payload: string) => {
  const res = await instance.post(`/api/`);
};
