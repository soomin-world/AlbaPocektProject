import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  nicknameCheckApi,
  registerApi,
  userIdCheckApi,
} from "../APIs/loginRegisterApi";
import { IForm } from "../types/loginRegisterType";
import styled from "styled-components";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({ mode: "onBlur" });

  const { mutateAsync: registerMutate } = useMutation(registerApi);
  const { mutateAsync: userIdCheckMutate } = useMutation(userIdCheckApi);
  const { mutateAsync: nicknameCheckMutate } = useMutation(nicknameCheckApi);

  const [onClickIdCheck, setClickIdCheck] = useState(false);
  const [onClickNicknameCheck, setClickNicknameCheck] = useState(false);

  const onValid = (data: IForm) => {
    if (!onClickIdCheck) return alert("이메일 중복확인 버튼을 눌러주세요!");
    if (!onClickNicknameCheck)
      return alert("닉네임 중복확인 버튼을 눌러주세요!");

    console.log(errors?.email?.message);

    if (data.password !== data.passwordCheck) {
      setError(
        "passwordCheck",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    } else {
      const registerInfo: IForm = data;
      registerMutate(registerInfo)
        .then((res) => {
          navigate("/login");
        })
        .catch((error) => {
          setError("extraError", { message: error.response.data.msg });
          alert(error.response.data.msg);
        });
    }
    // setError("extraError", { message: "Server offline." });
  };
  // console.log(errors);

  const userIdCheck = () => {
    setClickIdCheck(true);
    const userId: IForm = watch();
    userIdCheckMutate(userId)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response.data.msg);
        setError("email", { message: error.response.data.msg });
      });
  };

  const nicknameCheck = () => {
    setClickNicknameCheck(true);
    const nickname: IForm = watch();
    nicknameCheckMutate(nickname)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response.data.msg);
        setError("nickname", { message: error.response.data.msg });
      });
  };

  console.log(errors?.email?.message);
  return (
    <Total>
      <Header>회원가입</Header>
      <Form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <Input
          {...register("email", {
            required: "필수 정보입니다.",
            pattern: {
              value: /\w+@\w+\.\w{2,4}\.?\w{0,2}/,
              message: "올바른 이메일 형식이 아닙니다.",
            },
          })}
          placeholder="이메일"
        />
        <span>{errors?.email?.message}</span>
        <div onClick={userIdCheck}>중복 확인</div>

        <Input
          {...register("nickname", {
            required: "필수 정보입니다.",
            minLength: {
              value: 5,
              message: "5~10글자를 적어주세요.",
            },
            pattern: {
              value: /^[A-za-z0-9가-힣]{5,10}$/,
              message: "가능한 문자 : 영문 대소문자, 글자 단위 한글, 숫자 ",
            },
          })}
          placeholder="닉네임"
        />
        <span>{errors?.nickname?.message}</span>
        <div onClick={nicknameCheck}>중복 확인</div>
        <Input
          {...register("password", {
            required: "필수 정보입니다.",
            minLength: {
              value: 8,
              message: "8글자 이상 적어주세요.",
            },
            pattern: {
              value:
                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].{8,20}$/,
              message: "영문 대소문자, 숫자, 특수문자를 포함한 8~20글자",
            },
          })}
          placeholder="비밀번호"
          type="password"
        />
        <span>{errors?.password?.message}</span>
        <Input
          {...register("passwordCheck", {
            required: "필수 정보입니다.",
          })}
          placeholder="비밀번호 재확인"
          type="password"
        />
        <span>{errors?.passwordCheck?.message}</span>

        {errors?.email?.message ||
        errors?.nickname?.message ||
        errors?.password?.message ||
        errors?.passwordCheck?.message ? (
          <button disabled>disabled</button>
        ) : (
          <button>확인</button>
        )}

        <span>{errors?.extraError?.message}</span>
      </Form>
    </Total>
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
    margin-bottom: 15px;
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
`;

export default Register;
