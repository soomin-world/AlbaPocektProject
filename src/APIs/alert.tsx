import { instance } from "./axios";

export const getNotifications = async () => {
  const { data } = await instance.get("notifications");
  return data;
};
