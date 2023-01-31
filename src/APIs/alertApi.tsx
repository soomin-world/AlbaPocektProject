import { instance } from "./axios";

export const getNotifications = async () => {
  const { data } = await instance.get("notifications");
  return data;
};

export const notificationRead = async (notificationId: number) => {
  const { data } = await instance.post(`/notification/read/${notificationId}`);
  return data;
};

export const notificationDelete = async (notificationId: number) => {
  const { data } = await instance.delete(
    `/notifications/delete/${notificationId}`
  );
  return data;
};

export const notificationDeleteAll = async () => {
  const { data } = await instance.delete("/notifications/delete");
  return data;
};
