import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";
import { getMyPage } from "../APIs/myPageApi";
import { IMyPage } from "../types/myPageType";

const MyPageEdit = () => {
  const { isLoading, isError, data } = useQuery<IMyPage>(["myPage"], () =>
    getMyPage()
  );

  const [nickName, setNickName] = useState("");
  const [profileImg, setprofileImg] = useState("");

  return (
    <>
      <EditBar>마이페이지 수정</EditBar>
      <UserProfile>
        <img src={data?.profileImage} />
        <div>{data?.nickname}</div>
      </UserProfile>

      <UserProfileForm>
        <div>
          <span>닉네임</span>
          <input
            onChange={(e) => {
              setNickName(e.target.value);
            }}
          ></input>
        </div>

        <div>
          <span>프로필 이미지</span>
          <input></input>
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
