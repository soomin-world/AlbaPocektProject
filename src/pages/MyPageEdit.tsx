import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { editMyPage, getMyPage } from "../APIs/myPageApi";
import { IMyPage } from "../types/myPageType";

const MyPageEdit = () => {
  const { isLoading, isError, data } = useQuery<IMyPage>(["myPage"], () =>
    getMyPage()
  );

  const [nickname, setNickname] = useState(data?.nickname);

  useEffect(() => {
    setNickname(data?.nickname);
  }, [data]);

  const { mutate } = useMutation(editMyPage, {
    onSuccess: () => {
      queryClient.invalidateQueries(["myPage"]);
    },
  });
  const queryClient = useQueryClient();

  const [file, setFile] = useState<File | undefined>();

  const getImage = (e: any) => {
    setFile(e.target.files[0]);
  };

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log("submit!!!");

    if (file) {
      console.log(nickname);
      const formData = new FormData();

      if (nickname !== undefined) {
        formData.append("nickname", nickname);
      }

      formData.append("file", file);

      console.log("호출 직전!!!");
      mutate(formData);
    } else {
      // alert("사진을 선택하세요!");
      console.log(nickname);
      const formData = new FormData();

      if (nickname !== undefined) {
        formData.append("nickname", nickname);
      }
      // formData.append(
      //   "data",
      //   new Blob([JSON.stringify({ nickname: nickname })], {
      //     type: "application/json",
      //   })
      // );
      // formData.append("file", "");

      console.log("호출 직전!!!");
      mutate(formData);
    }
  };
  return (
    <>
      <EditBar>마이페이지 수정</EditBar>
      <UserProfile>
        <img src={data?.profileImage} />
        <div>{data?.nickname}</div>
      </UserProfile>

      <UserProfileForm onSubmit={onSubmitHandler}>
        <div>
          <span>닉네임</span>
          <input
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          ></input>
        </div>

        <div>
          <span>프로필 이미지</span>
          <input
            type="file"
            accept="image/jpg,impge/png,image/jpeg,image/gif"
            onChange={getImage}
            multiple
          ></input>
        </div>

        <button>내정보 변경</button>
      </UserProfileForm>
    </>
  );
};

const EditBar = styled.div`
  width: 100%;
  height: 50px;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserProfile = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 2px solid black;

  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 15px;
  }
`;

const UserProfileForm = styled.form`
  padding: 15px;
`;
export default MyPageEdit;
