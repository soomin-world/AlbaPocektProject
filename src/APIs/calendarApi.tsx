import { instance } from "./axios";

// 근무달력 조회 (월별)
export const getMonthly = async (payload: string) => {
  const { data } = await instance.get(`/api/calendar/month/${payload}`);
  return data;
};

// 근무달력 조회 (일별)
export const getDaily = async (payload: string | undefined) => {
  const { data } = await instance.get(`/api/calendar/day/${payload}`);
  return data;
};

// 근무달력 조회 (주휴수당)
export const getBonus = async (payload: string) => {
  const { data } = await instance.get(`/api/calendar/bonus/${payload}`);
  return data;
};

// 근무달력 조회 (월 총합 급여)
export const getTotal = async (payload: string) => {
  const { data } = await instance.get(`/api/calendar/total/${payload}`);
  return data;
};

// todo 조회
export const getTodo = async (todoId: string) => {
  const { data } = await instance.get(`/api/work/${todoId}`);
  return data;
};

// todo 수정
export const editTodo = async (todoId: string) => {
  const { data } = await instance.put(`/api/work/${todoId}`);
  return data;
};

// todo 삭제
export const deleteTodo = async (todoId: string | undefined) => {
  const { data } = await instance.delete(`/api/work/${todoId}`);
  return data;
};
