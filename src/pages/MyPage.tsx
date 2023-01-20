import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMyPage } from "../APIs/myPageApi";
import PostCard from "../components/category/PostCard";
import LayOut from "../components/layout/LayOut";
import { IMyPage } from "../types/myPageType";
import { IAllPosts } from "../types/postType";
import { dataType } from "./Board";

const MyPage = () => {
  const navigate = useNavigate();

  const { isLoading, isError, data } = useQuery<IMyPage>(["myPage"], () =>
    getMyPage()
  );
  console.log(data?.postList);

  const LogoutHandler = () => {
    localStorage.removeItem("is_login");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <>
      <LayOut padding="0">
        <MypageBar>마이페이지</MypageBar>
        <MyPageProfile>
          <div>
            <img src={data?.profileImage} />
            <span>{data?.nickname}</span>
          </div>

          <div>
            <MyPageEditBtn
              onClick={() => {
                navigate("/mypage/edit");
              }}
            >
              <img src="/image/iconMypagePencil.png" />
              수정하기
            </MyPageEditBtn>
            <MyPageEditBtn onClick={LogoutHandler}>로그아웃</MyPageEditBtn>
          </div>
        </MyPageProfile>

        <p style={{ padding: "10px 10px 10px 4%", fontWeight: "400" }}>
          내 활동
        </p>

        <div style={{ padding: "0 5% 0 5%" }}>
          {data?.postList.map((data) => {
            return <PostCard key={data.postId} post={data} />;
          })}
        </div>
      </LayOut>
    </>
  );
};

const MypageBar = styled.div`
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
  height: 156px;
  border-bottom: 8px solid #ebebeb;
  padding: 15px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between;
  align-items: center; */
  font-size: 19px;
  font-weight: 400;

  div {
    display: flex;
    align-items: center;
  }
  img {
    width: 55px;
    height: 55px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 15px;
  }
`;

const MyPageEditBtn = styled.button`
  width: 165px;
  height: 48px;
  background-color: transparent;
  border-radius: 30px;
  border: 1px solid #d7d8df;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;

  &:first-child {
    margin-right: 15px;
  }
  img {
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }
`;

export default MyPage;
