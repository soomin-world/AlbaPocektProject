import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { deleteMyComment, getMyComment, getMyPage } from "../../APIs/myPageApi";
import { allMyCommentAtom, myCommentDeleteAtom } from "../../atoms";
import { IMyPage } from "../../types/myPageType";
import { CommentType } from "../../types/postType";
import PostCard from "../category/PostCard";
import LayOut from "../layout/LayOut";
import CommentCard from "./CommentCard";

const MyComment = () => {
  const queryClient = useQueryClient();
  const [onClickAll, setOnClickAll] = useRecoilState(allMyCommentAtom);
  const [deleteList, setDeleteList] = useRecoilState(myCommentDeleteAtom);

  let pageParam = 1;
  const { isLoading, isError, data, refetch } = useQuery(["myComment"], () =>
    getMyComment(pageParam)
  );
  const { mutateAsync } = useMutation(deleteMyComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["myComment"]);
    },
  });

  const allCommentList: number[] = [];

  useEffect(() => {
    if (!isLoading) {
      for (const comment of data?.content) {
        allCommentList.push(comment.commentId);
      }
    }
  }, [data, onClickAll]);

  useEffect(() => {}, [deleteList]);

  const numList = [];
  for (let i = 1; i <= data?.totalPages; i++) {
    numList.push(
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          pageParam = i;
          refetch();
          let copy: number[] = [];
          setDeleteList(copy);
          setOnClickAll(false);
        }}
      >
        {i}
      </div>
    );
  }
  // console.log(numList);

  return (
    <>
      <Container margin={numList?.length === 1}>
        {data?.content.map((comment: CommentType) => {
          return <CommentCard key={comment.commentId} comment={comment} />;
        })}
      </Container>
      {numList?.length === 1 ? null : <PageNum>{numList}</PageNum>}
      <CommentDelete>
        <div>
          {onClickAll ? (
            <img
              src="/image/iconFullCheck.svg"
              alt=""
              onClick={() => {
                let copy: number[] = [];
                setDeleteList(copy);
                setOnClickAll(false);
              }}
            />
          ) : (
            <img
              src="/image/iconEmptyCheck.svg"
              alt=""
              onClick={() => {
                console.log("클릭 시 나오는 모든 댓글 리스트", allCommentList);
                let copy = [...allCommentList];
                console.log(copy);
                setDeleteList(copy);
                // console.log(deleteList);
                setOnClickAll(true);
              }}
            />
          )}
          <div>전체 선택</div>
        </div>
        <button
          onClick={() => {
            mutateAsync(deleteList);
            let copy: number[] = [];
            setDeleteList(copy);
            setOnClickAll(false);
            refetch();
          }}
        >
          <span>삭제</span>
          <img src="/image/iconDelete.png" alt="" />
        </button>
      </CommentDelete>
    </>
  );
};

// const CommentCard = styled.div`
//   width: 100%;
//   height: 94px;
//   border-bottom: 1px solid #d9d9d9;
//   display: flex;
//   padding: 0px 15px 15px 15px;
//   margin-bottom: 15px;

//   img {
//     width: 15px;
//     height: 15px;
//     margin-right: 15px;
//   }
// `;

const CommentText = styled.div`
  width: 315px;
  font-size: 13px;
  font-weight: 400px;

  .first {
    height: 39px;
    line-height: 150%;
    margin-top: -3px;
  }
  div:nth-child(2) {
    margin: 5px 0px 5px 0px;
  }
  div:last-child {
    color: #aeaeae;
  }
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  color: #aeaeae;

  div {
    margin-right: 10px;
  }
  img {
    width: 13px;
    height: 13px;
    margin-right: 3px;
  }
`;

const CommentDelete = styled.div`
  width: 375px;
  height: 76px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  background-color: white;
  padding: 20px;
  font-size: 13px;
  font-weight: 400;
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
  }
  img {
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }
  button {
    width: 70px;
    height: 36px;
    border: none;
    font-size: 13px;
    border-radius: 5px;
    background-color: #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 13px;
      height: 13px;
      margin: 0 0 3px 3px;
    }
  }
`;

const Container = styled.div<{ margin: boolean }>`
  margin-bottom: ${(props) => (props.margin ? "60px" : "0px")};
`;

const PageNum = styled.div`
  display: flex;
  margin: 0 auto;
  margin-bottom: 94px;

  div {
    margin: 0px 10px 0px 10px;
  }
`;

export default MyComment;
