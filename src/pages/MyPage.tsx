import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMyPage } from "../APIs/myPageApi";
import { IMyPage } from "../types/myPageType";

const MyPage = () => {
  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery<IMyPage>(["myPage"], () =>
    getMyPage()
  );
  console.log(data?.postList);
  return (
    <>
      <MypageBar>마이 페이지임</MypageBar>
      <MyPageProfile>
        <div>
          <img src={data?.profileImage} />
          <span>{data?.nickname}</span>
        </div>
        <MyPageEditBtn
          onClick={() => {
            navigate("/mypage/edit");
          }}
        >
          수정하기
        </MyPageEditBtn>
      </MyPageProfile>

      <p style={{ padding: "10px" }}>내가 작성한 게시물</p>

      {data?.postList.map((data) => {
        return (
          <UserPost
            key={data.postId}
            onClick={() => {
              navigate(`/post/${data.postId}`);
            }}
          >
            <p>{data.title}</p>
            <p>{data.content}</p>
          </UserPost>
        );
      })}
    </>
  );
};

const MypageBar = styled.div`
  width: 100%;
  height: 50px;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyPageProfile = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 2px solid black;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
  }
  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 15px;
  }
`;

const MyPageEditBtn = styled.button`
  width: 80px;
  height: 40px;
  background-color: transparent;
  border-radius: 15px;
`;

const UserPost = styled.div`
  border: 2px solid black;
  margin-bottom: 15px;

  p:first-child {
    font-weight: bold;
    padding: 10px;
  }

  p:last-child {
    font-size: 13px;
    padding: 0px 0px 10px 10px;
  }
`;

export default MyPage;
