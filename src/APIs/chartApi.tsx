import { instance } from "./axios";

export const getHours = async (payload: string) => {
  const { data } = await instance.get(`/api/statistics/time/${payload}`);
  return data;
};

export const getFiveMonths = async () => {
  const { data } = await instance.get("/api/statistics/fivemonth");
  return data;
};
