import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getSearch } from "../APIs/communityBoard";
import { searchAtom, searchKeywordAtom } from "../atoms";
import PostCard from "../components/category/PostCard";
import Footer from "../components/footer/Footer";
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

  // useEffect(() => {
  //   getSearch(keyword);
  // }, [keyword]);

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
      <SearchInputBox>
        <SearchBar>게시물 검색</SearchBar>
        <div>
          <SearchInput
            value={keyword}
            onChange={(e) => {
              // seIsBtnClick(false);
              setKeyword(e.target.value);
            }}
          />
          <SearchBtn onClick={onClickSearchBtnHandler}>검색</SearchBtn>
          {isBtnClick === false
            ? null
            : data?.map((post) => {
                // console.log(post);
                return <PostCard key={post.postId} post={post} />;
              })}
        </div>
      </SearchInputBox>
      <Footer />
    </>
  );
};

const SearchBar = styled.div`
  width: 100%;
  height: 50px;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SearchInput = styled.input`
  width: 280px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  margin: auto;
  margin-top: 10px;
`;

const SearchBtn = styled.button`
  height: 30px;
  border: none;
`;
export default Search;
