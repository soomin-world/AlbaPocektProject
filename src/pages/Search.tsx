import {
  QueryClient,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { tr } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getSearch } from "../APIs/communityBoardApi";
import { searchAtom, searchKeywordAtom } from "../atoms";
import PostCard from "../components/category/PostCard";
import Footer from "../components/footer/Footer";
// import Header from "../components/header/Header";
import LayOut from "../components/layout/LayOut";
import { IAllPosts } from "../types/postType";
import sweetAlert from "../util/sweetAlert";

const Search = () => {
  const queryClient = useQueryClient();
  const [keyword, setKeyword] = useRecoilState(searchKeywordAtom);
  const [isBtnClick, setIsBtnClick] = useRecoilState(searchAtom);
  let pageParam = 1;
  // const [pageParam, setPageParam] = useState(1);

  const { isLoading, data, refetch } = useQuery(["searchPost"], () =>
    getSearch([keyword, pageParam])
  );

  const onClickSearchBtnHandler = () => {
    if (keyword.length === 0) {
      sweetAlert(1000, "error", "한 글자 이상 입력해주세요.");
      setIsBtnClick(false);
    } else {
      refetch();
      setIsBtnClick(true);
    }
  };

  console.log(data);
  const numList: JSX.Element[] = [];
  // const [numList, setNumList] = useState([<div></div>]);
  for (let i = 1; i <= data?.totalPages; i++) {
    numList.push(
      <Num
        bgcolor={pageParam === i}
        onClick={() => {
          pageParam = i;
          console.log(pageParam);
          refetch();
        }}
      >
        {i}
      </Num>
    );
  }

  console.log(numList);
  return (
    <>
      <LayOut height="100vh">
        <Header>
          <img
            src="/image/iconLeftArrow.svg"
            alt="<"
            onClick={() => {
              setKeyword("");
              window.history.back();
            }}
          />
          <h1>게시물 검색</h1>
        </Header>

        <SearchInputBox>
          <SearchInput
            value={keyword}
            onChange={(e) => {
              // seIsBtnClick(false);
              setKeyword(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onClickSearchBtnHandler();
              }
            }}
          />
          <SearchBtn onClick={onClickSearchBtnHandler}>
            <img src="/image/iconSearchGray.svg" />
          </SearchBtn>
        </SearchInputBox>

        {isBtnClick === false
          ? null
          : data?.content?.map((post: IAllPosts) => {
              // console.log(post);
              return <PostCard key={post.postId} post={post} />;
            })}

        {data?.content?.length === 0 && isBtnClick ? (
          <SearchEmpty>
            <img src="/image/iconSearchEmpty.png" />
            <div>조회된 게시물이 없습니다.</div>
          </SearchEmpty>
        ) : null}

        {/* <PageNum>{numList}</PageNum> */}
        {numList?.length === 1 ? null : <PageNum>{numList}</PageNum>}

        {/* <Footer /> */}
      </LayOut>
    </>
  );
};

const SearchBar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: 500;
  padding: 5%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  min-height: 50px;

  h1 {
    width: 83px;
    height: 25px;
    font-size: 17px;
    font-weight: 500;
    margin-left: 105px;
  }
`;

const SearchInputBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;
const SearchInput = styled.input`
  width: 300px;
  height: 40px;
  border: none;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: #f0f0f0;
  padding-left: 13px;
  outline: none;
`;

const SearchBtn = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #f0f0f0;

  img {
    width: 22px;
    height: 22px;
    margin-top: 1px;
    cursor: pointer;
  }
`;

const SearchEmpty = styled.div`
  width: 180px;
  height: 120px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
  div {
    font-size: 15px;
    color: #b4b2b2;
  }
`;

const PageNum = styled.div`
  display: flex;
  margin: 0 auto;
  margin-bottom: 70px;
  //cursor: pointer;

  div {
    margin: 0px 10px 0px 10px;
  }
`;

const Num = styled.div<{ bgcolor: boolean }>`
  // color: ${(props) => (props.bgcolor ? "blue" : "black")};
  cursor: pointer;
`;

export default Search;
