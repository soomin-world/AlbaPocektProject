import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../APIs/loginRegisterApi";
import { KAKAO_AUTH_URL } from "../APIs/OAuth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LayOut from "../components/layout/LayOut";

interface IErrormsg {
  response: {
    data: {
      msg: string;
    };
  };
}

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const { mutateAsync, isError, error } = useMutation(loginApi);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmitHandler = () => {
    if (userId.length === 0) return setErrorMsg("이메일을 입력하세요.");
    if (password.length === 0) return setErrorMsg("비밀번호를 입력하세요.");

    const userInfo = { userId: userId, password: password };
    console.log(userInfo);
    mutateAsync(userInfo).catch((error) => {
      console.log(error.response.data.msg);
      setErrorMsg(error.response.data.msg);
    });
  };
  const token = localStorage.getItem("is_login");
  useEffect(() => {
    if (token) {
      alert("뒤로가기막기");
      navigate("/");
    }
  }, []);
  return (
    <LayOut height="100vh">
      <Total>
        <Header>이메일 로그인</Header>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            const userInfo = { userId: userId, password: password };
            onSubmitHandler();
          }}
        >
          <Input
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            placeholder="이메일"
          ></Input>
          <Input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="비밀번호"
            type="password"
          ></Input>
          <span>{errorMsg}</span>
          <button>
            <div>시작하기</div>
          </button>
          <Register>
            <span>회원이 아니신가요? </span>
            <span
              onClick={() => {
                navigate("/register");
              }}
            >
              회원 가입하기
            </span>
          </Register>
          <Line>
            <hr />
            <div>또는</div>
            <hr />
          </Line>
          <a href={KAKAO_AUTH_URL}>
            <img src="/image/iconKakao.svg" />
          </a>
        </Form>
      </Total>
    </LayOut>
  );
};
const Total = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Noto Sans KR", sans-serif;
`;

const Header = styled.div`
  width: 100%;
  height: 60px;
  font-size: 15px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    width: 100%;
    height: 56px;
    margin: 15px 0px 15px 0px;
    border-radius: 10px;
    border: none;
    background-color: #5fce80;
    font-size: 17px;
    color: white;

    div {
      height: 17px;
    }
  }
  span {
    font-size: 15px;
    color: red;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 10px;
  border: none;
  background-color: #f9f9f9;
  padding-left: 15px;
  margin-bottom: 15px;

  &:focus {
    outline: 1px solid #5fce80;
    background-color: white;
  }
`;

const Register = styled.div`
  margin-bottom: 60px;

  span {
    color: black;
    font-size: 13px;
  }
  span:last-child {
    font-weight: 500;
    cursor: pointer;
  }
`;

const Line = styled.div`
  display: flex;
  margin-bottom: 20px;
  hr {
    border: none;
    background-color: #cbcbd2;
    width: 150px;
    height: 1px;
  }
  div {
    margin: 0px 9px 0px 9px;
    font-size: 12px;
    color: #a4a4a7;
  }
`;
export default Login;
