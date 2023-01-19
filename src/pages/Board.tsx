import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  Outlet,
  Route,
  Routes,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { getAllPosts } from "../APIs/communityBoardApi";
import PostCard from "../components/category/PostCard";
import { IAllPosts } from "../types/postType";
import Footer from "../components/footer/Footer";
import { instance } from "../APIs/axios";

type TotalProps = {
  children: JSX.Element | JSX.Element[];
};

const Board = () => {
  const navigate = useNavigate();
  const boardMatch = useMatch("/board");
  const [state, setState] = useState([]);

  // const { isLoading, isError, data, refetch } = useQuery<IAllPosts[]>(
  //   ["post"],
  //   () => getAllPosts()
  // );

  useEffect(() => {
    console.log("내가 마운트 됨!!!");
    getAllPosts();
    // refetch();
    // window.location.reload();
  }, []);

  return (
    <>
      <Navigate>
        <Select
          onChange={(e) => {
            console.log(e.target.value);
            navigate(`/board/${e.target.value}`);
          }}
        >
          <option key="all" value="">
            전체 게시판
          </option>
          <option key="free" value="free">
            자유 게시판
          </option>
          <option key="partTime" value="partTime">
            알바 고민
          </option>
          <option key="cover" value="cover">
            대타 구해요
          </option>
        </Select>
        <div style={{ height: "24px" }}>
          <Icon
            src="/image/iconSearch.png"
            onClick={() => {
              navigate("/search");
            }}
            margin="10px"
          ></Icon>
          <Icon src="/image/iconChat.png" margin="7px"></Icon>
          <Icon
            src="/image/iconUser.png"
            onClick={() => {
              navigate("/mypage");
            }}
            margin="15px"
          ></Icon>
        </div>
      </Navigate>
      <Outlet></Outlet>
      {/* {isLoading ? <div>로딩중</div> : null}
      {isError ? <div>애러 뜸</div> : null}
      {boardMatch === null
        ? null
        : data?.map((post) => {
            // console.log(post);
            return <PostCard key={post.postId} post={post} />;
          })} */}
      <Plus
        onClick={() => {
          navigate("/posting");
        }}
      >
        <img src="/image/iconPencil.png" />
      </Plus>
      <Footer />
    </>
  );
};
const Total = styled.div<{ props: TotalProps }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Navigate = styled.div`
  width: 100%;
  height: 60px;
  padding-left: 10px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Select = styled.select`
  width: 102px;
  height: 30px;
  font-size: 17px;
  font-weight: 500;
  border: none;
`;

const Icon = styled.img<{ margin: string }>`
  width: 24px;
  height: 24px;
  margin-right: ${(props) => props.margin};
`;

const Plus = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 35px;
  font-weight: 300;
  background-color: #5fce80;
  position: fixed;
  right: 20px;
  bottom: 70px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Board;
