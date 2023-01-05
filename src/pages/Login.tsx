import { useState } from "react";
import { useMutation } from "react-query";
import { loginApi } from "../APIs/api";
import { KAKAO_AUTH_URL } from "../APIs/OAuth";

interface IErrormsg {
  response: {
    data: {
      msg: string;
    };
  };
}

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const { mutateAsync, isError, error } = useMutation(loginApi);

  const [errorMsg, setErrorMsg] = useState("");

  // if (error) {
  //   // const errormsg:IErrormsg = error;
  //   console.log(error.response.data.msg);
  // }

  return (
    <div>
      로그인 페이지
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const userInfo = { userId: userId, password: password };
          console.log(userInfo);
          mutateAsync(userInfo).catch((error) => {
            console.log(error.response.data.msg);
            setErrorMsg(error.response.data.msg);
          });
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
        <span>{errorMsg}</span>
        <a href={KAKAO_AUTH_URL}>카카오로 시작하기</a>
      </form>
    </div>
  );
};

export default Login;
