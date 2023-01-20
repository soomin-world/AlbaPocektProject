import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getInfinitePost } from "../APIs/communityBoardApi";
import PostCard from "../components/category/PostCard";
import Footer from "../components/footer/Footer";
import Loading from "../components/Loading/Loading";
import Post from "./Post";

type dataType = {
  postId: number;
  profileImage: string;
  nickname: string;
  title: string;
  content: string;
  imgUrl: string;
  postLikeNum: number;
  category: string | null;
  createAt: string;
  modifiedAt: string;
  likePost: boolean;
  commentCount: number;
  children?: JSX.Element | JSX.Element[];
};

function InfiniteScrollText() {
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const boardMatch = useMatch("/test1");
  const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["posts"],
      ({ pageParam = 1 }) => getInfinitePost(pageParam),
      {
        getNextPageParam: (lastPage) =>
          !lastPage.last ? lastPage.nextPage : undefined,
      }
    );
  //const { content, pageable, sort } = data;
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  console.log(data);
  if (status === "loading") return <Loading />;
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
        <div style={{ height: "24px" }}>
          {/* <Icon
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
          ></Icon> */}
        </div>
      </Navigate>
      <Outlet></Outlet>

      {boardMatch === null
        ? null
        : data?.pages.map((page) => {
            return page.content.map((p: dataType) => {
              return <PostCard key={p.postId} post={p} />;
            });
          })}
      <Plus
        onClick={() => {
          navigate("/posting");
        }}
      >
        +
      </Plus>
      {isFetchingNextPage ? <Loading /> : <div ref={ref}>여기 </div>}
      <Footer />
    </>
  );
}

const Navigate = styled.div`
  width: 100%;
  height: 60px;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
`;

const Select = styled.select`
  width: 150px;
  height: 30px;
`;

const Search = styled.div`
  margin-right: 10px;
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

export default InfiniteScrollText;
