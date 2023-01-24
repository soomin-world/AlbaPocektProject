import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getSearch } from "../APIs/communityBoardApi";
import { searchAtom, searchKeywordAtom } from "../atoms";
import PostCard from "../components/category/PostCard";
import Footer from "../components/footer/Footer";
import LayOut from "../components/layout/LayOut";
import { IAllPosts } from "../types/postType";

const Search = () => {
  const queryClient = new QueryClient();
  const [keyword, setKeyword] = useRecoilState(searchKeywordAtom);
  const [isBtnClick, seIsBtnClick] = useRecoilState(searchAtom);
  const { isLoading, data, refetch } = useQuery<IAllPosts[]>(
    ["searchPost"],
    () => getSearch(keyword)
    // {
    //   refetchOnMount: "always",
    //   refetchOnWindowFocus: true,
    // }
  );

  console.log(data);
  const onClickSearchBtnHandler = () => {
    if (keyword.length === 0) {
      alert("한 글자 이상 입력해주세요.");
      seIsBtnClick(false);
    } else {
      refetch();
      // queryClient.invalidateQueries();
      seIsBtnClick(true);
      console.log(isBtnClick);
    }
  };

  return (
    <>
      <LayOut>
        <SearchBar>게시물 검색</SearchBar>
        <SearchInputBox>
          <SearchInput
            value={keyword}
            onChange={(e) => {
              // seIsBtnClick(false);
              setKeyword(e.target.value);
            }}
          />
          <SearchBtn onClick={onClickSearchBtnHandler}>
            <img src="/image/iconSearchInput.png" />
          </SearchBtn>
        </SearchInputBox>

        {isBtnClick === false
          ? null
          : data?.map((post) => {
              // console.log(post);
              return <PostCard key={post.postId} post={post} />;
            })}
        {data?.length === 0 && isBtnClick ? (
          <SearchEmpty>게시물이 없습니다.</SearchEmpty>
        ) : null}
        <Footer />
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
`;

const SearchBtn = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #f0f0f0;
`;

const SearchEmpty = styled.div`
  position: fixed;
  top: 43%;
  left: 29%;
  font-size: 20px;
`;

export default Search;
