import axios from "axios";
import { useMutation } from "react-query";
import { instance } from "./axios";

interface IForm {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
  extraError?: string;
}

interface IUserId {
  userId: string;
}

interface INickname {
  nickName: string;
}

interface ILogin {
  userId: string;
  password: string;
}

// export const registerApi = () => {
//   return useMutation(async (registerInfo: IForm) => {
//     const { data } = await instance.post("api/quests", {});
//     return data;
//   });
// };

export const registerApi = async (registerInfo: IForm) => {
  const { data } = await instance.post<IForm>("/api/user/signup", {
    userId: registerInfo.email,
    nickname: registerInfo.nickname,
    password: registerInfo.password,
  });
  return data;
};

export const userIdCheckApi = async (userId: IUserId) => {
  const { data } = await instance.post<IUserId>("/api/user/userid", userId);
  return data;
};

export const nicknameCheckApi = async (nickname: INickname) => {
  const { data } = await instance.post<INickname>("/api/user/userid", nickname);
  return data;
};

export const loginApi = async (userInfo: ILogin) => {
  const { data } = await instance.post<ILogin>("/api/user/login", userInfo);
  return data;
};
