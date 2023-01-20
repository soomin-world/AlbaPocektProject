import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getInfinitePost } from "../APIs/communityBoardApi";
import PostCard from "../components/category/PostCard";
import Footer from "../components/footer/Footer";
import LayOut from "../components/layout/LayOut";
import Loading from "../components/Loading/Loading";

export type dataType = {
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

function Board() {
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const boardMatch = useMatch("/board");
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
  if (status === "error") return <div>에러다 </div>;
  return (
    <>
      <LayOut>
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
          <Icon>
            <img
              src="/image/iconSearch.png"
              onClick={() => {
                navigate("/search");
              }}
              alt="search"
            />
            <img src="/image/iconChat.png" alt="chat" />
            <img
              src="/image/iconUser.png"
              onClick={() => {
                navigate("/mypage");
              }}
              alt="mypage"
            />
          </Icon>
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
          src="/image/plus.png"
          alt="+"
          onClick={() => {
            navigate("/posting");
          }}
        />
        {isFetchingNextPage ? <Loading /> : <div ref={ref}>여기 </div>}
        <Footer />
      </LayOut>
    </>
  );
}

const Navigate = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
`;

const Select = styled.select`
  width: 65px;
  height: 28px;
  font-size: 20px;
  font-weight: 400;
  border: none;
`;

const Icon = styled.div`
  img {
    width: 24px;
    height: 24px;
    margin-left: 15px;
  }
`;

const Plus = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  font-size: 35px;
  font-weight: 300;
  position: fixed;
  transform: translate(490%, 1100%);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Board;
