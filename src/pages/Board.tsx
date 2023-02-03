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
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  const boardMatch = useMatch("/board");
  const [boardModal, setBoardModal] = useRecoilState(boardModalAtom);
  const [boardType, setBoardType] = useRecoilState(boardAtom);

  const {
    data,
    status,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
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

  if (status === "loading") return <Loading />;
  if (status === "error") return <div>에러다 </div>;

  return (
    <LayOut>
      <STContainer>
        <Navigate>
          <Selector
            onClick={() => {
              setBoardModal(!boardModal);
            }}
          >
            {boardType}
            <img src="/image/iconCategory.svg" />
          </Selector>
          {boardModal ? (
            <List>
              <div
                onClick={(e) => {
                  setBoardType("전체");
                  setBoardModal(false);
                  navigate("/board/");
                  // window.location.href = "/board";
                  refetch();
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
              src="/image/iconSearch.svg"
              onClick={() => {
                navigate("/search");
              }}
              alt="search"
            />
            <img
              src="/image/iconChat.svg"
              alt="chat"
              onClick={() => navigate("/chat")}
            />
            <img
              src="/image/iconMypage.svg"
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

        <PlusWrap>
          <Plus
            onClick={() => {
              navigate("/posting");
            }}
          >
            <img src="/image/iconPlusPencil.svg" />
          </Plus>
        </PlusWrap>
        {isFetchingNextPage ? <Loading /> : <div ref={ref} />}
        {/* <Footer /> */}
        {showButton && (
          <Scroll>
            <img src="/image/Up.svg" alt="up" onClick={scrollToTop} />
          </Scroll>
        )}
      </STContainer>
    </LayOut>
  );
}
const STContainer = styled.div`
  width: 100%;
  margin-bottom: 1px;
`;
const Navigate = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 25px 0px 25px 0px;
  position: relative;
`;

const Icon = styled.div`
  img {
    width: 24px;
    height: 24px;
    margin-left: 15px;
  }
  img:nth-child(3) {
    margin-left: 12px;
  }
`;

const PlusWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Plus = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #5fce80;
  position: fixed;
  bottom: 70px;

  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Selector = styled.div`
  font-size: 20px;
  font-weight: 400;
  display: flex;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    margin: 2px 0px 0px 5px;
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
const Scroll = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  //right: 30px;
  img {
    cursor: pointer;
    bottom: 150px;
    position: fixed;
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 100%;
  }
`;

export default Board;
