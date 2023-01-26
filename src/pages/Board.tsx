import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getInfinitePost } from "../APIs/communityBoardApi";
import { boardAtom, boardModalAtom } from "../atoms";
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
  const [ScrollY, setScrollY] = useState(0); // 스크롤값을 저장하기 위한 상태
  // const handleFollow = () => {
  //  y = window.scrollY; // window 스크롤 값을 ScrollY에 저장
  // };

  useEffect(() => {
    setScrollY(window.scrollY);
    console.log("ScrollY is ", window.scrollY); // ScrollY가 변화할때마다 값을 콘솔에 출력
  }, [window.scrollY]);
  const boardMatch = useMatch("/board");
  const [boardModal, setBoardModal] = useRecoilState(boardModalAtom);
  const [boardType, setBoardType] = useRecoilState(boardAtom);

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
  // const scrollToTop = () => {
  //   window.scrollTo(0, 0);
  // };

  if (status === "loading") return <Loading />;
  if (status === "error") return <div>에러다 </div>;

  return (
    <>
      <LayOut>
        <Navigate>
          <Selector
            onClick={() => {
              setBoardModal(!boardModal);
            }}
          >
            {boardType}
            <img src="/image/iconMore.png" />
          </Selector>
          {boardModal ? (
            <List>
              <div
                onClick={(e) => {
                  setBoardType("전체");
                  setBoardModal(false);
                  navigate("/board/");
                }}
              >
                전체
              </div>
              <div
                onClick={(e) => {
                  setBoardType("자유 게시판");
                  setBoardModal(false);
                  navigate("/board/free");
                }}
              >
                자유 게시판
              </div>
              <div
                onClick={(e) => {
                  setBoardType("알바 고민");
                  setBoardModal(false);
                  navigate("/board/partTime");
                }}
              >
                알바 고민
              </div>
              <div
                onClick={(e) => {
                  setBoardType("대타 구해요");
                  setBoardModal(false);
                  navigate("/board/cover");
                }}
              >
                대타 구해요
              </div>
            </List>
          ) : null}

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
          onClick={() => {
            navigate("/posting");
          }}
        >
          <img src="/image/iconPencil.png" />
        </Plus>
        {/* <Scroll>
          <button onClick={scrollToTop}>top</button>
        </Scroll> */}

        {isFetchingNextPage ? <Loading /> : <div ref={ref}>여기 </div>}

        <Footer />
      </LayOut>
    </>
  );
}

const Navigate = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 25px 0px 25px 0px;
  position: relative;
`;

const Select = styled.select`
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

const Plus = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #5fce80;

  position: fixed;
  bottom: 70px;
  right: 20px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);

  display: flex;
  justify-content: center;
  align-items: center;
`;
const Scroll = styled.div`
  border: 1px solid black;
  position: absolute;
  top: 100px;
`;
const Selector = styled.div`
  font-size: 20px;
  font-weight: 400;
  display: flex;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    margin-left: 5px;
  }
`;

const List = styled.div`
  width: 90px;
  background-color: white;
  position: absolute;
  top: 40px;
  left: 0px;
  border-radius: 10px;
  animation: modal-bg-show 0.6s;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);

  div {
    font-size: 15px;
    padding: 6px 8px 6px 8px;
  }
`;

export default Board;
