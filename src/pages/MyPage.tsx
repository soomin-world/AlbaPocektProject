import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMyPage } from "../APIs/myPageApi";
import PostCard from "../components/category/PostCard";
import LayOut from "../components/layout/LayOut";
import { IMyPage } from "../types/myPageType";
import { IAllPosts } from "../types/postType";
import { dataType } from "./Board";

const MyPage = () => {
  const navigate = useNavigate();
  const mypageMatch = useMatch("/mypage");
  const myLikeMatch = useMatch("/mypage/myLike");
  const myCommentMatch = useMatch("/mypage/myComment");

  let pageParam = 1;

  const { isLoading, isError, data, refetch } = useQuery(["myPage"], () =>
    getMyPage(pageParam)
  );
  console.log(data);

  const LogoutHandler = () => {
    localStorage.removeItem("is_login");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const numList = [];
  for (let i = 1; i <= data?.pageable[0].totalPages; i++) {
    numList.push(
      <div
        onClick={() => {
          pageParam = i;
          console.log(pageParam);
          refetch();
        }}
      >
        {i}
      </div>
    );
  }
  console.log(numList);

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

        <Taps>
          <Tap
            onClick={() => navigate("/mypage")}
            isActive={mypageMatch !== null}
          >
            작성글
          </Tap>
          <Tap
            onClick={() => navigate("/mypage/myLike")}
            isActive={myLikeMatch !== null}
          >
            좋아요
          </Tap>
          <Tap
            onClick={() => navigate("/mypage/myComment")}
            isActive={myCommentMatch !== null}
          >
            작성댓글
          </Tap>
        </Taps>
        <Outlet></Outlet>
        {mypageMatch ? (
          <div>
            {data?.pageable[0].content.map((post: IAllPosts) => {
              return (
                <PostCard
                  key={post.postId}
                  post={post}
                  padding="0 15px 0 15px"
                />
              );
            })}
          </div>
        ) : null}
        {mypageMatch === null || numList?.length === 1 ? null : (
          <PageNum>{numList}</PageNum>
        )}

        {/* // <div style={{ padding: "0 5% 0 5%" }}>
        //   {data?.postList.map((data) => {
        //     return <PostCard key={data.postId} post={data} />;
        //   })}
        // </div> */}
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
  padding: 5%;
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

const Taps = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 0.5px solid #d9d9d9;
  margin-bottom: 15px;
`;

const Tap = styled.div<{ isActive: boolean }>`
  width: 80px;
  height: 40px;
  color: ${(props) => (props.isActive ? "#5FCE80" : "black")};
  border-bottom: ${(props) => (props.isActive ? "2px solid #5FCE80" : null)};
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageNum = styled.div`
  display: flex;
  margin-bottom: 20px;

  div {
    margin: 0px 10px 0px 10px;
  }
`;

export default MyPage;
