import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getInfinitePost } from "../APIs/communityBoardApi";
import PostCard from "../components/category/PostCard";
import CategoryDropDown from "../components/dropDown/SalaryDropDown";
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
  const [categoryName, setCategoryName] = useState("전체");
  const [isOpen, setIsOpen] = useState(false);
  const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["posts"],
      ({ pageParam = 1 }) => getInfinitePost(pageParam),
      {
        getNextPageParam: (lastPage) =>
          !lastPage.last ? lastPage.nextPage : undefined,
      }
    );
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  const onClick = (e: any, tag: string) => {
    navigate(`/board${e.target.value}`);
    setCategoryName(tag);
    setIsOpen(!isOpen);
  };
  const open = () => {
    setIsOpen(!isOpen);
  };
  if (status === "loading") return <Loading />;
  if (status === "error") return <div>에러다 </div>;
  return (
    <>
      <LayOut>
        <Navigate>
          <Select>
            <span>{categoryName}</span>
            <img src="/image/arrowDown.png" onClick={open} alt="화살표" />
          </Select>
          {isOpen ? (
            <CategoryDropDown>
              <button onClick={(e) => onClick(e, "전체")} value="">
                전체
              </button>
              <button onClick={(e) => onClick(e, "자유게시판")} value="/free">
                자유게시판
              </button>
              <button onClick={(e) => onClick(e, "알바고민")} value="/partTime">
                알바고민
              </button>
              <button onClick={(e) => onClick(e, "대타구해요")} value="/cover">
                대타구해요
              </button>
            </CategoryDropDown>
          ) : null}
          {/* <Select
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
              알바고민
            </option>
            <option key="cover" value="cover">
              대타 구해요
            </option>
          </Select> */}
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
        {isFetchingNextPage ? "로딩중" : <div ref={ref}>여기 </div>}
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

const Select = styled.div`
  width: 120px;
  height: 28px;
  font-size: 20px;
  font-weight: 400;
  border: none;
  display: flex;
  justify-content: space-between;
  span {
    min-width: 70;
    font-weight: 500;
  }
  img {
    width: 24px;
    height: 24px;
  }
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
