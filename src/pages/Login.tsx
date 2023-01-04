import { useState } from "react";
import { useMutation } from "react-query";
import { loginApi } from "../APIs/api";

interface ILogin {
  userId?: string;
  password?: string;
}

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const { mutate } = useMutation(loginApi);

  return (
    <div>
      로그인 페이지
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const userInfo = { userId: userId, password: password };
          console.log(userInfo);
          mutate(userInfo);
        }}
      >
        <input
          onChange={(e) => {
            setUserId(e.target.value);
          }}
          placeholder="이메일"
        ></input>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="비밀번호"
          type="password"
        ></input>
        <button>로그인</button>
      </form>
    </div>
  );
};

export default Login;
