import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../../APIs/detailPostApi";
import Comment from "./Comment";

export interface CommentType {
  commentId: number;
  comment: string;
  nickname: string;
  commentLikeNum: number;
  isLikecomment: Boolean;
  createAt: string;
}

const CommentList = () => {
  const { id } = useParams();
  const { data } = useQuery(["comment", id], () => getComments(id));
  useEffect(() => {
    getComments(id);
  }, [data]);
  // console.log(data);
  // useEffect(() => {
  //   console.log("실헹");
  //   getComments(id);
  // }, []);

  //비동기 처리 omg

  return (
    <div>
      {data?.map((e: CommentType) => (
        <div key={e.commentId}>
          <Comment
            commentId={e.commentId}
            nickname={e.nickname}
            comment={e.comment}
            commentLikeNum={e.commentLikeNum}
            isLikecomment={e.isLikecomment}
            createAt={e.createAt}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
