import axios from "axios";
import { useMutation } from "react-query";
import { instance } from "./axios";
import {
  IForm,
  IUserId,
  INickname,
  ILogin,
  IData,
  IEmail,
} from "../types/loginRegisterType";
// import useAccessToken from "../hooks/useAccessToken";

const setAccessToken = (accessToken: string) => {
  localStorage.setItem("is_login", accessToken);
};

const setUserId = (userId: string) => {
  localStorage.setItem("userId", userId);
};

const setNickName = (myNickName: string) => {
  localStorage.setItem("nickname", myNickName);
};

export const registerApi = async (registerInfo: IForm) => {
  const { data } = await instance.post<IForm>("/api/user/signup", {
    userId: registerInfo.email,
    nickname: registerInfo.nickname,
    password: registerInfo.password,
  });
  return data;
};

export const userIdCheckApi = async (userId: IForm) => {
  const { data } = await instance.post<IUserId>("/api/user/userid", {
    userId: userId.email,
  });
  return data;
};

export const nicknameCheckApi = async (nickname: IForm) => {
  const { data } = await instance.post<INickname>("/api/user/nickname", {
    nickname: nickname.nickname,
  });
  return data;
};

export const loginApi = async (userInfo: ILogin) => {
  const data: IData = await instance.post("/api/user/login", userInfo);
  const accessToken = data.headers.authorization;
  const userId = data.data.userId;
  const myNickName = data.data.nickname;
  setAccessToken(accessToken);
  setUserId(userId);
  setNickName(myNickName);
  // window.location.href = "/";
};

export const emailAuth = async (payload: IEmail) => {
  const { data } = await instance.post("/api/user/email", payload);
  return data;
};

export const emailAuthCheck = async (payload: IEmail) => {
  const data = await instance.post("/api/user/emailcheck", payload);
  return data;
};
