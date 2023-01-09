import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  changeLikeComment,
  deleteComment,
  editComment,
} from "../../APIs/detailPostApi";
import { CommentType } from "./CommentList";

const Comment: React.FC<CommentType> = (props) => {
  const myId = localStorage.getItem("userId");
  const [isClicked, setIsClicked] = useState(false);
  const queryClient = useQueryClient();
  const {
    userId,
    commentId,
    comment,
    nickname,
    commentLikeNum,
    isLikecomment,
    createAt,
  } = props;
  const [like, setLike] = useState(isLikecomment);
  const [likeNum, setLikeNum] = useState(commentLikeNum);

  const { id } = useParams();
  const [newComment, setNewComment] = useState(comment);
  const delComment = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comment", id]);
    },
  });
  const putComment = useMutation(editComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comment", id]);
    },
  });

  //-----------------
  const commentDelete = (id: number) => {
    delComment.mutate(id);
    alert("삭제되었습니다");
  };
  const commentEdit = (id: number) => {
    const payload = [id, newComment];
    putComment.mutate(payload);
    setIsClicked(false);

    alert("수정되었습니다");
  };
  const mutatelike = useMutation(changeLikeComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["post"]);
    },
  });

  const onClickLikeHandler = () => {
    if (like) {
      setLikeNum(commentLikeNum - 1);
    } else {
      setLikeNum(commentLikeNum + 1);
    }
    setLike(!isLikecomment);
    mutatelike.mutate(commentId);
  };
  return (
    <>
      {isClicked === false ? (
        <STContainer>
          <div className="header">
            <div className="info">
              <div>{nickname}</div>
              <div> {createAt}</div>
            </div>
            <div className="btn">
              {myId === userId ? (
                <>
                  <button onClick={() => commentDelete(commentId)}>삭제</button>
                  <button onClick={() => setIsClicked(true)}>수정</button>
                </>
              ) : null}
            </div>
          </div>
          <div className="body">
            <div>{comment}</div>
          </div>
          <div className="like">
            <span
              onClick={() => {
                onClickLikeHandler();
              }}
            >
              {like === true ? "❤️" : "🤍"}
            </span>
            <span>{likeNum}</span>
          </div>
        </STContainer>
      ) : (
        <STContainer>
          <div className="header">
            <div className="info">
              <div>{nickname}</div>
              <div> {createAt}</div>
            </div>
            <div className="btn">
              {myId === userId ? (
                <>
                  <button onClick={() => commentEdit(commentId)}>
                    수정완료
                  </button>
                </>
              ) : null}
            </div>
          </div>
          <div className="body">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </div>
        </STContainer>
      )}
    </>
  );
};

const STContainer = styled.div`
  margin-bottom: 20px;
  .header {
    .info {
      display: flex;
      margin-right: 10px;
    }
    display: flex;
    justify-content: space-between;
    border: 1px solid grey;
    font-size: 15px;
  }
  .body {
    border: 1px solid grey;
    font-size: 17px;
  }
`;
export default Comment;
