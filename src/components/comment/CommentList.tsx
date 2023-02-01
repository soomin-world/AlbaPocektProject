import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getComments } from "../../APIs/detailPostApi";
import { CommentType } from "../../types/postType";
import Comment from "./Comment";

const CommentList = () => {
  const { id } = useParams<string>();
  const [dataList, setDataList] = useState([]);
  const { data } = useQuery(["comment", id], () => getComments(id));
  // useEffect(() => {
  //   if (data) {
  //     setDataList(data);
  //   }
  // }, [data]);
  console.log(data);
  return (
    <Stcontainer>
      {data?.map((e: CommentType) => (
        <div key={e.commentId} className="box">
          <Comment
            commentId={e.commentId}
            nickname={e.nickname}
            comment={e.comment}
            commentLikeNum={e.commentLikeNum}
            likeComment={e.likeComment}
            createAt={e.createAt}
            userId={e.userId}
            profileImage={e.profileImage}
          />
        </div>
      ))}
    </Stcontainer>
  );
};
const Stcontainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  /* padding: 5%; */
  // margin-bottom: 50px;
  // background-color: #fbfbfb;
  height: 100%;
`;

export default CommentList;
