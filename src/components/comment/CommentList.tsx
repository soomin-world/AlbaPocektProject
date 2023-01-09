import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
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
  const { id } = useParams<string>();
  const [dataList, setDataList] = useState([]);
  const { data } = useQuery(["comment", id], () => getComments(id));
  useEffect(() => {
    if (data) {
      setDataList(data);
    }
  }, [data]);
  return (
    <Stcontainer>
      {dataList.map((e: CommentType) => (
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
    </Stcontainer>
  );
};
const Stcontainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0% 10% 10% 10%;
  width: 80%;
  margin-left: 10%;
`;

export default CommentList;
