import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { registerApi, userIdCheckApi } from "../APIs/api";
import { instance } from "../APIs/axios";

interface IForm {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
  extraError?: string;
}

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({ mode: "onBlur" });

  const { mutate: registerMutate } = useMutation(registerApi);
  const { mutate: userIdCheckMutate } = useMutation(userIdCheckApi);

  const onValid = (data: IForm) => {
    if (data.password !== data.passwordCheck) {
      setError(
        "passwordCheck",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    } else {
      // console.log(watch());
      const registerInfo: IForm = watch();
      // registerApi(registerInfo);
      console.log(registerInfo);
      registerMutate(registerInfo);
    }
    // setError("extraError", { message: "Server offline." });
  };
  console.log(errors);

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "필수 정보입니다.",
            pattern: {
              value: /\w+@\w+\.\w{2,4}\.?\w{0,2}/,
              message: "올바른 이메일 형식이 아닙니다.",
            },
            // validate: {
            //   checkUrl: async () => await fetch("https://woooo.shop/api/user/userid", {
            //       method: "POST",
            //       body: JSON.stringify({
            //         userId: 1,
            //       }),
            //     }),
            //   message: "이미 가입된 이메일입니다.",
            // },
          })}
          placeholder="이메일"
        />
        <span>{errors?.email?.message}</span>

        <input
          {...register("nickname", {
            required: "필수 정보입니다.",
            minLength: {
              value: 3,
              message: "3글자 이상 적어주세요.",
            },
            pattern: {
              value: /^[A-za-z0-9가-힣]{3,20}$/,
              message: "가능한 문자: 영문 대소문자, 글자 단위 한글, 숫자",
            },
          })}
          placeholder="닉네임"
        />
        <span>{errors?.nickname?.message}</span>
        <input
          {...register("password", {
            required: "필수 정보입니다.",
            minLength: {
              value: 8,
              message: "8글자 이상 적어주세요.",
            },
            pattern: {
              value: /^[A-za-z0-9가-힣]{8,30}$/,
              message: "가능한 문자: 영문 대소문자, 글자 단위 한글, 숫자",
            },
          })}
          placeholder="비밀번호"
          type="password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("passwordCheck", {
            required: "필수 정보입니다.",
          })}
          placeholder="비밀번호 재확인"
          type="password"
        />
        <span>{errors?.passwordCheck?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
};

export default Register;
