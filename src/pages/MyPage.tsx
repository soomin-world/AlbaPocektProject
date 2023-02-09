import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Outlet, useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteMyComment, getMyPage } from "../APIs/myPageApi";
import PostCard from "../components/category/PostCard";
import LayOut from "../components/layout/LayOut";
import { IMyPage } from "../types/myPageType";
import { IAllPosts } from "../types/postType";
import { dataType } from "./Board";
import { Modal } from "antd";
import { FrownOutlined } from "@ant-design/icons";

const MyPage = () => {
  const navigate = useNavigate();
  const mypageMatch = useMatch("/mypage");
  const myLikeMatch = useMatch("/mypage/myLike");
  const myCommentMatch = useMatch("/mypage/myComment");
  //const location = useLocation().state.location;

  let pageParam = 1;

  const { isLoading, isError, data, refetch } = useQuery(["myPage"], () =>
    getMyPage(pageParam)
  );

  const { confirm } = Modal;
  const showConfirm = () => {
    confirm({
      title: "로그아웃",
      icon: <FrownOutlined />,
      content: "로그아웃 하시겠습니까?",
      onOk() {
        LogoutHandler();
      },
      onCancel() {},
      okText: "로그아웃",
      cancelText: "아니요!",
      centered: true,
      okButtonProps: { danger: true, type: "text" },
      cancelButtonProps: { type: "text" },
    });
  };

  const LogoutHandler = () => {
    localStorage.removeItem("is_login");
    localStorage.removeItem("userId");
    localStorage.removeItem("nickname");
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
        style={{ cursor: "pointer" }}
      >
        {i}
      </div>
    );
  }
  // console.log(numList);
  const locationNow = useLocation();

  return (
    <>
      <LayOut padding="0" position="relative" height="100vh">
        <Header>마이페이지</Header>
        <MyPageProfile>
          <ProfileInfo>
            <div>
              <img src={data?.profileImage} />
              <span>{data?.nickname}</span>
            </div>
            <div
              onClick={() => {
                navigate("/mypage/edit");
              }}
            >
              <img src="/image/iconProfilePencil.svg" />
              <div>수정하기</div>
            </div>
          </ProfileInfo>

          <div>
            <MyPageEditBtn onClick={showConfirm}>
              <img src="/image/iconLogout.svg" />
              <div>로그아웃</div>
            </MyPageEditBtn>
          </div>
        </MyPageProfile>

        <p
          style={{
            padding: "10px 10px 10px 4%",
            fontWeight: "500",
          }}
        >
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
        <Container margin={numList?.length === 1 && mypageMatch !== null}>
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
        </Container>
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

const Header = styled.div`
  min-height: 50px;
  font-size: 17px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyPageProfile = styled.div`
  width: 100%;
  height: 158px;
  border-bottom: 8px solid #ebebeb;
  padding: 17px;
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

const ProfileInfo = styled.div`
  display: flex;
  justify-content: space-between;

  div:first-child {
    font-size: 19px;
    font-weight: 500;
  }
  div:nth-child(2) {
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;

    img {
      width: 20px;
      height: 20px;
      margin: 5px;
    }
  }
`;

const MyPageEditBtn = styled.button`
  width: 341px;
  height: 48px;
  background-color: transparent;
  border-radius: 30px;
  border: 1px solid #d7d8df;
  margin: 15px 0px 15px 0px;
  //box-shadow: rgb(0 0 0 / 20%) 2px 2px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Noto Sans KR";
  font-size: 15px;

  cursor: pointer;
  /* &:first-child {
    margin-right: 15px;
  } */
  img {
    width: 18px;
    height: 18px;
    margin-top: -1px;
    margin-right: 5px;
  }
  div {
    margin-top: -2px;
  }
`;

const Taps = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #d9d9d9;
  margin-bottom: 15px;
`;

const Tap = styled.div<{ isActive: boolean }>`
  width: 80px;
  height: 40px;
  color: ${(props) => (props.isActive ? "#5FCE80" : "black")};
  border-bottom: ${(props) => (props.isActive ? "2px solid #5FCE80" : null)};
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Container = styled.div<{ margin: boolean }>`
  margin-bottom: ${(props) => (props.margin ? "40px" : "0px")};
`;

const PageNum = styled.div`
  display: flex;
  margin: 0 auto;
  margin-bottom: 70px;

  div {
    margin: 0px 10px 0px 10px;
  }
`;

export default MyPage;
