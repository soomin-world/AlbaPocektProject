import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Outlet,
  Route,
  Routes,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { getAllPosts } from "../APIs/communityBoard";
import PostCard from "../components/category/PostCard";
import { IAllPosts } from "../types/postType";

type TotalProps = {
  children: JSX.Element | JSX.Element[];
};

const Board = () => {
  const navigate = useNavigate();
  const boardMatch = useMatch("/board");
  const [state, setState] = useState([]);

  const { isLoading, isError, data } = useQuery<IAllPosts[]>(["allPosts"], () =>
    getAllPosts()
  );

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
            전체
          </option>
          <option key="free" value="free">
            자유게시판
          </option>
          <option key="partTime" value="partTime">
            알바고민 게시판
          </option>
          <option key="cover" value="cover">
            대타 구해요 게시판
          </option>
        </Select>
      </Navigate>
      <Outlet></Outlet>
      {/* {isLoading ? <div>로딩중</div> : null} */}
      {isError ? <div>애러 뜸</div> : null}
      {boardMatch === null
        ? null
        : data?.map((post) => {
            console.log(post);
            return <PostCard key={post.postId} post={post} />;
          })}
      <Plus
        onClick={() => {
          navigate("/posting");
        }}
      >
        +
      </Plus>
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
  border: 2px solid black;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const Select = styled.select`
  width: 150px;
  height: 30px;
`;

const Plus = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 35px;
  font-weight: 300;
  background-color: skyblue;
  position: fixed;
  right: 10px;
  bottom: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
export default Board;
