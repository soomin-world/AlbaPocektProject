export interface IForm {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
  extraError?: string;
}

export interface IUserId {
  userId: string;
}

export interface INickname {
  nickName: string;
}

export interface ILogin {
  userId: string;
  password: string;
}

export interface IData {
  headers: {
    authorization: string;
  };
  data: {
    nickname: string;
  };
}
