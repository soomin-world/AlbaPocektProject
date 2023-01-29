import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { nicknameCheckApi } from "../APIs/loginRegisterApi";
import { editMyPage, getMyPage } from "../APIs/myPageApi";
import Header from "../components/header/Header";
import LayOut from "../components/layout/LayOut";
import { IForm } from "../types/loginRegisterType";
import { IMyPage } from "../types/myPageType";

const MyPageEdit = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
  } = useForm<IForm>({ mode: "onChange" });

  const {
    isLoading,
    isError,
    data: getData,
  } = useQuery<IMyPage>(["myPage"], () => getMyPage(1));

  const { mutateAsync } = useMutation(editMyPage, {
    onSuccess: () => {
      queryClient.invalidateQueries(["myPage"]);
    },
  });
  const { mutateAsync: nicknameCheckMutate } = useMutation(nicknameCheckApi);

  const [onClickNicknameCheck, setClickNicknameCheck] =
    useState<boolean>(false);
  const [passMsg, setPassMsg] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const [userImage, setUserImage] = useState(getData?.profileImage);

  useEffect(() => {
    // setNickname(data?.nickname);
    setUserImage(getData?.profileImage);
  }, [getData]);

  const getImage = (e: any) => {
    setFile(e.target.files[0]);
  };

  const onValid = (data: IForm) => {
    console.log("submit!!!");
    if (!onClickNicknameCheck && data.nickname)
      return alert("닉네임 중복확인 버튼을 눌러주세요!");

    if (file) {
      // console.log(nickname);
      const formData = new FormData();

      if (getData?.nickname) {
        if (!data.nickname) {
          formData.append("nickname", getData?.nickname);
        } else {
          formData.append("nickname", data.nickname);
        }
      }

      formData.append("file", file);

      mutateAsync(formData)
        .then((res) => {
          window.confirm("변경되었습니다!");
          resetField("nickname");
          setPassMsg("");
        })
        .catch((error) => {
          setPassMsg("");
          setError("extraError", { message: error.response.data.msg });
          alert(error.response.data.msg);
        });
    } else {
      // console.log(nickname);
      const formData = new FormData();

      // if (nickname !== undefined) {
      //   formData.append("nickname", nickname);
      // }

      if (getData?.nickname) {
        if (!data.nickname) {
          formData.append("nickname", getData?.nickname);
        } else {
          formData.append("nickname", data.nickname);
        }
      }

      mutateAsync(formData)
        .then((res) => {
          window.confirm("변경되었습니다!");
          resetField("nickname");
          setPassMsg("");
        })
        .catch((error) => {
          setPassMsg("");
          setError("extraError", { message: error.response.data.msg });
          alert(error.response.data.msg);
        });
    }
  };

  const imgPreview = (e: any) => {
    let reader = new FileReader();
    if (e.target.files[0]) {
      console.log(e.target.files[0].name);
      reader.readAsDataURL(e.target.files[0]);
    }
    // 읽기 동작이 끝났을 때마다 발생
    reader.onloadend = () => {
      setUserImage(String(reader.result));
    };
  };

  const nicknameCheck = () => {
    setClickNicknameCheck(true);
    const nickname: IForm = watch();
    nicknameCheckMutate(nickname)
      .then((res) => {
        console.log(res);
        setError("nickname", { message: "" });
        setPassMsg("멋진 닉네임이네요!");
      })
      .catch((error) => {
        console.log(error.response.data.msg);
        setPassMsg("");
        setError("nickname", { message: error.response.data.msg });
      });
  };

  return (
    <>
      <LayOut padding="0" position="relative">
        <Header title={"프로필 수정"} />
        <MyPageProfile>
          <div>
            <label htmlFor="profileImg">
              <img src={userImage} />
              <Camera />
            </label>
            <input
              type="file"
              id="profileImg"
              accept="image/*"
              onChange={(e) => {
                imgPreview(e);
                getImage(e);
              }}
            />

            <span>{getData?.nickname}</span>
          </div>
        </MyPageProfile>

        <UserProfileForm onSubmit={handleSubmit(onValid)}>
          <EditNickname>
            <span>닉네임</span>
            <div style={{ display: "flex" }}>
              <input
                {...register("nickname", {
                  minLength: {
                    value: 5,
                    message: "5~10글자를 적어주세요.",
                  },
                  maxLength: {
                    value: 10,
                    message: "5~10글자를 적어주세요.",
                  },
                  pattern: {
                    value: /^[A-za-z0-9가-힣]{5,10}$/,
                    message:
                      "가능한 문자 : 영문 대소문자, 글자 단위 한글, 숫자 ",
                  },
                })}
                placeholder="한글/영어 대소문자/숫자 가능 (5~10자)"
                onBlur={() => {
                  setClickNicknameCheck(false);
                }}
              ></input>
              <CheckBtn onClick={nicknameCheck} color={onClickNicknameCheck}>
                중복확인
              </CheckBtn>
            </div>
            {errors?.nickname?.message ? (
              <span>{errors?.nickname?.message}</span>
            ) : (
              <span style={{ color: "#5fce80" }}>{passMsg}</span>
            )}
          </EditNickname>

          {errors?.nickname?.message ? (
            <button disabled>확인</button>
          ) : (
            <button>확인</button>
          )}
        </UserProfileForm>
      </LayOut>
    </>
  );
};

const EditBar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: 500;
`;

const MyPageProfile = styled.div`
  width: 100%;
  height: 135px;
  border-bottom: 1px solid #ebebeb;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* justify-content: space-between;
  align-items: center; */
  font-size: 19px;
  font-weight: 400;
  position: relative;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  input {
    display: none;
  }
`;

const Camera = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-image: url("/image/iconCamera.png");
  background-size: cover;
  position: absolute;
  right: 155px;
  bottom: 50px;
`;

const UserProfileForm = styled.form`
  padding: 17px;

  button {
    width: 340px;
    height: 56px;
    background-color: #5fce80;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 17px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 17px;
  }
`;

const EditNickname = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 15px;
    font-weight: 400;
    margin-bottom: 15px;
  }
  span:last-child {
    font-size: 13px;
    color: red;
    margin: 10px 0px 10px 0px;
  }
  input {
    width: 240px;
    height: 48px;
    padding: 15px;
    font-size: 15px;
    border-radius: 15px;
    border: 1px solid #efefef;
  }
  input:focus {
    outline: 1px solid #5fce80;
  }
`;

const CheckBtn = styled.div<{ color: any }>`
  width: 90px;
  height: 48px;
  border: 1px solid ${(props) => (props.color ? "#5fce80" : "gray")};
  color: ${(props) => (props.color ? "#5fce80" : "gray")};
  margin-left: 11px;
  /* border: 1px solid #5fce80;
  color: #5fce80; */
  font-size: 14px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;

export default MyPageEdit;
