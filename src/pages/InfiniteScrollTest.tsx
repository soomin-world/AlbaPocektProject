import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getInfinitePost } from "../APIs/communityBoardApi";
import PostCard from "../components/category/PostCard";
import Footer from "../components/footer/Footer";

function InfiniteScrollText() {
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const boardMatch = useMatch("/board");
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["posts"],
    ({ pageParam = 1 }) => getInfinitePost(pageParam),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.nextPage : undefined,
    }
  );
  //const { content, pageable, sort } = data;
  console.log(data?.pages);
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  //return (
  //   <>
  //   <PostsContainer>
  //     {data?.pages.map((page, index) => (
  //       <React.Fragment key={index}>
  //         {page.posts.map((post) => (
  //           <PostCard key={post._id} post={post}></PostCard>
  //         ))}
  //       </React.Fragment>
  //     ))}
  //   </PostsContainer>
  //   {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>}
  // </>
  //)

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
        <Search
          onClick={() => {
            navigate("/search");
          }}
        >
          🔍
        </Search>
      </Navigate>
      <Outlet></Outlet>
      {boardMatch === null
        ? null
        : data?.pages.map((post) => {
            console.log(post);
            return <PostCard key={post.content.postId} post={post.content} />;
          })}
      <Plus
        onClick={() => {
          navigate("/posting");
        }}
      >
        +
      </Plus>
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
